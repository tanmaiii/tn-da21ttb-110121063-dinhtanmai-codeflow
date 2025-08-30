import { CourseController } from '@/controllers/courses.controller';
import { GetAllQueryDto } from '@/dtos/common.dto';
import { AddCourseDto, CreateCourseDto, GetAllCoursesDto, GetCodeActivityDto, JoinCourseDto } from '@/dtos/courses.dto';
import { AuthMiddleware, isTeacherOrAdmin } from '@/middlewares/auth.middleware';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';

export class CourseRoute implements Routes {
  public path = '/courses';
  public router = Router();
  public course = new CourseController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // Course enrollment routes
    this.router.post(`${this.path}/:id/join`, AuthMiddleware, ValidationMiddleware(JoinCourseDto, 'body'), this.course.joinCourse);
    this.router.get(`${this.path}/:id/check`, AuthMiddleware, this.course.checkEnrollment);
    this.router.get(`${this.path}/:id/check/:userId`, AuthMiddleware, this.course.checkEnrollment);
    this.router.get(`${this.path}/:id/members`, AuthMiddleware, ValidationMiddleware(GetAllQueryDto, 'query'), this.course.getMembersByCourseId);
    this.router.post(`${this.path}/:id/members`, isTeacherOrAdmin, ValidationMiddleware(AddCourseDto, 'body'), this.course.addMembersByCourseId);
    this.router.delete(`${this.path}/:id/members/:userId`, isTeacherOrAdmin, this.course.removeMember);

    // Course listing routes
    this.router.get(`${this.path}/registered`, AuthMiddleware, ValidationMiddleware(GetAllCoursesDto, 'query'), this.course.getRegisteredCourses);
    this.router.get(`${this.path}/:idAuthor/user`, AuthMiddleware, ValidationMiddleware(GetAllCoursesDto, 'query'), this.course.getCoursesByAuthorId);
    this.router.get(`${this.path}/author/:id`, AuthMiddleware, this.course.getCoursesByAuthorId);
    this.router.get(`${this.path}/tag/:idTag`, AuthMiddleware, this.course.getCoursesByTagId);

    // Course management routes (teacher/admin only)
    this.router.post(`${this.path}`, isTeacherOrAdmin, ValidationMiddleware(CreateCourseDto), this.course.createCourse);
    this.router.put(`${this.path}/:id`, isTeacherOrAdmin, ValidationMiddleware(CreateCourseDto, 'body', true), this.course.updateCourse);
    this.router.delete(`${this.path}/:id`, isTeacherOrAdmin, this.course.deleteCourse);
    this.router.delete(`${this.path}/:id/force`, isTeacherOrAdmin, this.course.destroyCourse);
    this.router.post(`${this.path}/:id/restore`, isTeacherOrAdmin, this.course.restoreCourse);
    this.router.get(`${this.path}`, AuthMiddleware, ValidationMiddleware(GetAllCoursesDto, 'query'), this.course.getCourses);

    // Dashboard Analytics routes
    this.router.get(
      `${this.path}/:id/code-activity`,
      AuthMiddleware,
      ValidationMiddleware(GetCodeActivityDto, 'query'),
      this.course.getCourseCodeActivity,
    );

    this.router.get(`${this.path}/:id/contributors`, AuthMiddleware, ValidationMiddleware(GetAllQueryDto, 'query'), this.course.getContributors);
    this.router.get(`${this.path}/:id/topic-status`, AuthMiddleware, this.course.getTopicStatus);

    // Public routes
    this.router.get(`${this.path}/:id`, this.course.getCourseById);
    // Course comments route
    this.router.get(`${this.path}/:id/comments`, AuthMiddleware, this.course.getCommentsByCourseId);

    // Debug route for CourseTag data
    this.router.get(`${this.path}/debug/coursetags`, this.course.debugCourseTagData);
  }
}
