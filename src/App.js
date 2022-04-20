import React from 'react';
import './App.css';
import { store } from "./store";
// import { Provider } from "react-redux";
import Employee from './components/Employee';
import Login from './components/Login';
import { Container, AppBar, Toolbar, Typography, Button, IconButton } from "@material-ui/core";
import { ToastProvider } from "react-toast-notifications";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {logout} from "./actions/login";

function App() {
  const user = useSelector((state) => state.userLogin.user)
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <Router>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' component='div' style={{ flexGrow: 1 }}>
            MY DEMO APP
          </Typography>
          {user && (
            <Button color='inherit' onClick={handleLogout}>Logout</Button>
          )}
        </Toolbar>
      </AppBar>
    {/* <Provider store={store}> */}
      <ToastProvider autoDismiss={true}>
        <Container maxWidth="lg">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Employee" element={<Employee />} />
          </Routes>
        </Container>
      </ToastProvider>
    {/* </Provider> */}
    </Router>
  );
}

export default App;
