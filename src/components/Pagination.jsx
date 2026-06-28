export default function Pagination({ currentPage, totalPages, pageSize, onPageChange, onPageSizeChange, totalItems }) {
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  const pageNumbers = [];
  const maxVisible = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  let endPage = Math.min(totalPages, startPage + maxVisible - 1);
  if (endPage - startPage + 1 < maxVisible) {
    startPage = Math.max(1, endPage - maxVisible + 1);
  }
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      <div className="pagination-info">
        Showing {startItem} to {endItem} of {totalItems} results
      </div>
      <div className="pagination-controls">
        <div className="pagination-size">
          <label htmlFor="pageSize">Rows per page:</label>
          <select
            id="pageSize"
            className="page-size-select"
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
        <div className="pagination-buttons">
          <button
            className="btn btn-page"
            disabled={currentPage === 1}
            onClick={() => onPageChange(1)}
            title="First page"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="11 17 6 12 11 7" /><polyline points="18 17 13 12 18 7" />
            </svg>
          </button>
          <button
            className="btn btn-page"
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
            title="Previous page"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          {startPage > 1 && (
            <>
              <button className="btn btn-page" onClick={() => onPageChange(1)}>1</button>
              {startPage > 2 && <span className="page-ellipsis">...</span>}
            </>
          )}
          {pageNumbers.map(num => (
            <button
              key={num}
              className={`btn btn-page ${num === currentPage ? 'active' : ''}`}
              onClick={() => onPageChange(num)}
            >
              {num}
            </button>
          ))}
          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && <span className="page-ellipsis">...</span>}
              <button className="btn btn-page" onClick={() => onPageChange(totalPages)}>{totalPages}</button>
            </>
          )}
          <button
            className="btn btn-page"
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            title="Next page"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
          <button
            className="btn btn-page"
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(totalPages)}
            title="Last page"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="13 17 18 12 13 7" /><polyline points="6 17 11 12 6 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
