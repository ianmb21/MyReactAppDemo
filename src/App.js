import React from 'react';
import './App.css';
import { store } from "./store";
import { Provider } from "react-redux";
import Employee from './components/Employee';
import Login from './components/Login';
import { Container } from "@material-ui/core";
import { ToastProvider } from "react-toast-notifications";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
    <Provider store={store}>
      <ToastProvider autoDismiss={true}>
        <Container maxWidth="lg">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Employee" element={<Employee />} />
          </Routes>
        </Container>
      </ToastProvider>
    </Provider>
    </Router>
  );
}

export default App;
