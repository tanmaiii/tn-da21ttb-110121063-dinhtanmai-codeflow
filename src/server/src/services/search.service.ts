import Container, { Service } from 'typedi';
import { CourseService } from './courses.service';
import { PostService } from './post.service';
import { TopicService } from './topic.service';

@Service()
export class SearchService {
  public Course = Container.get(CourseService);
  public Topic = Container.get(TopicService);
  public Post = Container.get(PostService);

  public async findAll(page = 1, pageSize = 10, sortBy = 'created_at', sortOrder: 'ASC' | 'DESC' = 'DESC', search = '', type = '') {
    const [courses, topics, posts] = await Promise.all([
      this.Course.findAndCountAllWithPagination(page, pageSize, sortBy, sortOrder, search, type),
      this.Topic.findAndCountAllWithPagination(page, pageSize, sortBy, sortOrder, search),
      this.Post.findAndCountAllWithPagination(page, pageSize, sortBy, sortOrder, search),
    ]);

    return [...courses.rows, ...topics.rows, ...posts.rows];
  }
}
