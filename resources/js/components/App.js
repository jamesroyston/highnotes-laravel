import React, { useContext } from "react";
import ReactDOM from "react-dom";
import Navbar from "./Navbar";
import Notes from "./views/Notes/Notes";
import Login from "./views/Login/Login";
import SignUp from "./views/SignUp/SignUp";
import Logout from "./views/Logout/Logout";
import ProtectedRoute from "./ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

function NoMatch() {
    return (
        <div
            style={{
                fontSize: "3rem"
            }}
        >
            Sorry. Not found.
        </div>
    );
}

function App() {
    const state = localStorage["appState"];
    const isAuth = state ? JSON.parse(state).access_token : "";

    return (
        <Router>
            <AuthProvider>
                <div className="App">
                    <Navbar />
                    <Switch>
                        <Route path="/login" component={Login} />
                        <Route path="/signup" component={SignUp} />
                        <Route path="/logout" component={Logout} />
                        <Route exact path="/">
                            {/* create a landing page for this route */}
                            <Redirect to="/login" />
                        </Route>
                        <ProtectedRoute path="/profile" component={Notes} />
                        {/* catch all */}
                        <Route component={NoMatch} />
                    </Switch>
                </div>
            </AuthProvider>
        </Router>
    );
}

export default App;

if (document.getElementById("app")) {
    ReactDOM.render(<App />, document.getElementById("app"));
}
