import React, { useState, useEffect } from "react";
import axios from "axios";
import AddEventModal from "../Component/AddEventModal";
import "../pagecss/Events.css";

function Events() {

  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
const [editEvent, setEditEvent] = useState(null);

  useEffect(() => {
    getEvents();
  }, []);


  const getEvents = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/events"
      );

      setEvents(res.data);

    } catch (err) {

      console.log(err);

    }

  };



  const deleteEvent = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this event?"
    );

    if(!confirmDelete) return;


    try {

      await axios.delete(
        `http://localhost:5000/api/events/${id}`
      );

      getEvents();


    } catch(err){

      console.log(err);

    }

  };



  return (

    <div className="events-page">


      <div className="events-header">

        <h2>
          Events
        </h2>


        <button

          className="add-btn"

          onClick={() => setShowModal(true)}

        >

          + Add Event

        </button>


      </div>



      <table className="events-table">


        <thead>

          <tr>

            <th>Image</th>

            <th>Event</th>

            <th>Category</th>

            <th>Price</th>

            <th>Guests</th>

            <th>Duration</th>

            <th>Status</th>

            <th>Action</th>


          </tr>

        </thead>



        <tbody>


        {
          events.length > 0 ?

          (

          events.map((item)=>(


            <tr key={item._id}>


              <td>

                <img

                  src={
                    item.image
                    ? `http://localhost:5000${item.image}`
                    : "/no-image.png"
                  }

                  alt={item.eventName}

                  className="event-image"

                />

              </td>



              <td>
                {item.eventName}
              </td>



              <td>
                {item.category}
              </td>



              <td>
                ₹ {item.startingPrice}
              </td>



              <td>
                {item.maxGuests}
              </td>



              <td>
                {item.duration}
              </td>



              <td>

                <span

                  className={
                    item.status === "Active"
                    ? "active"
                    : "inactive"
                  }

                >

                  {item.status}

                </span>


              </td>



              <td>


              <button

className="edit-btn"

onClick={()=>{
  setEditEvent(item);
  setShowModal(true);
}}

>
Edit
</button>



                <button

                  className="delete-btn"

                  onClick={() => deleteEvent(item._id)}

                >

                  Delete

                </button>


              </td>



            </tr>


          ))

          )


          :

          (

          <tr>

            <td colSpan="8">

              No Events Found

            </td>

          </tr>

          )

        }



        </tbody>


      </table>




     <AddEventModal

show={showModal}

handleClose={()=>{
 setShowModal(false);
 setEditEvent(null);
}}

refreshEvents={getEvents}

editEvent={editEvent}

/>


    </div>

  );

}


export default Events;