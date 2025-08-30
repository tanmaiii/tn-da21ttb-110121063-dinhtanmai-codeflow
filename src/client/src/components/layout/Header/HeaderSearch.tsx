'use client';
import MyImage from '@/components/common/MyImage';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import TextHeading, { TextDescription } from '@/components/ui/text';
import { IMAGES } from '@/data/images';
import { paths } from '@/data/path';
import useQ_Course_GetAll from '@/hooks/query-hooks/Course/useQ_Course_GetAll';
import useQ_Post_GetAll from '@/hooks/query-hooks/Post/useQ_Post_GetAll';
import useQ_Topic_GetAll from '@/hooks/query-hooks/Topic/useQ_Topic_GetAll';
import { useDebounce } from '@/hooks/useDebounce';
import { utils_ApiImageToLocalImage } from '@/utils/image';
import { cx } from 'class-variance-authority';
import { ChevronLeft, Search as SearchICon, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function HeaderSearch() {
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const [keyword, setKeyword] = useState('');
  const t = useTranslations('search');
  const searchParams = useSearchParams();
  const k = searchParams?.get('keyword');
  const pathname = usePathname();

  // Debounce the keyword with 300ms delay
  const debouncedKeyword = useDebounce(keyword, 300);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Use debounced keyword for API calls
  const { data: courses } = useQ_Course_GetAll({
    params: {
      search: debouncedKeyword,
      page: 1,
      limit: 3,
    },
    options: {
      enabled: debouncedKeyword.length > 0, // Only fetch when there's actually a search term
    },
  });

  const { data: posts } = useQ_Post_GetAll({
    params: {
      search: debouncedKeyword,
      page: 1,
      limit: 3,
    },
    options: {
      enabled: debouncedKeyword.length > 0,
    },
  });

  const { data: topics } = useQ_Topic_GetAll({
    params: {
      search: debouncedKeyword,
      status: 'approved',
      page: 1,
      limit: 3,
    },
    options: {
      enabled: debouncedKeyword.length > 0,
    },
  });

  // Show loading state while debouncing
  const isSearching = keyword !== debouncedKeyword && keyword.length > 0;

  useEffect(() => {
    if (k) {
      setKeyword(k);
    } else {
      setKeyword('');
    }
  }, [k, pathname]);

  useEffect(() => {
    setIsFocused(false);
  }, [pathname]);

  return (
    <div ref={ref} className="relative w-full">
      <div
        className={cx(
          'flex items-center bg-background-2 dark:bg-background-1  p-2 h-11 border',
          isFocused ? (keyword ? 'border rounded-t-lg' : 'rounded-lg') : 'rounded-lg',
        )}
      >
        <SearchICon
          className={cx(
            'text-color-2 transition-colors',
            isSearching && 'animate-pulse text-primary',
          )}
        />
        <input
          type="text"
          placeholder="Search..."
          onFocus={() => {
            setIsFocused(true);
          }}
          onChange={e => {
            setKeyword(e.target.value);
          }}
          onKeyDown={e => {
            if (e.key === 'Enter' && keyword.trim()) {
              router.push(`${paths.SEARCH}?keyword=${keyword.trim()}`);
              setIsFocused(false);
            }
          }}
          value={keyword}
          className="ml-2 p-1 focus:outline-none w-100 placeholder:text-color-2 placeholder:text-sm"
        />
        {keyword && (
          <button
            className="text-color-2 cursor-pointer hover:text-color-1"
            onClick={() => setKeyword('')}
          >
            <X size={16} />
          </button>
        )}
      </div>
      <div
        className={cx(
          'absolute top-[100%] left-0 w-full bg-background-1 shadow-lg rounded-b-lg p-2 border',
          isFocused ? (keyword ? 'block' : 'hidden') : 'hidden',
        )}
      >
        <ScrollArea className="h-72 w-full rounded-md">
          {/* Show searching state */}
          {isSearching && (
            <div className="flex items-center justify-center py-8">
              <div className="text-sm text-gray-500">{t('searching')}</div>
            </div>
          )}

          {/* Show results only when not searching and have debounced keyword */}
          {!isSearching && debouncedKeyword && (
            <>
              {courses?.data && courses?.data.length > 0 && (
                <div className="flex flex-col gap-1">
                  <div className="relative w-full text-start">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t text-color-2"></div>
                    </div>
                    <TextDescription className="relative font-medium bg-background-1 dark:bg-background-1 px-2 ml-2">
                      {t('course')}
                    </TextDescription>
                  </div>
                  {courses?.data.map(course => (
                    <Item
                      key={course.id}
                      item={{
                        id: course.id,
                        title: course.title,
                        description: course.author?.name ?? '',
                        image: course.thumbnail ?? '',
                        link: `${paths.COURSES}/${course.id}`,
                      }}
                    />
                  ))}
                </div>
              )}
              {posts?.data && posts?.data.length > 0 && (
                <div className="flex flex-col gap-1">
                  <div className="relative w-full text-start">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t text-color-2"></div>
                    </div>
                    <TextDescription className="relative font-medium bg-background-1 dark:bg-background-1 px-2 ml-2">
                      {t('post')}
                    </TextDescription>
                  </div>
                  {posts?.data.map(post => (
                    <Item
                      key={post.id}
                      item={{
                        id: post.id,
                        title: post.title,
                        description: post.author?.name ?? '',
                        image: post.thumbnail ?? '',
                        link: `${paths.POSTS}/${post.id}`,
                      }}
                    />
                  ))}
                </div>
              )}
              {topics?.data && topics?.data.length > 0 && (
                <div className="flex flex-col gap-1">
                  <div className="relative w-full text-start">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t text-color-2"></div>
                    </div>
                    <TextDescription className="relative font-medium bg-background-1 dark:bg-background-1 px-2 ml-2">
                      {t('topic')}
                    </TextDescription>
                  </div>
                  {topics?.data.map(topic => (
                    <Item
                      key={topic.id}
                      item={{
                        id: topic.id,
                        title: topic.title,
                        description: topic.author?.name ?? '',
                        image: '',
                        link: `${paths.TOPICS}/${topic.id}`,
                      }}
                    />
                  ))}
                </div>
              )}
            </>
          )}

          {/* Show "View All" only when there's a keyword (original or debounced) */}
          {(keyword || debouncedKeyword) &&
          (courses?.data?.length || posts?.data?.length || topics?.data?.length) ? (
            <Button
              variant="text"
              className="w-full justify-start mt-2"
              onClick={() => {
                router.push(`${paths.SEARCH}?keyword=${keyword || debouncedKeyword}`);
                setIsFocused(false);
              }}
            >
              <ChevronLeft />
              <TextHeading lineClamp={1} className="text-md text-left font-semibold text-color-1">
                {t('viewAllResults', { keyword: keyword || debouncedKeyword })}
              </TextHeading>
            </Button>
          ) : null}

          {/* Show empty state when no results and not searching */}
          {!isSearching &&
            debouncedKeyword &&
            !courses?.data?.length &&
            !posts?.data?.length &&
            !topics?.data?.length && (
              <div className="flex items-center justify-center py-8">
                <div className="text-sm text-gray-500">{t('noResults')}</div>
              </div>
            )}
        </ScrollArea>
      </div>
    </div>
  );
}

const Item = ({
  item,
}: {
  item: {
    id: string;
    title: string;
    description: string;
    image: string;
    link: string;
  };
}) => {
  return (
    <Link href={item.link}>
      <div className="flex items-center gap-2 p-2 hover:bg-primary/20 cursor-pointer rounded-xl">
        <div className="w-10 h-10 min-w-10 min-h-10 bg-background-1 rounded-md">
          <MyImage
            src={item.image ? utils_ApiImageToLocalImage(item.image) : IMAGES.DEFAULT_COURSE}
            alt="logo"
            width={40}
            height={40}
            className="w-full h-full object-cover rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <TextHeading lineClamp={1} className="text-md font-semibold text-color-1">
            {item.title}
          </TextHeading>
          <TextDescription lineClamp={1}>{item.description}</TextDescription>
        </div>
      </div>
    </Link>
  );
};
