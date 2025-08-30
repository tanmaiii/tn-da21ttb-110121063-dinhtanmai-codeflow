'use client';

import TextHeading from '@/components/ui/text';
import useQ_Tag_GetAll from '@/hooks/query-hooks/Tag/useQ_Tag_GetAll';
import { useSearchFilter } from '@/hooks/useSearchFilter';
import { useTranslations } from 'next-intl';
import LoadMoreMixed from './LoadMoreMixed';
import SearchFilters from './SearchFilters';

export default function Search() {
  const { data: tags } = useQ_Tag_GetAll();
  const t = useTranslations('search');

  const {
    filters,
    debouncedKeyword,
    apiParams,
    isAllTypesSelected,
    hasActiveFilters,
    toggleType,
    toggleAllTypes,
    resetFilters,
  } = useSearchFilter();

  return (
    <div className="w-full flex justify-center items-center">
      <div className="grid grid-cols-12 gap-4 py-10 w-full min-h-[90vh] mx-auto">
        {/* Main Content */}
        <div className="col-span-12 md:col-span-8 lg:col-span-9 h-full flex flex-col">
          <div className="mb-6">
            <TextHeading className="text-2xl font-bold">
              {filters.keyword ? (
                <>{t('resultsFor', { keyword: filters.keyword })}</>
              ) : (
                t('results')
              )}
            </TextHeading>

            {hasActiveFilters && (
              <div className="mt-2 text-sm text-gray-600">
                {filters.types.length < 3 &&
                  `${t('appliedFilters', { length: filters.types.length })}`}
              </div>
            )}

            {/* Show what's actually being searched */}
            {debouncedKeyword && debouncedKeyword !== filters.keyword && (
              <div className="mt-1 text-xs text-gray-500">
                {t('showingResultsFor', { keyword: debouncedKeyword })}
              </div>
            )}
          </div>

          <LoadMoreMixed params={apiParams} />
        </div>

        {/* Sidebar Filters */}
        <div className="col-span-12 md:col-span-4 lg:col-span-3">
          <div className="sticky top-20">
            <SearchFilters
              filters={filters}
              tags={tags?.data || []}
              hasActiveFilters={hasActiveFilters}
              isAllTypesSelected={isAllTypesSelected}
              onToggleType={toggleType}
              onToggleAllTypes={toggleAllTypes}
              onResetFilters={resetFilters}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
