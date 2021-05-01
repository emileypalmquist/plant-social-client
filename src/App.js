import React, { Component } from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import {Message} from "semantic-ui-react"
import { reAuth } from "./redux/actions/userActions";
import { setUserPlants } from "./redux/actions/plantActions";

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
import PlantShow from "./components/plants/PlantShow";
import NotFound from "./components/NotFound";
import "./App.css";

const token = localStorage.getItem("token");

class App extends Component {
  componentDidMount() {
    if (token) {
      this.props.reAuth();
    }
  }

  componentDidUpdate(prevProps) {
    const {user, userPlants, setUserPlants} = this.props
   
    if (prevProps.user.id !== user.id && userPlants.length === 0) {
      setUserPlants();
    }
  }

  render() {
    const { errors } = this.props;

    return (
      <div className="app-container">
        <Router>
          <Nav />

          {errors &&
            errors.map((error) => (
              <Message warning key={Math.random}>
                <Message.Header>{error}</Message.Header>
              </Message>
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
                <Route path="/user_plant/:id" component={UserPlantShow} />
                <Route path="/plant/:id" component={PlantShow} />
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
    userPlants: state.plantReducer.userPlants
  };
};

export default connect(mapStateToProps, { reAuth, setUserPlants })(App);
