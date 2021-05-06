import React,{ useEffect, Suspense } from "react";
import { connect } from "react-redux";
import PlantCard from './userPlants/PlantCard'

const CommunityGarden = ({userPlants, history, user, location}) => {

  return (
    <>
        <h1 id="title">Community Garden</h1>
        <div className='plant-cards-container'>
          {userPlants.map(plant => <PlantCard key={plant.id} location={location} userPlant={plant} history={history} user={user} />)}
        </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userPlants: state.plantReducer.userPlants,
    user: state.userReducer,
  };
};

export default connect(mapStateToProps)(CommunityGarden);
