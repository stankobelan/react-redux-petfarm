import { useState, useMemo } from 'react';

interface PaginationOptions {
  /** Total number of items */
  totalItems: number;
  /** Number of items per page */
  itemsPerPage: number;
  /** Initial page (1-based) */
  initialPage?: number;
  /** Maximum number of page buttons to show */
  maxPageButtons?: number;
}

interface PaginationResult {
  /** Current page (1-based) */
  currentPage: number;
  /** Total number of pages */
  totalPages: number;
  /** Page size (items per page) */
  pageSize: number;
  /** Whether there's a previous page */
  hasPreviousPage: boolean;
  /** Whether there's a next page */
  hasNextPage: boolean;
  /** Index of the first item on the current page */
  firstItemIndex: number;
  /** Index of the last item on the current page */
  lastItemIndex: number;
  /** Array of page numbers to show in pagination UI */
  pageNumbers: number[];
  /** Set the current page */
  setPage: (page: number) => void;
  /** Go to the next page */
  nextPage: () => void;
  /** Go to the previous page */
  previousPage: () => void;
  /** Go to the first page */
  firstPage: () => void;
  /** Go to the last page */
  lastPage: () => void;
}

/**
 * Custom hook for managing pagination state
 * @param options - Pagination configuration options
 * @returns Pagination state and methods
 */
export function usePagination({
  totalItems,
  itemsPerPage,
  initialPage = 1,
  maxPageButtons = 5,
}: PaginationOptions): PaginationResult {
  const [currentPage, setCurrentPage] = useState(initialPage);

  // Calculate total pages
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  // Ensure current page is within valid range
  const validatedCurrentPage = useMemo(() => {
    return Math.min(Math.max(1, currentPage), totalPages);
  }, [currentPage, totalPages]);

  // If validatedCurrentPage is different from currentPage, update it
  if (validatedCurrentPage !== currentPage) {
    setCurrentPage(validatedCurrentPage);
  }

  // Calculate item indexes
  const firstItemIndex = (validatedCurrentPage - 1) * itemsPerPage;
  const lastItemIndex = Math.min(firstItemIndex + itemsPerPage - 1, totalItems - 1);

  // Generate page numbers to show in UI
  const pageNumbers = useMemo(() => {
    const pageNumbers: number[] = [];

    if (totalPages <= maxPageButtons) {
      // If total pages is less than max buttons, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Complex logic for when we need to show a subset of pages
      const halfMaxButtons = Math.floor(maxPageButtons / 2);

      let startPage = Math.max(1, validatedCurrentPage - halfMaxButtons);
      const endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

      // If we're near the end, adjust the start page
      if (endPage === totalPages) {
        startPage = Math.max(1, endPage - maxPageButtons + 1);
      }

      // Add page numbers
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      // Add ellipses indicators
      if (startPage > 1) {
        pageNumbers.unshift(-1); // -1 signifies ellipsis
        pageNumbers.unshift(1); // Always include first page
      }

      if (endPage < totalPages) {
        pageNumbers.push(-1); // -1 signifies ellipsis
        pageNumbers.push(totalPages); // Always include last page
      }
    }

    return pageNumbers;
  }, [validatedCurrentPage, totalPages, maxPageButtons]);

  // Navigation methods
  const setPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const nextPage = () => {
    setPage(validatedCurrentPage + 1);
  };

  const previousPage = () => {
    setPage(validatedCurrentPage - 1);
  };

  const firstPage = () => {
    setPage(1);
  };

  const lastPage = () => {
    setPage(totalPages);
  };

  return {
    currentPage: validatedCurrentPage,
    totalPages,
    pageSize: itemsPerPage,
    hasPreviousPage: validatedCurrentPage > 1,
    hasNextPage: validatedCurrentPage < totalPages,
    firstItemIndex,
    lastItemIndex,
    pageNumbers,
    setPage,
    nextPage,
    previousPage,
    firstPage,
    lastPage,
  };
}
