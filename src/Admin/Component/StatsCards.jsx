import {
  FaEnvelope,
  FaClock,
  FaCheck,
  FaTrash
} from "react-icons/fa";

import "../Styles/StatsCard.css";

function StatsCards() {
  return (
    <div className="stats-wrapper">

      <div className="stats-card total-card">
        <div className="stats-icon">
          <FaEnvelope />
        </div>

        <div className="stats-content">
          <h2>128</h2>
          <p>Total Requests</p>
        </div>
      </div>

      <div className="stats-card pending-card">
        <div className="stats-icon">
          <FaClock />
        </div>

        <div className="stats-content">
          <h2>32</h2>
          <p>Pending</p>
        </div>
      </div>

      <div className="stats-card responded-card">
        <div className="stats-icon">
          <FaCheck />
        </div>

        <div className="stats-content">
          <h2>78</h2>
          <p>Responded</p>
        </div>
      </div>

      <div className="stats-card closed-card">
        <div className="stats-icon">
          <FaTrash />
        </div>

        <div className="stats-content">
          <h2>18</h2>
          <p>Closed</p>
        </div>
      </div>

    </div>
  );
}

export default StatsCards;