import React, { useState } from "react";
import { Input } from "../components/Input";

import bgImage from "../assets/images/carousel/image1.png";
import axios from "axios";

const URL = import.meta.env.API_URL

type FormFields = {
  email: string;
  name: string;
  password: string;
  cpassword: string;
};

export const SignUp = () => {
  const [formFields, setFormFields] = useState({
    email: "",
    name: "",
    password: "",
    cpassword: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    const updatedFields = {
      ...formFields,
      [name]: value,
    };

    setFormFields(updatedFields);

    validate(updatedFields);
  };


  const validate = (formFields: FormFields) => {
    const errors: Partial<FormFields> = {};
    console.log(formFields);

    //name validation
    if (!formFields.name) {
      errors.name = "name is required";
    }

    //Email validation
    if (!formFields.email) {
      errors.email = "email is required";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formFields.email)
    ) {
      errors.email = "email is not valide";
    }

    //password1 validation
    if (!formFields.password) {
      errors.password = "password is required";
    } else if (formFields.password.length < 8) {
      errors.password = "Password must contain 8 charecters";
    } else if (formFields.password.length > 15) {
      errors.password = "password must less than 15";
    } else if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~])/.test(
        formFields.password
      )
    ) {
      errors.password =
        "Password must include uppercase, lowercase, and a special character";
    }

    //passwor2 validation
    if (!formFields.cpassword) {
      errors.cpassword = "retype the password";
    } else if (formFields.cpassword !== formFields.password) {
      errors.cpassword = "Password must match";
    }

    setFormErrors(errors);
    console.log("form has errors: " + JSON.stringify(formErrors));

    return Object.keys(errors).length === 0;
  };

  const signup=async()=>{
    try {
      const response  = await axios(`${URL}/api/users/login`,{
        method:"POST",
        data:{
          
        }
      })

    } catch (error) {
      
    }
  }

  console.log(process.env.);
  

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validate(formFields)) {
      console.log("Submitted successfully: " + JSON.stringify(formFields));
      alert("Successfully Submitted");
    } else {
      console.log("errors");
    }
  };

  return (
    <div
      className="h-screen flex justify-center items-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <form
        onSubmit={handleSubmit}
        action=""
        noValidate
        className="login-bg p-4 rounded-xl md:w-[400px]"
      >
        <h1 className="text-center text-3xl font-bold mb-5">Sign Up</h1>
        <Input
          type="text"
          name="name"
          label="Name"
          handleChange={handleChange}
          formErrors={formErrors}
        />
        <Input
          type="email"
          name="email"
          label="Email"
          handleChange={handleChange}
          formErrors={formErrors}
        />
        <Input
          type="password"
          label="Password"
          name="password"
          handleChange={handleChange}
          formErrors={formErrors}
        />
        <Input
          type="password"
          label="Confirm Password"
          name="cpassword"
          handleChange={handleChange}
          formErrors={formErrors}
        />

        <button className="text-white bg-gradient-to-br from-[#CFB34C] to-[#765D03] text-[16px] font-semibold px-2.5 py-3 w-full rounded-sm mt-2.5">
          Submit
        </button>
      </form>
    </div>
  );
};
