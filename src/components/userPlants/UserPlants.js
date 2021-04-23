import React, { Component } from "react";
import { connect } from "react-redux";
import PlantCard from "./PlantCard";
import {setGreenhouse} from "../../redux/actions/greenhouseActions"

const API = process.env.REACT_APP_BACKEND_BASE_URL;

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

    if (id != user.id) {
      this.getUserShow(id);
    } else {
      this.setUserState(user);
    }
  };

  setUserState = (user) => {
    this.props.setGreenhouse(user)
    this.setState({ error: null });
  };

  getUserShow = (id) => {
    const token = localStorage.token;

    fetch(API + "/users/" + id, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.error) {
          this.setState({ error: data.error });
        } else {
          this.props.setGreenhouse(data);
          this.setState({ error: null });
        }
      })
      .catch(console.log);
  };

  displayUserPlants = () => {
    // const { userPlants, username } = this.state;
    const { user, username, history, userPlants, location } = this.props;

    return userPlants.length === 0 ? (
      <h1>No Plants &#9785; </h1>
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

  displayFavoritePlantSpecies = () => {
    const { username, favoritePlantSpecies } = this.props
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

  handleAddFriendClick = () => {
    console.log('will add friend request when backend built')
  }

  render() {
    const { user, username, zone, experienceLevel, id} = this.props
    const {error} = this.state
   
    return (
      <div>
        {error ? (
          <p className="error">{error}</p>
        ) : (
          <>
            <h1> {username}'s Garden </h1>
            <h2>experience level: {experienceLevel}</h2>
            <h2>grow zone: {zone}</h2>
            {user.id === id ? (
              <button onClick={this.handleNewPlantClick}>Add New Plant Friend</button>
            ) : (
              <button onClick={this.handleAddFriendClick}>Add Friend</button>
            )}
            {this.displayUserPlants()}
            {this.displayFavoritePlantSpecies()}
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const {username,zone, experience_level,id, favorite_plant_species, user_plants} = state.greenhouseReducer.greenhouse
  
  return {
    user: state.userReducer,
    username,
    zone,
    experienceLevel: experience_level,
    id,
    favoritePlantSpecies: favorite_plant_species,
    userPlants: user_plants
  };
};

export default connect(mapStateToProps, {setGreenhouse})(UserPlants);
