// src/Pagination.jsx
import React from "react";
import "./App.css";
import { Pagination } from "react-bootstrap";

function CustomPagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="d-flex justify-content-center mt-4">
      <Pagination>
        <Pagination.Prev
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        />
        {[...Array(totalPages)].map((_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => onPageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        />
      </Pagination>
    </div>
  );
}

export default CustomPagination;
