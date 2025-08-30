'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { useDebounce } from './useDebounce';

export interface SearchFilters {
  keyword: string;
  types: ('course' | 'post' | 'topic')[];
}

export const useSearchFilter = () => {
  const searchParams = useSearchParams();
  
  // Initialize from URL params
  const initialFilters: SearchFilters = {
    keyword: searchParams?.get('keyword') || '',
    types: ['course', 'post', 'topic'], // Default all
  };

  const [filters, setFilters] = useState<SearchFilters>(initialFilters);
  
  // Debounce the keyword to optimize API calls
  const debouncedKeyword = useDebounce(filters.keyword, 500);

  // Sync with URL params
  useEffect(() => {
    const keyword = searchParams?.get('keyword') || '';
    setFilters(prev => {
      // Only update if keyword actually changed
      if (prev.keyword !== keyword) {
        return { ...prev, keyword };
      }
      return prev;
    });
  }, [searchParams]);

  // Helper functions
  const toggleType = (type: 'course' | 'post' | 'topic') => {
    setFilters(prev => ({
      ...prev,
      types: prev.types.includes(type)
        ? prev.types.filter(t => t !== type)
        : [...prev.types, type]
    }));
  };

  const toggleAllTypes = () => {
    setFilters(prev => ({
      ...prev,
      types: prev.types.length === 3 ? [] : ['course', 'post', 'topic']
    }));
  };


  const resetFilters = () => {
    setFilters({
      keyword: searchParams?.get('keyword') || '',
      types: ['course', 'post', 'topic'],
    });
  };

  // Computed values
  const isAllTypesSelected = filters.types.length === 3;
  const hasActiveFilters = filters.types.length < 3;

  // Show loading state while debouncing
  const isSearching = filters.keyword !== debouncedKeyword && filters.keyword.length > 0;

  // API params for LoadMore component using debounced keyword
  const apiParams = useMemo(() => ({
    page: 1,
    limit: 4,
    keyword: debouncedKeyword, // Use debounced keyword for API calls
    dataTypes: filters.types,
  }), [debouncedKeyword, filters.types]);

  return {
    filters,
    debouncedKeyword,
    isSearching,
    apiParams,
    isAllTypesSelected,
    hasActiveFilters,
    toggleType,
    toggleAllTypes,
    resetFilters,
  };
}; 