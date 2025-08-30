import CardCourse from '@/components/common/CardCourse/CardCourse';
import CardPost from '@/components/common/CardPost/CardPost';
import TextHeading from '@/components/ui/text';
import { PaginatedResponseAPIDto } from '@/interfaces/common';
import { ICourse } from '@/interfaces/course';
import { IPost } from '@/interfaces/post';
import courseService from '@/services/course.service';
import postService from '@/services/post.service';
import { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface DataBatch {
  courses: ICourse[];
  posts: IPost[];
}

interface LoadMoreProps {
  params: {
    page: number;
    sort?: string;
    limit: number;
    dataTypes?: string[];
  };
  tagId: string;
}

export default function LoadMore({ params, tagId }: LoadMoreProps) {
  const { ref, inView } = useInView();
  const [currentPage, setCurrentPage] = useState(params.page);
  const [isLoading, setIsLoading] = useState(false);
  const [dataBatches, setDataBatches] = useState<DataBatch[]>([]);
  const [totalPages, setTotalPages] = useState({
    courses: 1,
    posts: 1,
  });
  const [initialLoadDone, setInitialLoadDone] = useState(false);

  const fetchData = async (type: 'course' | 'post') => {
    const service = type === 'course' ? courseService : postService;
    return service.getAllByTag(
      {
        ...params,
        page: currentPage,
        limit: params.limit,
      },
      tagId,
    );
  };

  const loadMoreData = useCallback(async () => {
    if (isLoading) return;

    const { dataTypes = ['course', 'post'] } = params;
    const hasCoursesToLoad = dataTypes.includes('course') && currentPage <= totalPages.courses;
    const hasPostsToLoad = dataTypes.includes('post') && currentPage <= totalPages.posts;

    if (!hasCoursesToLoad && !hasPostsToLoad) return;

    setIsLoading(true);

    try {
      const promises = [
        hasCoursesToLoad ? fetchData('course') : Promise.resolve(null),
        hasPostsToLoad ? fetchData('post') : Promise.resolve(null),
      ];

      const [coursesRes, postsRes] = await Promise.allSettled(promises);
      const newBatch: DataBatch = { courses: [], posts: [] };

      if (coursesRes.status === 'fulfilled' && coursesRes.value && dataTypes.includes('course')) {
        const courseResponse = coursesRes.value as PaginatedResponseAPIDto<ICourse[]>;
        newBatch.courses = courseResponse.data;
        setTotalPages(prev => ({ ...prev, courses: courseResponse.pagination.totalPages }));
      }

      if (postsRes.status === 'fulfilled' && postsRes.value && dataTypes.includes('post')) {
        const postResponse = postsRes.value as PaginatedResponseAPIDto<IPost[]>;
        newBatch.posts = postResponse.data;
        setTotalPages(prev => ({ ...prev, posts: postResponse.pagination.totalPages }));
      }

      setDataBatches(prev => [...prev, newBatch]);
      setCurrentPage(prev => prev + 1);
      setInitialLoadDone(true);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, currentPage, totalPages, params, fetchData]);

  useEffect(() => {
    if (!initialLoadDone && !isLoading) {
      loadMoreData();
    }
  }, [initialLoadDone, isLoading, loadMoreData]);

  useEffect(() => {
    if (inView && initialLoadDone && !isLoading) {
      const timeoutId = setTimeout(loadMoreData, 200);
      return () => clearTimeout(timeoutId);
    }
  }, [inView, initialLoadDone, isLoading, loadMoreData]);

  useEffect(() => {
    setCurrentPage(params.page);
    setDataBatches([]);
    setInitialLoadDone(false);
    setTotalPages({ courses: 1, posts: 1 });
  }, [tagId, params.dataTypes, params.sort, params.page]);

  const hasMoreData = () => {
    const { dataTypes = ['course', 'post'] } = params;
    return (
      (dataTypes.includes('course') && currentPage <= totalPages.courses) ||
      (dataTypes.includes('post') && currentPage <= totalPages.posts)
    );
  };

  const renderContent = (batch: DataBatch, batchIndex: number) => (
    <div key={`batch-${batchIndex}`}>
      {batch.courses.length > 0 && params.dataTypes?.includes('course') && (
        <div className="flex flex-col py-2 gap-3 relative mb-6">
          <TextHeading>Course</TextHeading>
          <div className="relative grid grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-4 py-2">
            {batch.courses.map((course, index) => (
              <CardCourse key={`course-${batchIndex}-${course.id}-${index}`} course={course} />
            ))}
          </div>
        </div>
      )}

      {batch.posts.length > 0 && params.dataTypes?.includes('post') && (
        <div className="flex flex-col py-2 gap-3 relative mb-6">
          <TextHeading>Post</TextHeading>
          <div className="relative grid grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-4 py-2">
            {batch.posts.map((post, index) => (
              <CardPost key={`post-${batchIndex}-${post.id}-${index}`} post={post} />
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {dataBatches.map(renderContent)}

      {hasMoreData() && (
        <div
          ref={ref}
          className="flex justify-center items-center mt-5 w-full"
        >
          {inView && isLoading && (
            <button className="mx-auto">
              ...Loading {params.dataTypes?.join(', ') || 'Course, Post'} (Batch{' '}
              {dataBatches.length + 1})
            </button>
          )}
        </div>
      )}
    </>
  );
}
