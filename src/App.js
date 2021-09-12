import React, { Component } from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { Message } from "semantic-ui-react";
import { reAuth } from "./redux/actions/userActions";
import { setUserPlants } from "./redux/actions/plantActions";
import { setLoading, removeErrors } from "./redux/actions/statusActions";

import WithLoading from "./higherOrderComponents/WithLoading";

import Nav from "./components/Nav";
import Footer from "./components/Footer";
import About from "./components/About";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import CommunityGarden from "./components/CommunityGarden";
import UserPlants from "./components/userPlants/UserPlants";
import UserPlantForm from "./components/userPlants/UserPlantForm";
import UserPlantShow from "./components/userPlants/UserPlantShow";
import NotFound from "./components/NotFound";
import EditUserInfo from "./components/EditUserInfo";
import EditPlant from "./components/userPlants/EditPlant";
import LikedUserPlants from "./components/userPlants/LikedUserPlants";
import Explore from "./components/Explore";
import "./App.css";

// import Explore from "./components/Explore";
// import PlantShow from "./components/plants/PlantShow";
const UserPlantsWithLoading = WithLoading(UserPlants);
const UserPlantShowWithLoading = WithLoading(UserPlantShow);
const CommunityGardenWithLoading = WithLoading(CommunityGarden);
const LikedUserPlantsWithLoading = WithLoading(LikedUserPlants);
const ExploreWithLoading = WithLoading(Explore);

const token = localStorage.getItem("token");

class App extends Component {
  componentDidMount() {
    if (token) {
      this.props.reAuth();
    }
  }

  componentDidUpdate(prevProps) {
    const { user, userPlants, setUserPlants } = this.props;

    if (prevProps.user.id !== user.id && userPlants.length === 0) {
      setUserPlants();
    }
  }

  render() {
    const { errors, loading, removeErrors } = this.props;

    return (
      <div className="app-container">
        <Router>
          <Nav />

          {errors &&
            errors.map((error) => (
              <Message warning key={Math.random} onClick={removeErrors}>
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
                  path="/community-greenhouse"
                  render={(routerProps) => (
                    <CommunityGardenWithLoading
                      {...routerProps}
                      isLoading={loading}
                    />
                  )}
                />
                <Route
                  exact
                  path="/liked-plants-greenhouse"
                  render={(routerProps) => (
                    <LikedUserPlantsWithLoading
                      {...routerProps}
                      isLoading={loading}
                    />
                  )}
                />
                <Route
                  path="/greenhouse/:id"
                  render={(routerProps) => (
                    <UserPlantsWithLoading
                      {...routerProps}
                      isLoading={loading}
                    />
                  )}
                />
                <Route
                  path="/user_plant/:id"
                  render={(routerProps) => (
                    <UserPlantShowWithLoading
                      {...routerProps}
                      isLoading={loading}
                    />
                  )}
                />
                <Route
                  path="/edit-plant/:id"
                  render={(routerProps) => <EditPlant {...routerProps} />}
                />
                {/* <Route path="/plant-species/:id" component={PlantShow} /> */}
                <Route exact path="/new_plant" component={UserPlantForm} />
                <Route
                  exact
                  path="/edit-profile"
                  render={(routerProps) => <EditUserInfo {...routerProps} />}
                />
                <Route
                  exact
                  path="/explore"
                  render={(routerProps) => (
                    <ExploreWithLoading {...routerProps} isLoading={loading} />
                  )}
                />
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
    userPlants: state.plantReducer.userPlants,
    loading: state.statusReducer.loading,
  };
};

export default connect(mapStateToProps, {
  reAuth,
  setUserPlants,
  setLoading,
  removeErrors,
})(App);
