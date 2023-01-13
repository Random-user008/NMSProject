import axios from 'axios';
import React, { useState } from 'react';
//import Emr from './emr.model';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import "./AddDet.css";
// const bloodTypes = ['A+','A-','B+','B-','AB+','AB-','O+','O-'];
const AddDet = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const userID1 = location.state.userD;
    const [formData, setFormData] = useState({
        userID: userID1,
        name: '',
        IpAddress: '',
        Alerts: []
    });

    const handleChange = event => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = event => {
        event.preventDefault();
        console.log(formData);
        axios.post("http://localhost:8080/addDev", formData).then((res) => {
            if (res.status === 200) {
                alert("Data Saved!!")
                // document.getElementById("proceed").style.visibility = "visible";
                // navigation.navigate("twoFA");
                navigate('/home', { state: { email: userID1 } });
            }
            else {
                alert("Error!!")
            }
        })
            .catch((e) => {
                alert(e.message);
                // throw e;
            })
    };

    return (
        <form onSubmit={handleSubmit} className="container">
            <div className='wrapper'>
                <h1 className='title'>ADD DETAILS</h1>
                <div className="row">
                    <label htmlFor="name">Device Name: </label>
                    <input type="text" name="name" className='input' value={formData.name} onChange={handleChange} /> <br />
                    <br />
                </div>
                <div className="row">
                <label htmlFor="ip">Device IpAddress: </label>
                <input type="text" name="IpAddress" className='input' value={formData.IpAddress} onChange={handleChange} /> <br />
                </div>
                <br />
                <button type="submit" className='button'>Submit</button>
            </div>
        </form>

    );
};

export default AddDet;