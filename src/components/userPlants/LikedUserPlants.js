import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

import { setLikedUserPlants } from "../../redux/actions/plantActions";
import PlantCard from "./PlantCard";

export default function LikedUserPlants({ history, location }) {
  const dispatch = useDispatch();

  const getLikedUserPlants = bindActionCreators(setLikedUserPlants, dispatch);
  const userPlants = useSelector((state) => state.plantReducer.likedUserPlants);
  const user = useSelector((state) => state.userReducer);

  useEffect(() => {
    getLikedUserPlants();
  }, []);

  function displayPlants() {
    if (userPlants.length > 0) {
      return userPlants.map(({ user_plant }) => (
        <PlantCard
          key={user_plant.id}
          location={location}
          userPlant={user_plant}
          history={history}
          user={user}
        />
      ));
    } else {
      return <h2>No Favorite Plants &#9785; </h2>;
    }
  }

  return (
    <>
      <h1 id="title">Your Favorites Garden</h1>
      <div className="plant-cards-container">{displayPlants()}</div>
    </>
  );
}
