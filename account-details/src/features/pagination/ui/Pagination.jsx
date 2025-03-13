import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
      pageNumbers.push(i);
    } else if ((i === currentPage - 2 && currentPage > 3) || 
              (i === currentPage + 2 && currentPage < totalPages - 2)) {
      pageNumbers.push('...');
    }
  }

  const uniquePageNumbers = pageNumbers.filter((number, index, array) => 
    number !== '...' || (number === '...' && array[index - 1] !== '...')
  );

  const renderPageButton = (page) => (
    <button 
      key={page}
      className={`pagination__button ${page === currentPage ? 'pagination__button--active' : ''}`}
      onClick={() => onPageChange(page)}
    >
      {page}
    </button>
  );

  return (
    <div className="pagination">
      <button 
        className="pagination__arrow-button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 1L1.70711 6.29289C1.31658 6.68342 1.31658 7.31658 1.70711 7.70711L7 13" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

      
      </button>

      {uniquePageNumbers.map((page, index) => 
        page === '...' 
          ? <span key={`ellipsis-${index}`} className="pagination__ellipsis">...</span>
          : renderPageButton(page)
      )}

      <button 
        className="pagination__arrow-button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1L6.29289 6.29289C6.68342 6.68342 6.68342 7.31658 6.29289 7.70711L1 13" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
};

export default Pagination;