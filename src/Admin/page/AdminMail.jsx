import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  Button,
  Badge,
  Modal,
  Card
} from "react-bootstrap";


const API = "http://localhost:5000";


function AdminMail() {

  const [messages, setMessages] = useState([]);
  const [selectedMail, setSelectedMail] = useState(null);


  // Get Contact Messages
  const fetchMessages = async () => {

    try {

      const res = await axios.get(
        `${API}/api/contact`
      );

      setMessages(res.data);

    } catch (error) {
      console.log(error);
    }

  };


  useEffect(() => {

    fetchMessages();

  }, []);



  // Mark Read
  const markRead = async(id)=>{

    await axios.put(
      `${API}/api/contact/${id}`,
      {
        status:"Read"
      }
    );

    fetchMessages();

  };



  return (

    <div className="container mt-4">


      <h3 className="mb-4">
        Admin Mail Inbox
      </h3>


      <Card>

      <Table responsive hover>

      <thead className="table-dark">

      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Message</th>
        <th>Status</th>
        <th>Action</th>
      </tr>

      </thead>


      <tbody>


      {
        messages.map((mail)=>(

          <tr key={mail._id}>


          <td>
            {mail.name}
          </td>


          <td>
            {mail.email}
          </td>


          <td>
            {mail.phone}
          </td>


          <td>
            {mail.message.substring(0,30)}...
          </td>


          <td>

          <Badge bg={
            mail.status==="Unread"
            ?
            "danger"
            :
            "success"
          }>

          {mail.status || "Unread"}

          </Badge>

          </td>



          <td>


          <Button
          size="sm"
          variant="primary"
          onClick={()=>{

            setSelectedMail(mail);
            markRead(mail._id);

          }}
          >

          View

          </Button>


          </td>


          </tr>

        ))
      }


      </tbody>


      </Table>

      </Card>




      {/* Message Modal */}

      <Modal
      show={selectedMail !== null}
      onHide={()=>setSelectedMail(null)}
      >

      <Modal.Header closeButton>

      <Modal.Title>
        Mail Details
      </Modal.Title>

      </Modal.Header>



      <Modal.Body>


      {
        selectedMail &&

        <>

        <h5>
        {selectedMail.name}
        </h5>


        <p>
        Email : {selectedMail.email}
        </p>


        <p>
        Phone : {selectedMail.phone}
        </p>


        <hr/>


        <p>
        {selectedMail.message}
        </p>


        </>

      }


      </Modal.Body>


      </Modal>


    </div>

  );

}


export default AdminMail;