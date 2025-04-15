import React from 'react';
import { Pagination as BsPagination } from 'react-bootstrap';

interface PaginationProps {
  /** Current page (1-based) */
  currentPage: number;
  /** Total number of pages */
  totalPages: number;
  /** Array of page numbers to show */
  pageNumbers: number[];
  /** Handler for page change */
  onPageChange: (page: number) => void;
  /** Whether there's a previous page */
  hasPreviousPage: boolean;
  /** Whether there's a next page */
  hasNextPage: boolean;
  /** CSS class for the pagination component */
  className?: string;
  /** Size of the pagination component */
  size?: 'sm' | 'lg';
}

/**
 * Reusable pagination component based on Bootstrap Pagination
 * Works with the usePagination hook
 */
const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  pageNumbers,
  onPageChange,
  hasPreviousPage,
  hasNextPage,
  className = '',
  size,
}) => {
  if (totalPages <= 1) {
    return null; // Don't render pagination if there's only one page
  }

  return (
    <BsPagination size={size} className={className}>
      {/* First page button */}
      <BsPagination.First onClick={() => onPageChange(1)} disabled={!hasPreviousPage} />

      {/* Previous page button */}
      <BsPagination.Prev
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPreviousPage}
      />

      {/* Page number buttons */}
      {pageNumbers.map((pageNumber, index) => {
        if (pageNumber === -1) {
          // Render ellipsis
          return <BsPagination.Ellipsis key={`ellipsis-${index}`} disabled />;
        }

        return (
          <BsPagination.Item
            key={pageNumber}
            active={pageNumber === currentPage}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </BsPagination.Item>
        );
      })}

      {/* Next page button */}
      <BsPagination.Next onClick={() => onPageChange(currentPage + 1)} disabled={!hasNextPage} />

      {/* Last page button */}
      <BsPagination.Last onClick={() => onPageChange(totalPages)} disabled={!hasNextPage} />
    </BsPagination>
  );
};

export default Pagination;
