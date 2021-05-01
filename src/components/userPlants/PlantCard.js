import { deleteUserPlant } from "../../redux/actions/userActions";
import { connect } from "react-redux";
import {Button} from "semantic-ui-react"
const PlantCard = ({
  userPlant: { name, id, plant, photo, user_id },
  history,
  location,
  user,
  deleteUserPlant,
}) => {

  return (
    <div className="plant-card" onClick={() => history.push(`/user_plant/${id}`)}>
      {photo.includes("https://") ? (
        <img src={photo} alt="plant" className="plant-card-image" />
      ) : (
        <img
          src={`http://localhost:3000${photo}`}
          alt="plant"
          className="plant-card-image"
        />
      )}
      <section className="plant-card-content">
        <h3 className="user-plant-name">{name}</h3>
        <h3 className="plant-name">{plant.name}</h3>
        {user_id === user.id && location.pathname !== "/community-garden" && (
          <div id="card-button-container">
            <Button onClick={(e) => deleteUserPlant(e, id)} id="plant-card-button">delete</Button>
          </div>
        )}
      </section>
    </div>
  );
};

export default connect(null, { deleteUserPlant })(PlantCard);
