import axios from 'axios'
import React, { useState } from 'react'
import {  useLocation, useNavigate, useParams } from 'react-router-dom'
import { Form, Button, FormGroup, Input, Label, Spinner } from 'reactstrap'
import env from '../environment'

function Resetpassword() {
  let a=new URLSearchParams(useLocation().search);
  console.log(a.get('id'));

    let [confirmpassword, SetConfirmPassword] = useState("");
    let [Resetpassword, setResetPassword] = useState("");
    let [toggle, setToggle] = useState(false);
    let [message, setMessage] = useState("");
    let navigate = useNavigate();

    let handleSubmit = async () => {
        setToggle(true);
        let res = await axios.post(`${env.apiurl}/users/reset-password`, {
          Resetpassword,
          // id,
          // token,
          confirmpassword
        });

    if (res.data.statusCode === 200) {
      setToggle(false);
      setMessage(res.data.message);
      setTimeout(() => {
        setMessage("");
      }, 3000);
      navigate("/")
    }
    else{
      setToggle(false);
      setMessage(res.data.message);
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
    }
  return (
    <div>
     
      <div className="login-wrapper">
        <h1>Welcome to App</h1>
        <p>Login to Continue</p>
      </div>
      <div className="login-main-wrapper">
        <Form>
          <FormGroup className="mb-3">
            <Label>Reset Password</Label>
            <Input
              type="password"
              placeholder="Enter Password"
              onChange={(e) => setResetPassword(e.target.value)}
            />
          </FormGroup>

          <FormGroup className="mb-3">
            <Label>Password</Label>
            <Input
              type="confirmpassword"
              placeholder="Password"
              onChange={(e) => SetConfirmPassword(e.target.value)}
            />
          </FormGroup>

        <div className="buttonarrange">
            
                <Button color="warning" onClick={() => handleSubmit()} >
                  Submit
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
</div>
  )
}


// // export default Resetpassword

// import React from 'react'

// function Resetpassword() {
//   return (
//     <div>Resetpassword</div>
//   )
// }

export default Resetpassword