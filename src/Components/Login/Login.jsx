import axios from "axios";
import Joi from "joi";
import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { AuthNoteContext } from "../Context/AuthNoteContext/AuthNoteContext";

export const Login = () => {
  const { saveUserData } = useContext(AuthNoteContext);
  const d = useSelector((state) => state.authSlice);


  //============ useState for set back error messages
  const [errBackMessage, setErrBackMessage] = useState([]);
  //============ useState for set back error messages
  const [errFrontMessage, setErrFrontMessage] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //=================================== useState for set names value from user use name of input
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  //========================= validation form data
  const validateFormData = () => {
    const schema = Joi.object({
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .required(),

      password: Joi.string().min(4).messages({
        "string.pattern.base":
          "password must to be contain min 8 letters capital and small  and spacial characters ",
      }),
    });
    return schema.validate(user, { abortEarly: false });
  };
  //======================== use navigate to go to login
  const navigate = useNavigate();
  const goToNote = () => {
    navigate("/note");
  };

  //============================= submit button onSubmit

  const submitForm = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const validationResponse = validateFormData();
    if (validationResponse.error?.details) {
      setErrFrontMessage(validationResponse.error?.details);
    } else {
      try {
        const { data } = await axios.post(
          "https://shaban-hamdy-to-do-list-nodejs.vercel.app/user/login",
          user
        );
        localStorage.setItem("token", "shaban__" + data.token);
        saveUserData();
        goToNote();
      } catch (error) {
        if (error.response?.data?.message === "validation error") {
          setErrBackMessage([error.response.data.validationError]);
        } else {
          setErrBackMessage([error.response?.data]);
        }
      }
    }
    setIsLoading(false);
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
    if (errFrontMessage?.length) {
      let x = errFrontMessage.filter((err) =>
        err?.message.includes(parameters)
      );

      if (x[0] !== undefined && errBackMessage.length == 0) {
        return <div className="alert bg-danger  p-1 mt-2">{x[0].message}</div>;
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
      <div className="container p-5 ">
        <div className="register w-50 m-auto text-white">
          <h2 className="text-center mb-5">Login</h2>
          <form onSubmit={submitForm}>
            <div className="div my-3">
              <label htmlFor="email">Email</label>
              <input
                onChange={getInputValue}
                type="email"
                className="form-control"
                name="email"
              />

              {showErrFrontMag("email")}
              {showBackErrMeg("invalid email information")}
            </div>
            <div className="div">
              <label htmlFor="password">Password</label>
              <input
                onChange={getInputValue}
                type="password"
                className="form-control"
                name="password"
              />
              {showBackErrMeg("invalid Password information")}

              {showErrFrontMag("password")}
            </div>

            <div className="div my-4">
              {isLoading ? (
                <button className="btn btn-primary my-3 float-end">
                  <ClipLoader color="#fff" size={20} />
                </button>
              ) : (
                <button className="btn btn-primary my-3 float-end">
                  Login
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
