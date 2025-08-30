'use client';

import CardCourse from '@/components/common/CardCourse/CardCourse';
import CardPost from '@/components/common/CardPost/CardPost';
import CardTopic from '@/components/common/CardTopic';
import NoData from '@/components/common/NoData/NoData';
import TextHeading from '@/components/ui/text';
import { PaginatedResponseAPIDto } from '@/interfaces/common';
import { ICourse } from '@/interfaces/course';
import { IPost } from '@/interfaces/post';
import { ITopic } from '@/interfaces/topic';
import courseService from '@/services/course.service';
import postService from '@/services/post.service';
import topicService from '@/services/topic.service';
import { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
interface QueryParams {
  page: number;
  sort?: string;
  keyword?: string;
  limit: number;
  dataTypes?: string[];
  courseTypes?: string[];
  tags?: string[];
}

interface DataBatch {
  courses: ICourse[];
  posts: IPost[];
  topics: ITopic[];
}

interface LoadMoreMixedProps {
  params: QueryParams;
}

function LoadMoreMixed({ params }: LoadMoreMixedProps) {
  const { ref, inView } = useInView();
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [dataBatches, setDataBatches] = useState<DataBatch[]>([]);
  const [totalPages, setTotalPages] = useState({
    courses: 1,
    posts: 1,
    topics: 1,
  });

  const loadMoreData = useCallback(async () => {
    if (isLoading) return;

    const { dataTypes = ['course', 'post', 'topic'] } = params;

    const hasMoreData =
      (dataTypes.includes('course') && currentPage <= totalPages.courses) ||
      (dataTypes.includes('post') && currentPage <= totalPages.posts) ||
      (dataTypes.includes('topic') && currentPage <= totalPages.topics);

    if (!hasMoreData) return;

    setIsLoading(true);

    try {
      // Fetch only selected data types simultaneously
      const promises: (
        | Promise<PaginatedResponseAPIDto<ICourse[]>>
        | Promise<PaginatedResponseAPIDto<IPost[]>>
        | Promise<PaginatedResponseAPIDto<ITopic[]>>
        | Promise<null>
      )[] = [];

      // Only fetch courses if selected and has more pages
      if (dataTypes.includes('course') && currentPage <= totalPages.courses) {
        promises.push(
          courseService.getAll({
            ...params,
            search: params.keyword,
            page: currentPage,
            type: params.courseTypes?.[0],
            // Add course-specific filters here if needed
          }),
        );
      } else {
        promises.push(Promise.resolve(null));
      }

      // Only fetch posts if selected and has more pages
      if (dataTypes.includes('post') && currentPage <= totalPages.posts) {
        promises.push(
          postService.getAll({
            ...params,
            search: params.keyword,
            page: currentPage,
            // Add post-specific filters here if needed
          }),
        );
      } else {
        promises.push(Promise.resolve(null));
      }

      // Only fetch topics if selected and has more pages
      if (dataTypes.includes('topic') && currentPage <= totalPages.topics) {
        promises.push(
          topicService.getAll({
            ...params,
            search: params.keyword,
            status: 'approved',
            page: currentPage,
            // Add topic-specific filters here if needed
          }),
        );
      } else {
        promises.push(Promise.resolve(null));
      }

      const [coursesRes, postsRes, topicsRes] = await Promise.allSettled(promises);

      const newBatch: DataBatch = {
        courses: [],
        posts: [],
        topics: [],
      };

      // Update courses
      if (
        coursesRes.status === 'fulfilled' &&
        coursesRes.value !== null &&
        dataTypes.includes('course')
      ) {
        const courseResponse = coursesRes.value as PaginatedResponseAPIDto<ICourse[]>;
        newBatch.courses = courseResponse.data;
        setTotalPages(prev => ({
          ...prev,
          courses: courseResponse.pagination.totalPages,
        }));
      }

      // Update posts
      if (
        postsRes.status === 'fulfilled' &&
        postsRes.value !== null &&
        dataTypes.includes('post')
      ) {
        const postResponse = postsRes.value as PaginatedResponseAPIDto<IPost[]>;
        newBatch.posts = postResponse.data;
        setTotalPages(prev => ({
          ...prev,
          posts: postResponse.pagination.totalPages,
        }));
      }

      // Update topics
      if (
        topicsRes.status === 'fulfilled' &&
        topicsRes.value !== null &&
        dataTypes.includes('topic')
      ) {
        const topicResponse = topicsRes.value as PaginatedResponseAPIDto<ITopic[]>;
        newBatch.topics = topicResponse.data;
        setTotalPages(prev => ({
          ...prev,
          topics: topicResponse.pagination.totalPages,
        }));
      }

      // Add new batch to the list
      setDataBatches(prev => [...prev, newBatch]);
      setCurrentPage(prev => prev + 1);
    } catch (error) {
      console.error('Error loading mixed data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, currentPage, totalPages, params]);

  // Reset when search params change
  useEffect(() => {
    setDataBatches([]);
    setCurrentPage(1);
    setTotalPages({ courses: 1, posts: 1, topics: 1 });
  }, [params.sort, params.keyword, params.limit]);

  // FIXME : This is a bug, it will load more data when the search params change
  // Load initial data
  // useEffect(() => {
  //   if (dataBatches.length === 0 && !isLoading) {
  //     loadMoreData();
  //   }
  // }, [dataBatches.length, isLoading, loadMoreData]);

  useEffect(() => {
    if (inView) {
      const delay = 200;
      const timeoutId = setTimeout(() => {
        loadMoreData();
      }, delay);

      return () => clearTimeout(timeoutId);
    }
  }, [inView, loadMoreData]);

  const hasMoreData =
    (params.dataTypes?.includes('course') && currentPage <= totalPages.courses) ||
    (params.dataTypes?.includes('post') && currentPage <= totalPages.posts) ||
    (params.dataTypes?.includes('topic') && currentPage <= totalPages.topics);

  return (
    <>
      {dataBatches.map((batch, batchIndex) => (
        <div key={`batch-${batchIndex}`}>
          {/* Courses Section */}
          {batch.courses.length > 0 && params.dataTypes?.includes('course') && (
            <div className="flex flex-col py-2 gap-3 relative mb-6">
              <TextHeading>
                Course
              </TextHeading>
              <div className="relative grid grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-4 py-2">
                {batch.courses.map((course, index) => (
                  <CardCourse key={`course-${batchIndex}-${course.id}-${index}`} course={course} />
                ))}
              </div>
            </div>
          )}

          {/* Posts Section */}
          {batch.posts.length > 0 && params.dataTypes?.includes('post') && (
            <div className="flex flex-col py-2 gap-3 relative mb-6">
              <TextHeading>
                Post
              </TextHeading>
              <div className="relative grid grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-4 py-2">
                {batch.posts.map((post, index) => (
                  <CardPost key={`post-${batchIndex}-${post.id}-${index}`} post={post} />
                ))}
              </div>
            </div>
          )}

          {/* Topics Section */}
          {batch.topics.length > 0 && params.dataTypes?.includes('topic') && (
            <div className="flex flex-col py-2 gap-3 relative mb-6">
              <TextHeading>
                Topic
              </TextHeading>
              <div className="relative grid grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-3 py-2">
                {batch.topics.map((topic, index) => (
                  <CardTopic key={`topic-${batchIndex}-${topic.id}-${index}`} topic={topic} />
                ))}
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Load More Trigger */}
      {hasMoreData && (
        <div
          ref={ref}
          style={{
            flexBasis: '100%',
            flexGrow: 1,
            justifyContent: 'center',
            alignContent: 'center',
            display: 'flex',
            marginTop: '20px',
          }}
        >
          {inView && isLoading && (
            <button style={{ margin: '0 auto' }}>
              ...Loading {params.dataTypes?.join(', ') || 'Course, Post & Topic'} (Batch{' '}
              {dataBatches.length + 1})
            </button>
          )}
        </div>
      )}


      {/* No data */}
      {dataBatches.map((batch, batchIndex) => ( 
        <div key={`batch-${batchIndex}`}>
          {batch.courses.length === 0 && batch.posts.length === 0 && batch.topics.length === 0 && (
            <NoData />
          )}
        </div>
      ))}
    </>
  );
}

export default LoadMoreMixed;
