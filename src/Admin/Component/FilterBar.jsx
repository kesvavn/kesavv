import { Row, Col, Form, Button } from "react-bootstrap";

function FilterBar() {
  return (
    <div className="filter-wrapper">

      <Row className="g-3">

        <Col lg={3}>
          <Form.Label>Search</Form.Label>

          <Form.Control
            placeholder="Search by name, email or phone..."
          />
        </Col>

        <Col lg={2}>
          <Form.Label>Status</Form.Label>

          <Form.Select>
            <option>All Status</option>
            <option>Pending</option>
            <option>Responded</option>
            <option>Closed</option>
          </Form.Select>
        </Col>

        <Col lg={2}>
          <Form.Label>Function Type</Form.Label>

          <Form.Select>
            <option>All</option>
            <option>Wedding</option>
            <option>Birthday</option>
          </Form.Select>
        </Col>

        <Col lg={2}>
          <Form.Label>Date From</Form.Label>

          <Form.Control type="date" />
        </Col>

        <Col lg={2}>
          <Form.Label>Date To</Form.Label>

          <Form.Control type="date" />
        </Col>

        <Col lg={1} className="d-flex align-items-end">
          <Button className="filter-btn">
            Filter
          </Button>
        </Col>

      </Row>

    </div>
  );
}

export default FilterBar;