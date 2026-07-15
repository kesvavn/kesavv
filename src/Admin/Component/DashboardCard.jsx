function DashboardCard({title, value, color, icon}) {

  return (
    <div 
      className="dashboard-card"
      style={{borderTop:`4px solid ${color}`}}
    >

      <div className="card-icon" style={{color}}>
        {icon}
      </div>

      <div>
        <h4>{title}</h4>
        <h2>{value}</h2>
      </div>

    </div>
  );
}

export default DashboardCard;