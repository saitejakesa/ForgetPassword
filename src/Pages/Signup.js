import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Form, FormGroup, Input, Label, Spinner } from 'reactstrap';
import env from '../environment';

const Signup = () => {
  let [email, setEmail] = useState("");
  let [name, setname] = useState("");
  let [password, setPassword] = useState("");
  let [toggle, setToggle] = useState(false);
  let [message, setMessage] = useState("");
  let navigate = useNavigate();

  let handleLogin = async () => {
    setToggle(true);
    let res = await axios.post(`${env.apiurl}/users/signup`, {
      name,
      email,
      password,
    });
    if (res.data.statusCode === 200) {
      setToggle(false);
      sessionStorage.setItem("token", res.data.token);
      navigate("/");
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
      <div className="signup-wrapper">
        <h1>Welcome to Sign Up</h1>
        <p>Sign Up first to Login to your Account</p>
      </div>
      <div className="signup-main-wrapper">
        <Form>
        <FormGroup>
    <Label for="exampleText">
      Name
    </Label>
    <Input
      id="exampleText"
      name="text"
      placeholder="Enter Name"
      type="text"
      onChange={(e) => setname(e.target.value)}
    />
  </FormGroup>
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


          <Button color="primary" onClick={() => handleLogin()}>
            Submit
          </Button>

        </Form>
        {toggle ? <Spinner animation="border" color="primary" /> : <></>}
        {message ? (
          <div style={{ color: "red" }}>{message}</div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default Signup