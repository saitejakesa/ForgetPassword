import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Form, FormGroup, Input, Label, Spinner } from 'reactstrap';
import env from '../environment';

function Forgetpassword() {
    let [email, setEmail] = useState("");
    let [toggle, setToggle] = useState(false);
    let [message, setMessage] = useState("");
    let navigate = useNavigate();
  
    let handleLogin = async () => {
      setToggle(true);
      let res = await axios.post(`${env.apiurl}/users/forgetpassword`, {
        email,
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
      <div className='ForgetPassword_wrapper'>
        <div className="password-wrapper">
          <h1>Welcome to App</h1>
          <p>Login to Continue</p>
        </div>
        <div className="password-main-wrapper">
          <Form>
            <FormGroup className="mb-3">
              <Label>Email address</Label>
              <Input
                type="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
  
            <Button variant="primary" onClick={() => handleLogin()}>
              Submit
            </Button>
          </Form>
          {toggle ? <Spinner animation="border" variant="primary" /> : <></>}
          {message ? (
            <div style={{ color: "red", textAlign: "center" }}>{message}</div>
          ) : (
            <></>
          )}
        </div>
      </div>
    );
}

export default Forgetpassword