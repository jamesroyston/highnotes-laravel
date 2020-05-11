import React, { useState, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = props => {
    const lsState = localStorage['appState'] ? JSON.parse(localStorage['appState']) : '';
    const hasToken = lsState !== '';
    const [isAuth, setIsAuth] = useState(hasToken)
    const [user, setUser] = useState('')
    const [token, setToken] = useState("");
    const [sessionChecking, setSessionChecking] = useState(true);

    const signup = (name, email, pass, confirm) => {
        axios
            .post("api/auth/signup", {
                name,
                email,
                password: pass,
                password_confirmation: confirm
            })
            .then(res => {
                if (res.status === 200 || res.status === 201) {
                    return console.log("registration success!");
                }
            })
            .then(() => login(email, pass))
            .catch(err => err);
    };

    const login = (email, password) => {
        axios
            .post("api/auth/login", { email, password, remember_me: true })
            .then(res => {
                if (res.status === 200 || res.data.access_token.length > 0) {
                    const appState = {
                        email: email,
                        access_token: res.data.access_token
                    };
                    localStorage["appState"] = JSON.stringify(appState);
                    setToken(appState.access_token);
                    return setIsAuth(true);
                }
            })
            .catch(err => console.log(err));
    };

    const logout = () => {
        axios("api/auth/logout", {
            method: "get",
            headers: {
                Authorization: `Bearer ${localStorage['appState'] ? JSON.parse(localStorage['appState']).access_token : ''}`
            }
        })
            .then(res => {
                if (res.status === 200 || res.status === 304) {
                    setIsAuth(false);
                    setToken('');
                    localStorage['appState'] = '';
                    console.log("logged out....");
                }
            })
            .catch(err => console.log(err));
    };

    const sessionCheck = () => {
        const token = localStorage["appState"]
            ? JSON.parse(localStorage["appState"])
            : "";
        console.log('sessioncheck');
        //  /api/auth/user call on backend
        if (token === "") {
            setIsAuth(false);
            setSessionChecking(false);
            return;
        } else {

            return axios("api/auth/user", {
                method: "get",
                headers: {
                    Authorization: `Bearer ${token.access_token}`
                }
            })
            .then(res => {
                if (res.status === 200) {
                    const user = {
                        name: res.data.name,
                        email: res.data.email
                    }
                    setUser(user)
                    setIsAuth(true);
                    setSessionChecking(false);
                }
                if (res.status !== 200) {
                    setIsAuth(false);
                    // setSessionChecking(false);
                }
            })
            .catch(err => console.log(err));
        };
    }

    return (
        <AuthContext.Provider
            value={{
                isAuth,
                setIsAuth,
                login,
                logout,
                sessionCheck,
                sessionChecking,
                signup
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };
