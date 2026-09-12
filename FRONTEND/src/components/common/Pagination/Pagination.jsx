import "./Pagination.css";
function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  totalItems,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const getVisiblePages = () => {
    if (totalPages <= 5) {
      return pageNumbers;
    }

    if (currentPage <= 3) {
      return [...pageNumbers.slice(0, 5), "...", totalPages];
    }

    if (currentPage >= totalPages - 2) {
      return [1, "...", ...pageNumbers.slice(totalPages - 5)];
    }

    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  const visiblePages = getVisiblePages();

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="pagination-container">
      <div className="pagination-info">
        Showing {startItem}-{endItem} of {totalItems} items
      </div>

      <div className="pagination">
        <button
          className="pagination-btn"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Previous
        </button>

        <div className="pagination-numbers">
          {visiblePages.map((page, index) =>
            page === "..." ? (
              <span
                key={`ellipsis-${index}`}
                className="pagination-ellipsis"
              >
                ...
              </span>
            ) : (
              <button
                key={page}
                className={`pagination-number ${currentPage === page ? "active" : ""} [min-width:40px] [height:40px] [padding:0_12px] [background-color:var(--bg-card)] [border:1px_solid_var(--border-color)] [border-radius:4px] [color:var(--text-primary)] [font-size:14px] [font-weight:600] [cursor:pointer] [transition:all_0.3s_ease] [font-family:Gilroy,_-apple-system,_BlinkMacSystemFont,_Segoe_UI,_sans-serif] hover:[background-color:var(--bg-hover)] hover:[border-color:var(--primary-color)] [min-width:36px] [height:36px] [font-size:13px] [min-width:32px] [height:32px] [padding:0_8px] [font-size:12px] [background-color:var(--primary-color)] [color:var(--text-inverse)]`}
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>
            ),
          )}
        </div>

        <button
          className="pagination-btn"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Pagination;
