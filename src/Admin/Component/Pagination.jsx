import Pagination from "react-bootstrap/Pagination";

function CustomPagination() {
  return (
    <div className="pagination-wrapper">

      <Pagination>

        <Pagination.Prev />

        <Pagination.Item active>
          1
        </Pagination.Item>

        <Pagination.Item>
          2
        </Pagination.Item>

        <Pagination.Item>
          3
        </Pagination.Item>

        <Pagination.Next />

      </Pagination>

    </div>
  );
}

export default CustomPagination;