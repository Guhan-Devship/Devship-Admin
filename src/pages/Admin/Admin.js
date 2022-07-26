import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { ToastContainer, toast } from "react-toastify";
import { isWebUri } from "valid-url";
import { useObjectUrl } from "../../useObjectUrl";
import axios from "axios";

function Admin() {
  //toast option
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  //form inputField
  const [inputFields, setInputField] = useState([]);
  //image hooks
  const {
    objectURL: imagePreviewUrl,
    setObject: setImage,
    object: image,
  } = useObjectUrl();
  //filechange
  const handleFileChange = (index, event) => {
    const value = [...inputFields];
    const [file] = event.target.files;

    if (!file || !file.type.startsWith("image/")) {
      alert("Invalid file format");
      return;
    }
    value[index][event.target.name] = file;
    setInputField(value);
    setImage(file);
  };
  //onchange
  const handleChangeInput = (index, event) => {
    const values = [...inputFields];
    values[index][event.target.name] = event.target.value;
    setInputField(values);
  };
  //submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      console.log(inputFields);
      for (const input of inputFields) {
        const formdata = new FormData();
        formdata.append("Name", input.Name);
        formdata.append("Url", input.Url);
        formdata.append("image", input.image);
        formdata.append("Active", input.Active);
        const data = await axios.post(
          "http://localhost:8080/createMember",
          formdata,
          {
            headers: {
              Authorization: window.localStorage.getItem("myapptoken"),
            },
          }
        );

        if (data.data.message !== "created") {
          toast.error(data.data.message, toastOptions);
        }
        if (data.data.message === "created") {
          toast.success("SuccessFully Created", toastOptions);
          fetchAll();
          window.location.reload();
        }
      }
    }
  };
  //validation
  const handleValidation = () => {
    const [{ Name, Url, Active }] = inputFields;
    if (Name.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (Url === "") {
      toast.error("Url is required.", toastOptions);
      return false;
    } else if (Active === "") {
      toast.error("Active is required.", toastOptions);
      return false;
    } else if (!isWebUri(Url)) {
      toast.error("InValid Url", toastOptions);
      return false;
    }
    return true;
  };
  // add form
  const handleAddField = () => {
    setInputField([
      ...inputFields,
      {
        Name: "",
        Url: "",
        Active: "",
        image: null,
      },
    ]);
  };
  //delete form
  const handleRemoveField = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputField(values);
  };
  //Get Member Data
  const [memberData, setMemberData] = useState([]);
  const [edit, setEdit] = useState([
    {
      Name: undefined,
      Active: undefined,
    },
  ]);
  async function fetchAll() {
    try {
      let listData = await axios.get("http://localhost:8080/getMember", {
        headers: {
          Authorization: window.localStorage.getItem("myapptoken"),
        },
      });
      setMemberData(listData.data);
      console.log(listData.data);
    } catch (error) {
      toast.error("Something went wrong", toastOptions);
    }
  }
  useEffect(() => {
    fetchAll();
  }, []);
  //delete member data
  let handleDelete = async (e, id) => {
    e.preventDefault();
    try {
      let ask = window.confirm(
        "Are you sure, do you want to delete this User?"
      );
      if (ask) {
        await axios.delete(`http://localhost:8080/deleteMember/${id}`, {
          headers: {
            Authorization: window.localStorage.getItem("myapptoken"),
          },
        });
        toast.success("Removed", toastOptions);
        fetchAll();
      }
    } catch (error) {
      alert("Something went wrong");
    }
  };

  const handleChange = (index, event) => {
    const values = [...memberData];
    values[index][event.target.name] = event.target.value;
    setMemberData(values);
    console.log(values);
  };
  //update validation
  const handleUpdateValidation = () => {
    const [{ Name, Url, Active }] = memberData;
    if (Name.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (Url === "") {
      toast.error("Url is required.", toastOptions);
      return false;
    } else if (Active === "") {
      toast.error("Active is required.", toastOptions);
      return false;
    } else if (!isWebUri(Url)) {
      toast.error("InValid Url", toastOptions);
      return false;
    }
    return true;
  };
  //Update Member Data
  const handleUpdate = async (e, id) => {
    e.preventDefault();
    for (let i = 0; i <= memberData.length; i++) {
      if (handleUpdateValidation()) {
        const updateData = await axios
          .put(`http://localhost:8080/updateMember/${id}`, memberData[i], {
            headers: {
              Authorization: window.localStorage.getItem("myapptoken"),
            },
          })
          .then((res) => {
            toast.success("Updated", toastOptions);
            fetchAll();
            window.location.reload();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };
  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-5">
        <div class="card-header py-3 mb-2 d-flex justify-content-between">
          <h6 class="m-0 font-weight-bold text-primary">Member Details</h6>
        </div>
        <div className="card-body">
          <form>
            {memberData.map((member, index) => (
              <div
                className="d-flex justify-content-space-around mb-4"
                key={index}
              >
                <img
                  className="img-fluid member-image"
                  alt="image"
                  src={`http://localhost:8080/${member.image}`}
                />
                <input
                  type="text"
                  className="form-control col-2 mx-1"
                  placeholder="Name"
                  name="Name"
                  id="Name"
                  value={member.Name}
                  onChange={(event) => handleChange(index, event)}
                  required
                />
                <input
                  type="text"
                  className="form-control col-4 mx-1"
                  placeholder="URL"
                  name="Url"
                  id="Url"
                  value={member.Url}
                  onChange={(event) => handleChange(index, event)}
                  required
                />
                <input
                  type="text"
                  className="form-control col-1 mx-1"
                  placeholder="Active"
                  name="Active"
                  id="Active"
                  value={member.Active}
                  onChange={(event) => handleChange(index, event)}
                  required
                />

                <button
                  className="btn btn-warning btn-sm me-2 rounded-pill"
                  onClick={(e) => handleUpdate(e, member._id)}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger btn-sm me-2 rounded-pill"
                  onClick={(e) => handleDelete(e, member._id)}
                >
                  X
                </button>
              </div>
            ))}
          </form>
        </div>
        <div className="card-body ">
          <form onSubmit={handleSubmit}>
            {imagePreviewUrl && (
              <img src={imagePreviewUrl} className="img-fluid preview-image" />
            )}
            {inputFields.map((inputField, index) => (
              <div
                className="d-flex justify-content-space-around mb-4"
                key={index}
              >
                <input
                  type="file"
                  className="form-control col-2 mx-1"
                  id="image"
                  name="image"
                  accept=".jpg,.png,.jpeg"
                  onChange={(event) => handleFileChange(index, event)}
                />

                <input
                  type="text"
                  className="form-control col-2 mx-1"
                  placeholder="Name"
                  name="Name"
                  id="Name"
                  value={inputField.Name}
                  onChange={(event) => handleChangeInput(index, event)}
                />

                <input
                  type="text"
                  className="form-control col-2 mx-1"
                  placeholder="URL"
                  name="Url"
                  id="Url"
                  value={inputField.Url}
                  onChange={(event) => handleChangeInput(index, event)}
                />

                <select
                  className="form-control col-2 mx-1"
                  name="Active"
                  onChange={(event) => handleChangeInput(index, event)}
                >
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
                <button
                  className="btn btn-danger btn-sm me-2 rounded-pill "
                  onClick={() => handleRemoveField(index)}
                >
                  X
                </button>
              </div>
            ))}
          </form>
          <button
            className="btn btn-primary btn-sm m-3"
            onClick={() => handleAddField()}
          >
            Add
          </button>
        </div>
        <button className="btn-sm btn-primary m-3" onClick={handleSubmit}>
          submit
        </button>
        <ToastContainer />
      </div>
    </>
  );
}

export default Admin;
