import React from 'react'
import { Link } from 'react-router-dom'

function DashboardCard(props) {
  return (
    <div class="col-xl-3 col-md-6">
            <div  class={props.card.color1?"card bg-primary text-white mb-4":
                        props.card.color2?"card bg-warning text-white mb-4":
                        props.card.color3?"card bg-success text-white mb-4":null}>
                <div class="card-body">{props.card.title}
                </div>
               
                <div class="card-footer d-flex align-items-center justify-content-between">
                    <Link to={props.card.link1?"/users":props.card.link2?"/product":props.card.link3?"/rooms":null} class="small text-white stretched-link">View Details</Link> 
                    <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                </div>
            </div>
        </div>
  )
}

export default DashboardCard