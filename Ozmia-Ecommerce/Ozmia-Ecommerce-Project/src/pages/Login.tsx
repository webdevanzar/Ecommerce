import React, { useState } from "react";
import { Input } from "../components/Input";

import bgImage from "../assets/images/carousel/image1.png";

type FormFields = {
  email: string;
  password: string;
};

export const Login = () => {
  const [formFields, setFormFields] = useState({
    email: "",
    password: "",
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

  console.log(formFields);

  const validate = (formFields: FormFields) => {
    const errors: Partial<FormFields> = {};
    console.log(formFields);

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

    setFormErrors(errors);
    console.log("form has errors: " + JSON.stringify(formErrors));

    return Object.keys(errors).length === 0;
  };

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
        <h1 className="text-center text-3xl font-bold mb-5">Login</h1>

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

        <button className="text-white bg-gradient-to-br from-[#CFB34C] to-[#765D03] text-[16px] font-semibold px-2.5 py-3 w-full rounded-sm mt-10">
          Submit
        </button>
      </form>
    </div>
  );
};
