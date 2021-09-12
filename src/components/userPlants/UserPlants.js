import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Image } from "semantic-ui-react";
import PlantCard from "./PlantCard";
import {
  setGreenhouse,
  resetGreenhouse,
} from "../../redux/actions/greenhouseActions";
import { api } from "../../services/api";

class UserPlants extends Component {
  // need to refactor into redux store
  state = {
    error: null,
  };

  componentDidMount() {
    this.handleGetUser();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.handleGetUser();
    }
  }

  handleGetUser = () => {
    const {
      match: {
        params: { id },
      },
      user,
    } = this.props;

    if (parseInt(id) !== user.id) {
      this.getUserShow(id);
    } else {
      this.props.resetGreenhouse();
    }
  };

  getUserShow = (id) => {
    api.userPlants
      .getUserGreenhouse(id)
      .then((data) => {
        if (data.error) {
          // this.setState({ error: data.error });
        } else {
          this.props.setGreenhouse(data);
          // this.setState({ error: null });
        }
      })
      .catch(console.log);
  };

  displayUserPlants = (username, userPlants) => {
    const { user, history, location } = this.props;

    return userPlants.length === 0 ? (
      <h2>No Plants &#9785; </h2>
    ) : (
      <div className="plant-cards-container">
        {userPlants.map((plant) => (
          <PlantCard
            key={plant.id}
            history={history}
            userPlant={plant}
            username={username}
            user={user}
            location={location}
          />
        ))}
      </div>
    );
  };

  displayFavoritePlantSpecies = (username, favoritePlantSpecies) => {
    return favoritePlantSpecies.length === 0 ? (
      <h1>No Favorite Plants &#9785; </h1>
    ) : (
      <div className="plant-cards-container">
        <h3>{username}'s favorite species </h3>
      </div>
    );
  };

  handleNewPlantClick = () => {
    this.props.history.push("/new_plant");
  };

  // handleAddFriendClick = () => {
  //   console.log('will add friend request when backend built')
  // }

  displayLoggedInUser = ({
    profile_photo,
    username,
    experience_level,
    zone,
    user_plants,
    favorite_plant_species,
  }) => {
    return (
      <>
        <section id="garden-header">
          <Image
            src={profile_photo}
            size="small"
            className="user-image"
            circular
            floated="left"
          />
          <div className="garden-details">
            <h1 id="title"> {username}'s greenhouse </h1>
            <h2>experience level: {experience_level}</h2>
            <h2>grow zone: {zone}</h2>
            <Button onClick={this.handleNewPlantClick}>
              Add New Plant Friend
            </Button>
            <Link to="/edit-profile">
              <Button>Edit Profile</Button>
            </Link>
          </div>
        </section>
        {this.displayUserPlants(username, user_plants)}
        {/* {this.displayFavoritePlantSpecies(username, favorite_plant_species)} */}
      </>
    );
  };

  render() {
    const {
      user,
      username,
      zone,
      profilePhoto,
      experienceLevel,
      favoritePlantSpecies,
      userPlants,
      match: { params },
    } = this.props;
    const { error } = this.state;

    if (user.id === parseInt(params.id)) {
      return this.displayLoggedInUser(user);
    }

    return (
      <>
        {error ? (
          <p className="error">{error}</p>
        ) : (
          <>
            <section id="garden-header">
              <Image
                src={profilePhoto}
                size="small"
                className="user-image"
                circular
                floated="left"
              />
              <div className="garden-details">
                <h1 id="title"> {username}'s Garden </h1>
                <h2>experience level: {experienceLevel}</h2>
                <h2>grow zone: {zone}</h2>
                {/* <Button onClick={this.handleAddFriendClick}>Add Friend</Button> */}
              </div>
            </section>
            {this.displayUserPlants(username, userPlants)}
            {/* {this.displayFavoritePlantSpecies(username, favoritePlantSpecies)} */}
          </>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    username,
    zone,
    experience_level,
    id,
    favorite_plant_species,
    user_plants,
    profile_photo,
  } = state.greenhouseReducer.greenhouse;

  return {
    user: state.userReducer,
    username,
    zone,
    experienceLevel: experience_level,
    id,
    favoritePlantSpecies: favorite_plant_species,
    userPlants: user_plants,
    profilePhoto: profile_photo,
  };
};

export default connect(mapStateToProps, { setGreenhouse, resetGreenhouse })(
  UserPlants
);
