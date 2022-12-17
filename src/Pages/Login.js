import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import env from "../environment";
import { Button, Form, FormGroup, Input, Label, Spinner } from "reactstrap";
import './Login.css'
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [toggle, setToggle] = useState(false);
  let [message, setMessage] = useState("");
  let navigate = useNavigate();
  


  let handleLogin = async () => {
    setToggle(true);
    let res = await axios.post(`${env.apiurl}/users/login`, {
      email,
      password,
    });
    if (res.data.statusCode === 200) {
      setToggle(false);
      sessionStorage.setItem("token", res.data.token);
      navigate("/home");
    } else {
      setToggle(false);
      setMessage(res.data.message);
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };
  return (
    <>
    <div></div>
      <div className="login-wrapper">
        <h1>Welcome to App</h1>
        <p>Login to Continue</p>
      </div>
      <div className="login-main-wrapper">
        <Form>
          <FormGroup className="mb-3">
            <Label>Email address</Label>
            <Input
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>

          <FormGroup className="mb-3">
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>

          <div className="buttonarrange">
            <div className="primarybuttons">
              <div>
                <Button color="warning" onClick={() => navigate(`/signup`)}>
                  SignUp
                </Button>
                </div>
                <div>
                <Button color="primary" onClick={() => handleLogin()}>
                  Submit
                </Button>
                </div>
            </div>
              <Button
                color="secondary"
                onClick={() => navigate(`/forgetpassword`)}
              >
                ForgetPassword
              </Button>
          </div>
        </Form>
        {toggle ? <Spinner animation="border" color="primary" /> : <></>}
        {message ? (
          <div style={{ color: "red"}}>{message}</div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default Login;
