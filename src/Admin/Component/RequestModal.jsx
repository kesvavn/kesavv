import React from "react";
import { Modal, Button } from "react-bootstrap";
import "../pagecss/Request.css"

function RequestModal({
show,
handleClose,
request
}){


if(!request)
return null;



return(

<Modal
show={show}
onHide={handleClose}
size="lg"
>


<Modal.Header closeButton>

<Modal.Title>
Customer Request Details
</Modal.Title>


</Modal.Header>


<Modal.Body>

  <p><strong>Additional Package:</strong> {request.additionalPackage}</p>

  {request.functionType === "Corporate Event" && (
    <>
      <p><strong>Stage Setup:</strong> {request.stageSetup}</p>
      <p><strong>Sound System:</strong> {request.soundSystem}</p>
      <p><strong>LED Screen:</strong> {request.ledScreen}</p>
    </>
  )}

  {(request.functionType === "Wedding" ||
    request.functionType === "Reception") && (
    <>
      <p><strong>Makeup:</strong> {request.makeupLevel}</p>
      <p><strong>Decoration:</strong> {request.decorationLevel}</p>
      <p><strong>Photography:</strong> {request.photographyPackage}</p>
      <p><strong>Video:</strong> {request.videoPackage}</p>
      <p><strong>Food Category:</strong> {request.foodCategory}</p>
      <p><strong>Food Type:</strong> {request.foodType}</p>
    </>
  )}

  {request.functionType === "Private Party" && (
    <>
      <p><strong>Party Type:</strong> {request.privatePartyType}</p>
      <p><strong>Cake Package:</strong> {request.cakePackage}</p>
      <p><strong>Birthday Decoration:</strong> {request.birthdayDecoration}</p>
      <p><strong>Photography:</strong> {request.photographyPackage}</p>
      <p><strong>Music:</strong> {request.musicEntertainment}</p>
    </>
  )}

</Modal.Body>


<Modal.Body>


<table className="table table-bordered">


<tbody>


<tr>
<td>Name</td>
<td>{request.fullName}</td>
</tr>


<tr>
<td>Phone</td>
<td>{request.phone}</td>
</tr>


<tr>
<td>Email</td>
<td>{request.email}</td>
</tr>


<tr>
<td>Function</td>
<td>{request.functionType}</td>
</tr>


<tr>
<td>Date</td>
<td>{request.functionDate}</td>
</tr>


<tr>
<td>Guests</td>
<td>{request.guests}</td>
</tr>


<tr>
<td>Rooms</td>
<td>{request.rooms}</td>
</tr>


<tr>
<td>Total Price</td>
<td>
₹ {request.totalPrice?.toLocaleString()}
</td>
</tr>


<tr>
<td>Payment</td>
<td>
{request.paymentMethod}
</td>
</tr>


<tr>
<td>Status</td>
<td>
{request.status}
</td>
</tr>



</tbody>


</table>


</Modal.Body>



<Modal.Footer>


<Button
variant="secondary"
onClick={handleClose}
>

Close

</Button>


</Modal.Footer>



</Modal>


)


}


export default RequestModal;