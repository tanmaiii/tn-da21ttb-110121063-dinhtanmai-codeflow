import { CreateCourseDto } from '@/dtos/courses.dto';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { CommentService } from '@/services/comment.service';
import { CourseEnrollmentService } from '@/services/course_enrollment.service';
import { CourseService } from '@/services/courses.service';
import { ENUM_USER_ROLE } from '@/data/enum';
import { HttpException } from '@/exceptions/HttpException';
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { UserService } from '@/services/users.service';
import { TopicService } from '@/services/topic.service';

export class CourseController {
  private readonly course: CourseService;
  private readonly comment: CommentService;
  private readonly courseEnrollment: CourseEnrollmentService;
  private readonly user: UserService;
  private readonly topic: TopicService;

  constructor() {
    this.course = Container.get(CourseService);
    this.comment = Container.get(CommentService);
    this.courseEnrollment = Container.get(CourseEnrollmentService);
    this.user = Container.get(UserService);
    this.topic = Container.get(TopicService);
  }

  private createPaginationResponse(count: number | string, page: number | string, limit: number | string) {
    return {
      totalItems: count,
      totalPages: Math.ceil(Number(count) / Number(limit)),
      currentPage: Number(page),
      pageSize: Number(limit),
    };
  }

  private async handleRequest<T>(req: Request, res: Response, next: NextFunction, handler: () => Promise<T>) {
    try {
      const result = await handler();
      return res.status(200).json({ data: result, message: 'success' });
    } catch (error) {
      next(error);
    }
  }

  public getCourses = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const { page = 1, limit = 10, sortBy = 'created_at', order = 'DESC', search, type } = req.query;
      const isAdmin = req.user.role === ENUM_USER_ROLE.ADMIN;
      const { count, rows } = await this.course.findAndCountAllWithPagination(
        Number(page),
        Number(limit),
        String(sortBy),
        order as 'ASC' | 'DESC',
        String(search ?? ''),
        String(type ?? ''),
        isAdmin,
      );

      res.status(200).json({
        data: rows,
        pagination: this.createPaginationResponse(count, Number(page), Number(limit)),
        message: 'findAll',
      });
    } catch (error) {
      next(error);
    }
  };

  public getRegisteredCourses = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const { page = 1, limit = 10, sortBy = 'created_at', order = 'DESC', type } = req.query;
      const { count, rows } = await this.course.findRegisteredCourses(
        Number(page),
        Number(limit),
        String(sortBy),
        order as 'ASC' | 'DESC',
        String(type ?? ''),
        req.user.id,
      );

      res.status(200).json({
        data: rows,
        pagination: this.createPaginationResponse(count, Number(page), Number(limit)),
        message: 'findAll',
      });
    } catch (error) {
      next(error);
    }
  };

  public getCoursesByAuthorId = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const { page = 1, limit = 10, sortBy = 'created_at', order = 'DESC', type } = req.query;
      const { count, rows } = await this.course.findCoursesByAuthorId(
        Number(page),
        Number(limit),
        String(sortBy),
        order as 'ASC' | 'DESC',
        String(type ?? ''),
        req.params.idAuthor,
      );

      res.status(200).json({
        data: rows,
        pagination: this.createPaginationResponse(count, Number(page), Number(limit)),
        message: 'findAll',
      });
    } catch (error) {
      next(error);
    }
  };

  public getCoursesByTagId = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const { page = 1, limit = 10, sortBy = 'created_at', order = 'DESC' } = req.query;

      const { count, rows } = await this.course.findCourseByTagIdAlternative(
        Number(page),
        Number(limit),
        String(sortBy),
        order as 'ASC' | 'DESC',
        req.params.idTag,
      );

      res.status(200).json({
        data: rows,
        pagination: this.createPaginationResponse(count, Number(page), Number(limit)),
        message: 'findAll',
      });
    } catch (error) {
      next(error);
    }
  };

  public getMembersByCourseId = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const { page = 1, limit = 10, sortBy = 'created_at', order = 'DESC' } = req.query;
      const { count, rows } = await this.courseEnrollment.findAllWithPaginationByCourseId(
        Number(limit),
        Number(page),
        String(sortBy),
        order as 'ASC' | 'DESC',
        req.params.id,
      );

      res.status(200).json({
        data: rows.map(enrollment => enrollment.user) ?? [],
        pagination: this.createPaginationResponse(count, Number(page), Number(limit)),
        message: 'findAll',
      });
    } catch (error) {
      next(error);
    }
  };

  public addMembersByCourseId = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const course = await this.course?.findCourseById(req?.params?.id);
      if (!course) throw new HttpException(404, 'Course not found');

      const user = await this.user?.findUserById(req.body?.memberId);
      if (!user) throw new HttpException(404, 'User not found');

      const enrollments = await this.courseEnrollment.findEnrollmentByCourseId(req.params.id);

      if (enrollments.some(enrollment => enrollment.userId === req.body?.memberId)) throw new HttpException(400, 'User already in course');

      await this.courseEnrollment.createEnrollment({ courseId: req.params?.id, userId: req.body?.memberId });

      res.status(200).json({
        data: user,
        message: 'addMember',
      });
    } catch (error) {
      next(error);
    }
  };

  public removeMember = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const course = await this.course?.findCourseById(req?.params?.id);
      if (!course) throw new HttpException(404, 'Course not found');

      const user = await this.user?.findUserById(req.params?.userId);
      if (!user) throw new HttpException(404, 'User not found');

      await this.courseEnrollment.deleteEnrollmentByCourseIdAndUserId(req.params.id, req.params.userId);

      res.status(200).json({
        data: user,
        message: 'removeMember',
      });
    } catch (error) {
      next(error);
    }
  };

  public getCourseById = async (req: Request, res: Response, next: NextFunction) => {
    await this.handleRequest(req, res, next, async () => {
      const isAdmin = (req as any).user?.role === ENUM_USER_ROLE.ADMIN;
      return await this.course.findCourseById(req.params.id, isAdmin);
    });
  };

  public joinCourse = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    await this.handleRequest(req, res, next, async () => {
      return await this.course.joinCourse(req.params.id, req.user.id, req.body.password);
    });
  };

  public checkEnrollment = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const userId = req.params?.userId;
    await this.handleRequest(req, res, next, async () => {
      const enrollments = await this.courseEnrollment.findEnrollmentByCourseId(req.params.id);
      return enrollments.some(enrollment => enrollment.userId === (userId ? userId : req.user.id));
    });
  };

  public createCourse = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const courseData: Partial<CreateCourseDto> = req.body;
      const createCourseData = await this.course.createCourse({
        ...courseData,
        authorId: req.user.id,
      });

      res.status(201).json({ data: createCourseData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateCourse = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    await this.handleRequest(req, res, next, async () => {
      return await this.course.updateCourse(req.params.id, req.body);
    });
  };

  public deleteCourse = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    await this.handleRequest(req, res, next, async () => {
      return await this.course.deleteCourse(req.params.id);
    });
  };

  public destroyCourse = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    await this.handleRequest(req, res, next, async () => {
      return await this.course.destroyCourse(req.params.id);
    });
  };

  public restoreCourse = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    await this.handleRequest(req, res, next, async () => {
      return await this.course.restoreCourse(req.params.id);
    });
  };

  public getCommentsByCourseId = async (req: Request, res: Response, next: NextFunction) => {
    await this.handleRequest(req, res, next, async () => {
      return await this.comment.findCommentByCourseId(req.params.id);
    });
  };

  // Debug method to test CourseTag data
  public debugCourseTagData = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Get all CourseTag records to debug
      const courseTagsData = await this.course.getCourseTagDebugData();
      res.status(200).json({
        data: courseTagsData,
        message: 'debug data',
      });
    } catch (error) {
      next(error);
    }
  };

  // Dashboard
  public getCourseCodeActivity = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const courseId: string = req.params.id;
      const days: number = parseInt(req.query.days as string) || 7;

      const codeActivity = await this.course.getCourseAllActivity(courseId ?? undefined, days);

      res.status(200).json({ data: codeActivity, message: 'getCourseCodeActivity' });
    } catch (error) {
      next(error);
    }
  };

  public getContributors = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const { page = 1, limit = 10, sortBy = 'commit', order = 'DESC' } = req.query as any;
      const { count, rows } = await this.course.contributors(
        id,
        Number(page),
        Number(limit),
        String(sortBy) as any,
        (String(order).toUpperCase() as 'ASC' | 'DESC') || 'DESC',
      );
      res.status(200).json({
        data: rows,
        pagination: this.createPaginationResponse(count, Number(page), Number(limit)),
        message: 'get contributors',
      });
    } catch (error) {
      next(error);
    }
  };

  public getTopicStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courseId = req.params.id;
      const topicStatus = await this.topic.getTopicStatus(courseId, false);
      res.status(200).json({ data: topicStatus, message: 'getTopicStatus' });
    } catch (error) {
      next(error);
    }
  };
}
