import Layout from '../../skeleton/src/layout/Layout';
import Chat from '../../skeleton/src/screens/Chat';
import Dashboard from '../../skeleton/src/screens/Dashboard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Tips } from '../../skeleton/src/screens/Tips';
import Login from '../../skeleton/src/screens/Login/Login';
import Register from '../../skeleton/src/screens/Login/Register';
import ForgotPassword from '../../skeleton/src/screens/Login/ForgotPassword';

function MainApp() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/resetPassword" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<Layout> <Dashboard /></Layout>} />
        <Route path="/chat" element={<Layout> <Chat /></Layout>} />
        <Route path="/tips" element={<Layout> <Tips /></Layout>} />
      </Routes>
    </Router>
  );
}

export default MainApp;