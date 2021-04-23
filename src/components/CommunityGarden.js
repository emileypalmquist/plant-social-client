import { useEffect } from "react";
import { connect } from "react-redux";
import { setPlants } from "../redux/actions/plantActions";

import PlantCard from './userPlants/PlantCard'

const CommunityGarden = ({setPlants, userPlants, history, user, location}) => {

  useEffect(() => {
    setPlants();
  }, []);

  return (
    <>
        <h1>Community Garden</h1>
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

export default connect(mapStateToProps, { setPlants })(CommunityGarden);
