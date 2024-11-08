import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from "./screens/Layout";
import Login from "./screens/Login/Login";
import Register from "./screens/Login/Register";
import PassReset from "./screens/Login/PassReset";
import Dashboard from "./screens/Dashboard";
import Chat from "./screens/Chat";
import Tips from "./screens/Tips";

function MainApp() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/resetPassword" element={<PassReset />} />
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/chat" element={<Layout><Chat /></Layout>} />
        <Route path="/tips" element={<Layout><Tips /></Layout>} />
      </Routes>
    </Router>
  );
}

export default MainApp;

