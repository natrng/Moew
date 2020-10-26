import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import 'antd/dist/antd.css';

import { Layout } from "antd";
import "./App.css";

import LandingPage from '../components/Landing/index'
import NavBar from "./Navbar";

function App() {
  return (
    <Layout className="layout">
      <NavBar/>
      <Router>
        <Route path="/" exact component={LandingPage} />
      </Router>
    </Layout>
  );
}

export default App;
