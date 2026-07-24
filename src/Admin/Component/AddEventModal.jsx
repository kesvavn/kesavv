/*import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";


function AddEventModal({ show, handleClose, refreshEvents }) {


  const [formData, setFormData] = useState({

    eventName: "",
    category: "",
    description: "",
    startingPrice: "",
    maxGuests: "",
    duration: "",
    location: "",
    status: "Active",

  });


  const [imageFile, setImageFile] = useState(null);



  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });

  };




  // Upload Image

  const uploadImage = async () => {


    if(!imageFile){

      return "";

    }


    const data = new FormData();


    data.append(
      "image",
      imageFile
    );



    const res = await axios.post(

      "http://localhost:5000/api/upload",

      data,

      {

        headers:{

          "Content-Type":"multipart/form-data"

        }

      }

    );


    return res.data.image;


  };





  // Save Event

  const handleSubmit = async (e)=>{


    e.preventDefault();



    try{


      const image = await uploadImage();



      const eventData = {


        ...formData,


        image


      };




      console.log("Sending Event:", eventData);




      await axios.post(

        "http://localhost:5000/api/events",

        eventData

      );





      alert("Event Added Successfully");



      setFormData({

        eventName:"",
        category:"",
        description:"",
        startingPrice:"",
        maxGuests:"",
        duration:"",
        location:"",
        status:"Active"

      });



      setImageFile(null);



      refreshEvents();



      handleClose();




    }

    catch(error){


      console.log(
        error.response?.data || error.message
      );


      alert("Event Save Failed");


    }


  };





  return (


    <Modal

      show={show}

      onHide={handleClose}

      centered

    >



      <Modal.Header closeButton>


        <Modal.Title>

          Add New Event

        </Modal.Title>


      </Modal.Header>





      <Form onSubmit={handleSubmit}>


      <Modal.Body>



        <Form.Group className="mb-3">


          <Form.Label>
            Event Name
          </Form.Label>


          <Form.Control

            type="text"

            name="eventName"

            value={formData.eventName}

            onChange={handleChange}

            required

          />


        </Form.Group>





        <Form.Group className="mb-3">


          <Form.Label>
            Category
          </Form.Label>


          <Form.Select

            name="category"

            value={formData.category}

            onChange={handleChange}

            required

          >


            <option value="">
              Select Category
            </option>


            <option value="Wedding">
              Wedding
            </option>


            <option value="Reception">
              Reception
            </option>


            <option value="Corporate Event">
              Corporate Event
            </option>


            <option value="Private Party">
              Private Party
            </option>



          </Form.Select>


        </Form.Group>





        <Form.Group className="mb-3">


          <Form.Label>
            Event Image
          </Form.Label>


          <Form.Control

            type="file"

            accept="image/*"

            onChange={(e)=>
              setImageFile(
                e.target.files[0]
              )
            }

          />


        </Form.Group>





        <Form.Group className="mb-3">


          <Form.Label>
            Starting Price
          </Form.Label>


          <Form.Control

            type="number"

            name="startingPrice"

            value={formData.startingPrice}

            onChange={handleChange}

            required

          />


        </Form.Group>





        <Form.Group className="mb-3">


          <Form.Label>
            Maximum Guests
          </Form.Label>


          <Form.Control

            type="number"

            name="maxGuests"

            value={formData.maxGuests}

            onChange={handleChange}

            required

          />


        </Form.Group>





        <Form.Group className="mb-3">


          <Form.Label>
            Duration
          </Form.Label>


          <Form.Control

            type="text"

            name="duration"

            placeholder="1 Day"

            value={formData.duration}

            onChange={handleChange}

            required

          />


        </Form.Group>





        <Form.Group className="mb-3">


          <Form.Label>
            Location
          </Form.Label>


          <Form.Control

            type="text"

            name="location"

            value={formData.location}

            onChange={handleChange}

          />


        </Form.Group>





        <Form.Group className="mb-3">


          <Form.Label>
            Description
          </Form.Label>


          <Form.Control

            as="textarea"

            rows={3}

            name="description"

            value={formData.description}

            onChange={handleChange}

          />


        </Form.Group>





        <Form.Group>


          <Form.Label>
            Status
          </Form.Label>



          <Form.Select

            name="status"

            value={formData.status}

            onChange={handleChange}

          >


            <option value="Active">
              Active
            </option>


            <option value="Inactive">
              Inactive
            </option>


          </Form.Select>



        </Form.Group>




      </Modal.Body>





      <Modal.Footer>


        <Button

          variant="secondary"

          onClick={handleClose}

        >

          Cancel

        </Button>





        <Button

          variant="primary"

          type="submit"

        >

          Save Event

        </Button>



      </Modal.Footer>



      </Form>



    </Modal>


  );

}


export default AddEventModal;
*/