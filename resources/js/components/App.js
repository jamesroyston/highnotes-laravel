import React from 'react';
import ReactDOM from 'react-dom'
import HeaderNav from './components/HeaderNav/HeaderNav'
import NoteSection from './components/NoteSection/NoteSection'
import Login from './components/HeaderNav/Login/Login'
import SignUp from './components/HeaderNav/SignUp/SignUp'
import Logout from './components/HeaderNav/Logout/Logout'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './contexts/AuthContext'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'

function App() {

  return (
    <Router>
      <AuthProvider>

        <div className="App">
          <HeaderNav />
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/logout">
              <Logout />
            </Route>
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
            <ProtectedRoute path="/profile" component={NoteSection} />
          </Switch>

        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
