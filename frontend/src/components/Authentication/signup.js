import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

const Signup = () => {
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [address, setAddress] = useState();
  const [pic, setPic] = useState();

  const history = useHistory();

  const handleClick = () => setShow(!show);
  const handleClick2 = () => setShow2(!show2);

  const postDetails = (pic) => {
    if (pic === undefined) {
      console.log("Plese upload an image!!!");
    }
    if (pic.type === "image/jpeg" || "image.png") {
      const data = new FormData();

      data.append("file", pic);

      data.append("upload_preset", "userImages");

      data.append("cloud_name", "cake-lounge");

      fetch("https://api.cloudinary.com/v1_1/cake-lounge/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())

        .then((data) => {
          //const imageUrl = data.url.toString();
          setPic(data.url.toString());

          pic = data.url.toString();
          //console.log(data.url.toString());
          console.log(pic);
        })
        .catch((err) => {
          console.log(err);
          //setPicLoading(false);
        });
    } else {
      console.log("Plese upload an image!!!");
    }
  };

  const loginHandle = async () => {
    //setPicLoading(true);

    if (!name || !email || !password || !confirmPassword || !address) {
      console.log("Fill the empty fields");
    }

    if (password !== confirmPassword) {
      window.alert("Passwords did not match!!!");
    } else {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const { data } = await axios.post(
          "/api/user",
          {
            name,
            email,
            password,
            address,
            pic,
          },

          config
        );
        console.log(data);

        localStorage.setItem("userInfo", JSON.stringify(data));
        Swal.fire({
          title: "success",
          text: "Registration Success",
          icon: "success",
          confirmButtonText: "Close",
        });

        history.push("/home");
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Registration failed",
          footer: '<a href="">Why do I have this issue?</a>',
        });

        console.log(`Error occured ${error.response.data.message}`);
      }
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Form>
        <div className="signupHeader">
          <h3>Sign Up</h3>
        </div>

        <Form.Group
          className="mb-3"
          controlId="forBasicName"
          style={{ width: "500px" }}
        >
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type={show ? "text" : "password"}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label="Show password"
            onClick={handleClick}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formConfirmPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type={show2 ? "text" : "password"}
            placeholder="Confirm-Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formConfirmCheckbox">
          <Form.Check
            type="checkbox"
            label="Show password"
            onClick={handleClick2}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Address"
            onChange={(e) => setAddress(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formFileSm" className="mb-3">
          <Form.Label>Upload your image</Form.Label>
          <Form.Control
            type="file"
            size="sm"
            onChange={(e) => postDetails(e.target.files[0])}
          />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={loginHandle}>
          Sign In
        </Button>
      </Form>
    </div>
  );
};

export default Signup;
