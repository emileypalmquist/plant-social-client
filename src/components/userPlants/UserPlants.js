import React, { Component } from "react";
import { connect } from "react-redux";
import PlantCard from "./PlantCard";
import {setGreenhouse, resetGreenhouse} from "../../redux/actions/greenhouseActions"
import {api} from "../../services/api"

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
      this.props.resetGreenhouse();
    } 
  };

  getUserShow = (id) => {
    const token = localStorage.token;

    api.userPlants.getUserGreenhouse(id)
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

  handleAddFriendClick = () => {
    console.log('will add friend request when backend built')
  }

  displayLoggedInUser = ({username, experience_level, zone, user_plants, favorite_plant_species}) => {
   
    return (
      <div>
        <h1> {username}'s Garden </h1>
          <h2>experience level: {experience_level}</h2>
          <h2>grow zone: {zone}</h2>
          <button onClick={this.handleNewPlantClick}>Add New Plant Friend</button>
          {this.displayUserPlants(username, user_plants)}
          {this.displayFavoritePlantSpecies(username, favorite_plant_species)}
      </div>
    )
  }

  render() {
    const { user, username, zone, experienceLevel, id, favoritePlantSpecies, userPlants, match: { params }} = this.props
    const {error} = this.state
   
    if (user.id == params.id) {
      return this.displayLoggedInUser(user)
    }
    return (
      <div>
        {error ? (
          <p className="error">{error}</p>
        ) : (
          <>
            <h1> {username}'s Garden </h1>
            <h2>experience level: {experienceLevel}</h2>
            <h2>grow zone: {zone}</h2>
            <button onClick={this.handleAddFriendClick}>Add Friend</button>
            {this.displayUserPlants(username, userPlants)}
            {this.displayFavoritePlantSpecies(username, favoritePlantSpecies)}
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const {username, zone, experience_level, id, favorite_plant_species, user_plants} = state.greenhouseReducer.greenhouse
  
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

export default connect(mapStateToProps, {setGreenhouse, resetGreenhouse})(UserPlants);
