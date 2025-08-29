import { Link } from "react-router-dom";
import "../styles/LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-container">
      
      <nav className="landing-nav">
        <h2>Welcome to Shopping Tracker 🛒</h2>
      </nav>

      <div className="landing-content">
        <h1>Smart Shopping Starts Here</h1>
        <p>Track your shopping items, upload images, and manage lists easily.</p>
        <div className="btn-group">
          <Link to="/register">
            <button className="landing-btn register-btn">Register</button>
          </Link>
          <Link to="/login">
            <button className="landing-btn login-btn">Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
