// Pagination.js

import React from 'react';

const Pagination = ({ totalCount, perPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalCount / perPage);

  // 이전 페이지로 이동하는 함수
  const goToPrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  // 다음 페이지로 이동하는 함수
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  if (totalPages === 1) {
    return null; // 페이지가 한 개일 경우 페이지네이션을 표시하지 않음
  }

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={goToPrevPage}>이전</button>
        </li>
        {pages.slice((currentPage - 1) * 10, currentPage * 10).map((page) => (
          <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
            <button className="page-link" onClick={() => onPageChange(page)}>{page}</button>
          </li>
        ))}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button className="page-link" onClick={goToNextPage}>다음</button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
