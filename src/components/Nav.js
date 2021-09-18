import { useState } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import Burger from "@animated-burgers/burger-squeeze";
import "@animated-burgers/burger-squeeze/dist/styles.css";
import { handleLogout } from "../redux/actions/userActions";
import "../App.css";

const Nav = ({ handleLogout, userId }) => {
  const [navOpen, setNavOpen] = useState(false);
  return (
    <header id="nav">
      <Burger isOpen={navOpen} onClick={() => setNavOpen(!navOpen)} />
      {!localStorage.token ? (
        <ul
          className={navOpen ? "nav hamburger-open" : "nav hamburger-closed"}
          onClick={() => setNavOpen(false)}
        >
          <li>
            <NavLink exact to="/" className="nav-item">
              {" "}
              About{" "}
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" className="nav-item">
              {" "}
              Login{" "}
            </NavLink>
          </li>
          <li>
            <NavLink to="/signup" className="nav-item">
              {" "}
              Sign Up{" "}
            </NavLink>
          </li>
        </ul>
      ) : (
        <ul
          className={navOpen ? "nav hamburger-open" : "nav hamburger-closed"}
          onClick={() => setNavOpen(false)}
        >
          <li>
            <NavLink to={`/greenhouse/${userId}`} className="nav-item">
              {" "}
              Your Greenhouse{" "}
            </NavLink>
          </li>
          <li>
            <NavLink to="/community-greenhouse" className="nav-item">
              {" "}
              Community Greenhouse{" "}
            </NavLink>
          </li>
          <li>
            <NavLink to="/liked-plants-greenhouse" className="nav-item">
              {" "}
              Favorites{" "}
            </NavLink>
          </li>
          <li>
            <NavLink to="/explore" className="nav-item">
              {" "}
              Explore{" "}
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" className="nav-item" onClick={handleLogout}>
              {" "}
              Log Out
            </NavLink>
          </li>
        </ul>
      )}
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    userId: state.userReducer.id,
    username: state.userReducer.username,
  };
};

export default connect(mapStateToProps, { handleLogout })(Nav);
