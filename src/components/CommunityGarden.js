import React, { useEffect, Suspense } from "react";
import { connect } from "react-redux";
// import Loading from "../Loading"
// const PlantCard = React.lazy(() => import('./userPlants/PlantCard'))
import PlantCard from "./userPlants/PlantCard";

const CommunityGarden = ({ userPlants, history, user, location }) => {
  return (
    <>
      <h1 id="title">Community Garden</h1>
      <div className="plant-cards-container">
        {/* <Suspense fallback={<Loading />}> */}
        {userPlants.map((plant) => (
          <PlantCard
            key={plant.id}
            location={location}
            userPlant={plant}
            history={history}
            user={user}
          />
        ))}
        {/* </Suspense> */}
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
