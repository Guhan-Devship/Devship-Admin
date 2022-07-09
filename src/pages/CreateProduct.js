import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import Navbar from './Navbar'

function CreateProduct() {
    function fetchData() {
        if (!localStorage.getItem("myapptoken")) {
            navigate("/");
        }
    }
    useEffect(() => {
        fetchData()
    },[])
    const navigate = useNavigate()
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };
    const [credentials, setCredentials] = useState({
        title: undefined,
        image:undefined,
    });
    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };
    const handleClick = async (e) => {
        e.preventDefault();
        if (handleValidation()) {
            const { title,image} = credentials;
            const data = await axios.post("http://localhost:8080/createNew", {
               title,
               image,
            })
            if (data.data.status !== true) {
                toast.error(data.data.message, toastOptions);
            }
            if (data.data.status === true) {
                toast.success("SuccessFully Created", toastOptions);
                navigate("/product");
            }
        };
    };
    const handleValidation = () => {
        const {  title } = credentials;
         if (title.length < 3) {
            toast.error(
                "Username should be greater than 3 characters.",
                toastOptions
            );
            return false;
        } 
        return true;
    };
  return (
    <>
            <Navbar />
            <div className="container mx-auto mt-5">
                <div class="card-header py-3 mb-2 d-flex justify-content-between">
                    <h6 class="m-0 font-weight-bold text-primary">Product Details</h6>
                </div>
                <div className='card-body'>
                <form >
                    <div className="row user-row">
                        <div className="form-group col-sm-12 col-md-4 col-lg-6 col-xl-6 col-xxl-6 mb-5">
                            <input type="text" className="form-control" placeholder="title" name='title'  id="title" onChange={handleChange}   />
                        </div>
                        <div className="form-group col-sm-12 col-md-4 col-lg-6 col-xl-6 col-xxl-6 ">
                        <label for="myfile">Select a file:</label>
                            <input type='file' className="form-control" name="myImage" accept="image/*"   />
                        </div>
                        <div className="col-4 mt-5 ms-2">
                            <Link to={'/product'}><button className="btn btn-danger btn-sm me-2">cancel</button></Link>
                            <button className="btn btn-primary btn-sm" onClick={handleClick} >Create</button>
                        </div>
                    </div>
                </form>
                </div>
                
                <ToastContainer/>
            </div>
           
        </>
  )
}

export default CreateProduct