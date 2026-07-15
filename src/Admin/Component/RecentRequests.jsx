function RecentRequests() {
  const data = [
    {
      name: "Rahul",
      event: "Wedding",
      date: "15 Aug",
      status: "Pending",
    },

    {
      name: "Priya",
      event: "Birthday",
      date: "20 Aug",
      status: "Confirmed",
    },

    {
      name: "Arun",
      event: "Reception",
      date: "28 Aug",
      status: "Cancelled",
    },
  ];

  return (
    <div className="table-box">

      <h4>Recent Pricing Requests</h4>

      <table>

        <thead>

          <tr>

            <th>Name</th>

            <th>Event</th>

            <th>Date</th>

            <th>Status</th>

          </tr>

        </thead>

        <tbody>

          {data.map((item, index) => (

            <tr key={index}>

              <td>{item.name}</td>

              <td>{item.event}</td>

              <td>{item.date}</td>

              <td>{item.status}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default RecentRequests;