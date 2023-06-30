import axios from "axios";
import Joi from "joi";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

export const Register = () => {
  const [isLoading, setIsLoading] = useState(false);

  //============ useState for set back error messages
  const [errBackMessage, setErrBackMessage] = useState([]);
  //============ useState for set back error messages
  const [errFrontMessage, setErrFrontMessage] = useState([]);

  //=================================== useState for set names value from user use name of input
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });
  //========================= validation form data
  const validateFormData = () => {
    const schema = Joi.object({
      firstName: Joi.string().alphanum().min(2).max(20).required(),
      lastName: Joi.string().alphanum().min(2).max(20).required(),
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .required(),

      password: Joi.string().min(4).required()
        .messages({
          "string.pattern.base":
            "password must to be contain min 8 letters capital and small  and spacial characters ",
        }),

      confirmPassword: Joi.string()
        .valid(Joi.ref("password"))
        .messages({
          "any.only": "confirmPassword must to be the same value of password ",
        })
        .required(),
      phone: Joi.string().min(11).max(20).required(),
    });
    return schema.validate(user, { abortEarly: false });
  };
  //======================== use navigate to go to login
  const navigate = useNavigate();
  const goToLogin = () => {
    navigate("/");
  };

  //============================= submit button onSubmit

  const submitForm = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    const validationResponse = validateFormData();
    if (validationResponse.error?.details) {
      setErrFrontMessage(validationResponse.error?.details);
    } else {
      try {
        await axios.post("https://shaban-hamdy-to-do-list-nodejs.vercel.app/user/addUser", user);
        goToLogin();
      } catch (error) {
        if (error.response?.data?.message === "validation error") {
          setErrBackMessage([error.response.data.validationError]);
        } else {
          setErrBackMessage([error.response?.data]);
        }
      }
    }
    setIsLoading(false)
  };
  
  //===================================================== function show  backEnd messages
  const showBackErrMeg = (parameter) => {
    if (errBackMessage?.length) {
      let x = errBackMessage.filter((err) => err?.message?.includes(parameter));
      if (x[0] !== undefined) {
        return <div className="alert bg-danger p-1 mt-2">{x[0].message}</div>;
      }
    }
  };
  //===================================================== function show  FrontEnd messages

  const showErrFrontMag = (parameters) => {
    if (errFrontMessage?.length & (errBackMessage.length == 0)) {
      let x = errFrontMessage.filter((err) => err.message.includes(parameters));

      if (x[0] !== undefined) {
        return <div className="alert bg-danger p-1 mt-2">{x[0].message}</div>;
      }
    }
  };

  //========================================================= get value from inputs onChange
  const getInputValue = (e) => {
    let myUser = { ...user };
    myUser[e.target.name] = e.target.value;

    setUser(myUser);
  };
  return (
    <>
      <div className="container text-white">
        <div className="register w-50 m-auto">
          <h2 className="text-center mb-5">Register</h2>
          <form onSubmit={submitForm}>
            <div className="div">
              <label htmlFor="firstName">First Name</label>
              <input
                onChange={getInputValue}
                type="text"
                className="form-control"
                name="firstName"
              />

              {showErrFrontMag("firstName")}
            </div>
            <div className="div">
              <label htmlFor="lastName">Last Name</label>
              <input
                onChange={getInputValue}
                type="text"
                className="form-control"
                name="lastName"
              />
              {showErrFrontMag("lastName")}
              {showBackErrMeg("lastName")}
            </div>
            <div className="div">
              <label htmlFor="email">Email</label>
              <input
                onChange={getInputValue}
                type="email"
                className="form-control"
                name="email"
              />

              {showErrFrontMag("email")}
              {showBackErrMeg("email already exist")}
            </div>
            <div className="div">
              <label htmlFor="password">Password</label>
              <input
                onChange={getInputValue}
                type="password"
                className="form-control"
                name="password"
              />
              {showErrFrontMag("password")}
            </div>
            <div className="div">
              <label htmlFor="confirmPassword">Confirm password</label>
              <input
                onChange={getInputValue}
                type="password"
                className="form-control"
                name="confirmPassword"
              />
              {showErrFrontMag("confirmPassword")}
            </div>
            <div className="div">
              <label htmlFor="phone">Mobile Number</label>
              <input
                onChange={getInputValue}
                type="text"
                className="form-control"
                name="phone"
              />
              {showErrFrontMag("phone")}
            </div>

            <div className="div my-4">
              {isLoading ? (
               <button className="btn btn-primary my-3 float-end">
               <ClipLoader color="#fff" size={20} />
             </button>
             
              ) : (
                <button className="btn btn-primary my-3 float-end">
                  Register
                </button>
              )}
              <div className="clearfix"></div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
