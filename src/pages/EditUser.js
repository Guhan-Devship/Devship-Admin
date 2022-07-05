import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import Navbar from './Navbar';

function EditUser() {
    function fetch() {
        if (!localStorage.getItem("myapptoken")) {
            navigate("/");
        }
    }
    let params=useParams()
    const navigate = useNavigate()
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };
    const [credentials, setCredentials] = useState({
        name: undefined,
        mobile:undefined,
        email:undefined,
        isAdmin:undefined
    });
    const handleChange = (e) => {
        const id = e.target.id
        const value = e.target.value

        setCredentials((prevState) => ({
            ...prevState,
            [id]: value
        }))
    }
    useEffect(() => {
        async function fetchData() {
            try {
                let editdata = await axios.get(`http://localhost:8080/user/${params.id}`, {
                    headers: {
                        Authorization: window.localStorage.getItem('myapptoken'),
                    },
                })
                setCredentials({
                    name: editdata.data.name,
                    mobile: editdata.data.mobile,
                    email:editdata.data.email,
                    isAdmin: editdata.data.isAdmin,
                   
                })
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, []);
    useEffect(() => {
        fetch()
    },[])
    const handleUpdate = async () => {
        const updateData = await axios.put(`http://localhost:8080/updateUser/${params.id}`, credentials, {
            headers: {
                Authorization: window.localStorage.getItem('myapptoken'),
            },
        }).then((res) => {
            toast.success("Updated",toastOptions)
        }).catch((err) => {
            console.log(err)
        })
        navigate("/users", { replace: true });
    }
  return (
    <>
    <Navbar/>
    <div className="container mx-auto mt-5">
        <div class="card-header py-3 mb-2 d-flex justify-content-between">
            <h6 class="m-0 font-weight-bold text-primary">Update User</h6>
        </div>
        <div className='card-body'>
            <div className="row user-row">
                <div className="form-group col-sm-12 col-md-4 col-lg-6 col-xl-6 col-xxl-6 mb-5">
                    <input type="text" className="form-control" placeholder="username" id="name"  name="name" value={credentials.name} onChange={handleChange} />
                </div>
                <div className="form-group col-sm-12 col-md-4 col-lg-6 col-xl-6 col-xxl-6 mb-5">
                    <input type="text" className="form-control" placeholder="mobile" id="mobile"  name="mobile" value={credentials.mobile} onChange={handleChange} />
                </div>
                <div className="form-group col-sm-12 col-md-4 col-lg-6 col-xl-6 col-xxl-6 ">
                    <input type="email" className="form-control" placeholder="Email" id="email" name="email" value={credentials.email}  onChange={handleChange}  />
                </div>
                <div className="form-group col-sm-12 col-md-4 col-lg-6 col-xl-6 col-xxl-6 ">
                    <label>Change To Admin (true/false) </label>
                    <input type="text" className="form-control" placeholder="isAdmin" id="isAdmin" name="isAdmin" value={credentials.isAdmin}  onChange={handleChange}  />
                </div>
                <div className="col-4 mt-5 ms-2">
                    <Link to={'/users'}><button className="btn btn-danger btn-sm me-2">cancel</button></Link>
                    <button className="btn btn-primary btn-sm" onClick={() => handleUpdate()}>Update</button>
                </div>
            </div>
        </div>
        <ToastContainer/>
    </div>
</>
  )
}

export default EditUser