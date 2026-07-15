import { Modal, Button } from "react-bootstrap";
import "../pagecss/Request.css";

function RequestModal({ show, handleClose, request, updateStatus }) {

  if (!request) return null;

  return (
    <Modal show={show} onHide={handleClose} centered>

      <Modal.Header closeButton>
        <Modal.Title>
          Customer Request Details
        </Modal.Title>
      </Modal.Header>


      <Modal.Body>

        <table className="table table-bordered">

          <tbody>

            <tr>
              <th>Customer</th>
              <td>{request.customer}</td>
            </tr>


            <tr>
              <th>Phone</th>
              <td>{request.phone}</td>
            </tr>


            <tr>
              <th>Event</th>
              <td>{request.event}</td>
            </tr>


            <tr>
              <th>Guests</th>
              <td>{request.guests}</td>
            </tr>


            <tr>
              <th>Estimated Price</th>
              <td>{request.price}</td>
            </tr>


            <tr>
              <th>Status</th>
              <td>
                <span className={request.status.toLowerCase()}>
                  {request.status}
                </span>
              </td>
            </tr>


          </tbody>

        </table>

      </Modal.Body>


      <Modal.Footer>


        <Button
          variant="success"
          onClick={() =>
            updateStatus(request.id, "Confirmed")
          }
        >
          Approve
        </Button>


        <Button
          variant="danger"
          onClick={() =>
            updateStatus(request.id, "Cancelled")
          }
        >
          Reject
        </Button>


        <Button
          variant="secondary"
          onClick={handleClose}
        >
          Close
        </Button>


      </Modal.Footer>


    </Modal>
  );
}


export default RequestModal;