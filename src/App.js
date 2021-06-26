import logo from './logo.svg';
import './App.css';
import Home from './components/Home/Home/Home.jsx';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";
import Topbar from './components/Home/Topbar/Topbar';
import Footer from './components/Home/Footer/Footer';
import Login from './components/Login/Login';
import WriteBlog from './components/Blogs/WriteBlog/WriteBlog';
import ViewBlog from './components/Blogs/ViewBlog/ViewBlog';
import Blogs from './components/Blogs/Blogs/Blogs';
import BlogList from './components/Blogs/BlogList/BlogList';
import NotFound from './components/NotFound/NotFound';
import Contact from './components/Home/Contact/Contact';
import { createContext, useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Dashboard from './components/Dashboard/Dashboard';
import ManageAdmin from './components/ManageAdmin/ManageAdmin';

export const UserContext = createContext();

function App() {
  const [userDetails, setUserDetails] = useState({
    displayName: '',
    email: '',
    phoneNumber: '',
    photoURL: '',
    password: '',
    error: '',
    success: false
  })
  return (
    <UserContext.Provider value={[userDetails, setUserDetails]}>
      <Router>
        <Switch>
          <Route path="/login">
            <Topbar />
            <Login />
            <Footer />
          </Route>
          <PrivateRoute path="/write-blog">
            <Topbar />
            <WriteBlog />
            <Footer />
          </PrivateRoute>
          <Route path="/view-blog/:blogId">
            <Topbar />
            <ViewBlog />
            <Footer />
          </Route>
          <Route path="/blogs">
            <Topbar />
            <Blogs />
            <Footer />
          </Route>
          <PrivateRoute path="/dashboard">
            <Topbar />
            <Dashboard />
            <Footer />
          </PrivateRoute>
          <PrivateRoute path="/manage-admins">
            <Topbar />
            <ManageAdmin />
            <Footer />
          </PrivateRoute>
          <PrivateRoute path="/blog-list">
            <Topbar />
            <BlogList />
            <Footer />
          </PrivateRoute>
          <Route path="/contact">
            <Topbar />
            <Contact />
            <Footer />
          </Route>
          <Route exact path="/view-blog">
            <Topbar />
            <Redirect to="/" />
            <Footer />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
