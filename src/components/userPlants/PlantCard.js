import { deleteUserPlant } from "../../redux/actions/userActions";
import { connect } from "react-redux";
import {Button} from "semantic-ui-react"
const PlantCard = ({
  userPlant: { name, id, plant, photo, user_id },
  userPlant,
  history,
  location,
  user,
  deleteUserPlant,
}) => {

  return (
    <div className="plant-card" onClick={() => history.push(`/plant/${id}`)}>
      {photo.includes("https://") ? (
        <img src={photo} alt="plant" className="plant-card-image" />
      ) : (
        <img
          src={`http://localhost:3000${photo}`}
          alt="plant"
          className="plant-card-image"
        />
      )}
      <h3>{name}</h3>
      <h3>{plant.name}</h3>
      {user_id === user.id && location.pathname != "/community-garden" && (
        <Button onClick={(e) => deleteUserPlant(e, id)}>delete</Button>
      )}
    </div>
  );
};

export default connect(null, { deleteUserPlant })(PlantCard);
