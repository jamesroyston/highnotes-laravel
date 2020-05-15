import React, { useState, useContext } from "react";
import styled from "styled-components";
import { withRouter, Redirect, Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const Container = styled.div`
  background-color: #fff !important;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
`;

const Form = styled.form`
  background-color: rgb(250, 250, 250);
  width: 560px;
  height: 40em;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  padding: 4em;
`;

const Greeting = styled.h1`
  margin-bottom: 1em;
`;

const SignUp = props => {
  const { signup, isAuth } = useContext(AuthContext);
  const [payload, setPayload] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
  });

  const updateName = e => {
    setPayload({ ...payload, name: e.target.value });
  };

  const updateEmail = e => {
    setPayload({ ...payload, email: e.target.value });
  };

  const updatePass = e => {
    setPayload({ ...payload, password: e.target.value });
  };

  const updateConfirm = e => {
    setPayload({ ...payload, password_confirmation: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { name, email, password, password_confirmation } = payload;
    await signup(name, email, password, password_confirmation);
    if (isAuth) {
      await props.history.push("/profile");
    }
  };

  return (
    <div>
      {isAuth ? (
        <Redirect to="/profile" />
      ) : (
        <Container>
          <Form onSubmit={e => handleSubmit(e)}>
            <Greeting>Let's get started.</Greeting>
            <div className="form-group">
              <label htmlFor="username">Name</label>
              <input
                className="form-control"
                id="username"
                type="text"
                placeholder="Enter name"
                name="username"
                value={payload.name}
                onChange={updateName}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                className="form-control"
                id="email"
                type="email"
                placeholder="Enter email"
                name="username"
                value={payload.email}
                onChange={updateEmail}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                className="form-control"
                placeholder="Password"
                type="password"
                name="password"
                id="password"
                value={payload.password}
                onChange={updatePass}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="passwordConfirm">Confirm Password:</label>
              <input
                className="form-control"
                placeholder="Confirm password"
                type="password"
                name="password"
                id="passwordConfirm"
                value={payload.password_confirmation}
                onChange={updateConfirm}
                required
              />
            </div>
            <button className="btn btn-primary" type="submit">
              Sign up
            </button>
          </Form>
          <p>
            Already have an account? &nbsp;<Link to="/login">Login</Link>
          </p>
        </Container>
      )}
    </div>
  );
};

export default withRouter(SignUp);
