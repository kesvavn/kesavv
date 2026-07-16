function DashboardCard({
title,
value,
color
}){


return(

<div 
className="dashboard-card"
style={{
borderLeft:`5px solid ${color}`
}}
>


<h5>
{title}
</h5>


<h2>
{value}
</h2>


</div>


)

}


export default DashboardCard;