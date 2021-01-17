import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const PaginationStyles = styled.div`
  display: flex;
  border: 1px solid var(--grey);
  margin: 2rem 0;
  border-radius: 5px;
  text-align: center;
  & > * {
    padding: 1rem;
    flex: 1;
    border-right: 1px solid var(--grey);
    text-decoration: none;
    &[aria-current],
    &.current {
      color: var(--red);
    }
    &[disabled] {
      pointer-events: none;
      color: var(--gray);
    }
  }
`;

export default function Pagination({
  pageSize,
  totalCount,
  currentPage,
  base,
}) {
  const totalPages = Math.ceil(totalCount / pageSize);
  return (
    <PaginationStyles>
      <Link disabled={currentPage === 1} to={`${base}/${currentPage - 1}`}>
        ⬅ Prev
      </Link>
      {Array.from({ length: totalPages }).map((_, i) => (
        <Link
          className={currentPage === 1 && i === 0 ? 'current' : ''}
          to={`${base}/${i === 0 ? '' : i + 1}`}
        >
          {i + 1}
        </Link>
      ))}
      <Link
        disabled={totalPages === currentPage}
        to={`${base}/${currentPage + 1}`}
      >
        Next ➡
      </Link>
    </PaginationStyles>
  );
}
