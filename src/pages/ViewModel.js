import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from './Navbar'

function ViewModel() {
    function fetch() {
        if (!localStorage.getItem("myapptoken")) {
            navigate("/");
        }
    }
    const params= useParams()
    const navigate = useNavigate()
    const [user, setUserData] = useState([]);
    useEffect(() => {
        async function fetchData() {
          let user = await axios.get(`http://localhost:8080/getProduct/${params.id}`,
          {
            headers: {
              Authorization: window.localStorage.getItem('myapptoken'),
            },
          });
          setUserData(user.data);
        }
        fetchData();
      }, []);
      useEffect(() => {
        fetch()
    },[])
  return (
    <>
        <Navbar/>
        <div class="card w-50">
            <div class="card-body">
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <h3 class="card-title">Model Details</h3>
                            <p class="card-text">Name:<strong>{user.title}</strong></p>
                            <p class="card-text">Mobile:<strong>{user.model}</strong></p>
                            <p class="card-text">Price:<strong>{user.price}</strong></p>
                            <p class="card-text">OfferPrice:<strong>{user.offerPrice}</strong></p>
                            <div className="col-lg-6 mt-3">
                                <input
                                    type={"submit"}
                                    value="Close"
                                    onClick={() => navigate("/view/mobile", { replace: true })}
                                    className="btn btn-primary"
                                />
                            </div>
                        </div>
                        <div className="col-6">
                            <img src={user.img} className="img-fluid"/>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        </>
  )
}

export default ViewModel