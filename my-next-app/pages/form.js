import React, { useState, useEffect } from 'react';
import './CSS/userForm.css';

const UserForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        comments: ''
    });

    const LOCAL_STORAGE_KEY = 'userForm';

    // Load cached data on mount
    useEffect(() => {
        const cachedData = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (cachedData) {
            setFormData(JSON.parse(cachedData));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        let temp = { ...formData };
        temp[name] = value;
        setFormData(temp);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
        alert('Form submitted successfully!');
        // setFormData({
        //     firstName: '',
        //     lastName: '',
        //     email: '',
        //     phone: '',
        //     address: '',
        //     city: '',
        //     state: '',
        //     zipCode: '',
        //     comments: ''
        // });
    };

    return (
        <form onSubmit={handleSubmit} className="userform">
            <h2>User Form</h2>
            <div className={"formContainer"}>
                <div className='control'>
                    <label>First Name:</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName ? formData.firstName : ""}
                        onChange={handleChange}
                    />
                </div>
                <div className='control'>
                    <label>Last Name:</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                </div>
                <div className='control'>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className='control'>
                    <label>Phone:</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>
                <div className='control'>
                    <label>Address:</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                    />
                </div>
                <div className='control'>
                    <label>City:</label>
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                    />
                </div>
                <div className='control'>
                    <label>State:</label>
                    <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                    />
                </div>
                <div className='control'>
                    <label>Zip Code:</label>
                    <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                    />
                </div>
                <div className='control'>
                    <label>Comments:</label>
                    <textarea
                        name="comments"
                        value={formData.comments}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div style={{display: "flex"}}>
                <button type="submit">Save Temporary Data</button>
                <button type="button" onClick={() => {
                    localStorage.removeItem(LOCAL_STORAGE_KEY);
                    setFormData({
                        firstName: '',
                        lastName: '',
                        email: '',
                        phone: '',
                        address: '',
                        city: '',
                        state: '',
                        zipCode: '',
                        comments: ''
                    });
                }}>
                    Clear Temporary Data
                </button>
            </div>
        </form>
    );
};

export default UserForm;
