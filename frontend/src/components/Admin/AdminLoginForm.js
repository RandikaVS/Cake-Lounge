import { React, Component, useState } from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";

function AdminLoginForm(props) {
  //States and variables
  let history = useHistory();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  //handles email change
  const handleEmailChange = (event) => {
    event.persist();
    setEmail(event.target.value);
  };
  //handles password change
  const handlePasswordChange = (event) => {
    event.persist();
    setPassword(event.target.value);
  };
  //handles form submittion
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios
        .post("http://localhost:8080/admin/login", { email, password })
        .then((res) => {
          if (res) {
            //setting local storage vatiables

            localStorage.setItem("token", res.data.token);
            localStorage.setItem(
              "admin",
              JSON.stringify(res.data.administrator)
            );
            //resetting input fields
            setEmail("");
            setPassword("");
            //changing the logged state
            props.changeLogedState();
            history.push("../dashboard");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  if (props.logged) {
    return <></>;
  } else if (props.logged == false) {
    return (
      <>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="AdminEmail">Email</Label>
            <Input
              type="email"
              name="AdminEmail"
              value={email}
              id="AdminEmail"
              onChange={handleEmailChange}
              placeholder="Email"
            />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input
              type="password"
              name="AdminPassword"
              value={password}
              id="AdminPassword"
              onChange={handlePasswordChange}
              placeholder="password"
            />
          </FormGroup>
          <Button>Log In</Button>
        </Form>
      </>
    );
  }
}

export default AdminLoginForm;
