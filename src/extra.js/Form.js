import React from 'react'
import { useState } from 'react'

const Form = () => {
    const [formData, setFormData] = useState(
        {
            username: "",
            password: "",
            email: "",
            subscribed: true
        }
    )

function handleChange(event) {
        const { name, value, type, checked } = event.target 

        setFormData(prevFormData => ({
            ...prevFormData,
            [name] : type === "checkbox" ? checked : value
        }))
}

function handleSubmit(event) {
    event.preventDefault();
    console.log("success!")
    window.alert("success!")
}

return (

    <form className="form-container" onSubmit={handleSubmit}>
        <input 
            type="text"
            className="input-form"
            placeholder="Username"
            name="username"
            value={FormData.username}
            onChange={handleChange}
            ></input>
        <input 
            type="text"
            className="input-form"
            placeholder="Password"
            name="password"
            value={FormData.password}
            onChange={handleChange}
            ></input>
        <input 
            type="email"
            className="input-form"
            placeholder="E-mail Address"
            name="email"
            value={FormData.email}
            onChange={handleChange}
            ></input>
        <input
            id="subscribe"
            type="checkbox"
            className="input-checkbox"
            placeholder=''
            name="subscribed"    
            value={formData.subscribed}
            onChange={handleChange}
            ></input>
        <label htmlFor='subscribe'>Subscribe to our newsletter?</label>    
        <button className="signup-button">Sign-up</button>
    </form>

  )
}

export default Form;