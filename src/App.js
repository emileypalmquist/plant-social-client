import React, { Component } from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { reAuth } from "./redux/actions/userActions";
import { setPlants } from "./redux/actions/plantActions";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import About from "./components/About";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import CommunityGarden from "./components/CommunityGarden";
import UserPlants from "./components/userPlants/UserPlants";
import Explore from "./components/Explore";
import UserPlantForm from "./components/userPlants/UserPlantForm";
import UserPlantShow from "./components/userPlants/UserPlantShow";
import NotFound from "./components/NotFound";
import "./App.css";

const token = localStorage.getItem("token");

class App extends Component {
  componentDidMount() {
    if (token) {
      this.props.reAuth();
      this.props.setPlants();
    }
  }

  render() {
    const { user, errors } = this.props;

    return (
      <div className="app-container">
        <Router>
          <Nav />

          {errors &&
            errors.map((error) => (
              <p className="error" key={Math.random}>
                {error}
              </p>
            ))}

          <main className="app-content">
            
            {!localStorage.getItem("token") ? (
              <Switch>
                <Route exact path="/" component={About} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={SignUp} />
                <Redirect to="/login" />
              </Switch>
            ) : (
              <Switch>
                <Route exact path="/" component={About} />
                <Route
                  exact
                  path="/community-garden"
                  component={CommunityGarden}
                />
                <Route path="/greenhouse/:id" component={UserPlants} />
                <Route path="/plant/:id" component={UserPlantShow} />
                <Route exact path="/new_plant" component={UserPlantForm} />
                <Route exact path="/explore" component={Explore} />
                <Redirect from="/login" to="/community-garden" />
                <Redirect from="/signup" to="/community-garden" />
                <Route component={NotFound} />
              </Switch>
            )}
          </main>
          <Footer />
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer,
    errors: state.statusReducer.errors,
  };
};

export default connect(mapStateToProps, { reAuth, setPlants })(App);
