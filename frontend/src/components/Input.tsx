import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

type FieldNames = "name" | "email" | "password" | "confirmPassword";

type InputProps = {
  type: "text" | "email" | "password";
  name: string;
  label: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formErrors?: Partial<Record<FieldNames, string>>;
};

export const Input: React.FC<InputProps> = ({
  type,
  name,
  handleChange,
  label,
  formErrors,
}) => {
  const [showPasswords, setShowPasswords] = useState<
    Partial<Record<FieldNames, boolean>>
  >({});

  const isPassword = type === "password";
  const show = showPasswords[name as FieldNames] ?? false;

  const toggleVisibility = () => {
    setShowPasswords((prev) => ({
      ...prev,
      [name]: !prev[name as FieldNames],
    }));
  };
  return (
    <div className="relative flex flex-col p-2 ">
      <label htmlFor="" className="text-[15px] font-bold">
        {label}
      </label>
      <input
        type={show ? "text" : type}
        name={name}
        className="border-b-2 border-white p-2 outline-none font-semibold text-lg rounded-sm bg-transparent"
        onChange={handleChange}
      />
      {isPassword && (
        <span
          className="absolute right-4 top-[42px] cursor-pointer"
          onClick={toggleVisibility}
        >
          {show ? <FiEyeOff size={18} /> : <FiEye size={18} />}
        </span>
      )}
      <p className="text-[12px] text-red-950">
        {formErrors?.[name as FieldNames]}
      </p>
    </div>
  );
};
