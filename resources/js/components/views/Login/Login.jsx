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
  height: 447px;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  padding: 4em;
`;

const Greeting = styled.h1`
  margin-bottom: 1em;
`;

const Login = props => {
  const { login, isAuth } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const updateUser = e => {
    setUsername(e.target.value);
  };

  const updatePass = e => {
    setPassword(e.target.value);
  };

  const handleSubmit = async e => {
    console.log("uh");
    e.preventDefault();
    await login(username, password);
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
            <Greeting>Hey you, welcome back. </Greeting>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                className="form-control"
                id="email"
                type="email"
                placeholder="Enter username"
                name="email"
                value={username}
                onChange={updateUser}
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
                value={password}
                onChange={updatePass}
                required
              />
            </div>
            <button className="btn btn-primary" type="submit">
              Login
            </button>
          </Form>
          <p>
            Don't have account? &nbsp;<Link to="/signup">Sign up</Link>
          </p>
        </Container>
      )}
    </div>
  );
};

export default withRouter(Login);
