import { useState, useEffect } from "react";
import { Form, Button, Checkbox, Icon } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

import { api } from "../../services/api";
import { updateUserPlant } from "../../redux/actions/userActions";
import CardImage from "./CardImage";

const API = process.env.REACT_APP_BACKEND_IMAGE_BASE_URL;

export default function EditPlant({ history, match }) {
  const dispatch = useDispatch();
  const updatePlant = bindActionCreators(updateUserPlant, dispatch);
  const currentUserPlants = useSelector(
    (state) => state.userReducer.user_plants
  );
  let plant = currentUserPlants.filter(
    (p) => p.id === parseInt(match.params.id)
  )[0];
  const userPlantObj = {
    name: "",
    difficulty: 1,
    moisture: 1,
    indoor: false,
    plantSpeciesQuery: "",
  };
  const [userPlant, setUserPlant] = useState(userPlantObj);
  const [plants, setPlants] = useState([]);
  const [updatePhoto, setUpdatePhoto] = useState(false);
  const [newPhoto, setNewPhoto] = useState(null);

  useEffect(() => {
    if (plant) {
      setUserPlant({ ...plant, plantSpeciesQuery: plant.plant.name });
    } else {
      api.userPlants.getUserPlant(match.params.id).then((resp) => {
        if (!resp.error) {
          setUserPlant({ ...resp, plantSpeciesQuery: resp.plant.name });
        }
      });
    }
  }, [match.params.id]);

  const handleSubmit = (e) => {
    const plant = {
      name: userPlant.name,
      difficulty: userPlant.difficulty,
      moisture: userPlant.moisture,
      indoor: userPlant.indoor,
      plant: userPlant.plantSpeciesQuery,
    };
    if (newPhoto) {
      plant.photo = newPhoto;
    }
    updatePlant(e, match.params.id, plant, history);
  };

  const handleSearch = (e) => {
    handleChange(e);
    api.plants
      .searchForPlantSpecies(e.target.value)
      .then((plantsResult) => setPlants(plantsResult));
  };

  const displayResults = () => {
    return plants.map((plant) => <option key={plant.id}>{plant.name}</option>);
  };

  const handleChange = (e) => {
    setUserPlant((userPlant) => ({
      ...userPlant,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCancel = () => {
    setNewPhoto(null);
    setUpdatePhoto(false);
  };

  const renderButton = () => {
    if ((newPhoto && updatePhoto) || updatePhoto) {
      return (
        <Button onClick={handleCancel}>
          <Icon name="cancel" id="cancel-icon" />
        </Button>
      );
    } else {
      return (
        <Button onClick={() => setUpdatePhoto(!updatePhoto)}>
          <Icon name="edit" id="edit-icon" />
        </Button>
      );
    }
  };

  return (
    <div className="form-container">
      <Button
        onClick={() => history.push(`/user_plant/${match.params.id}`)}
        className="cancel-button"
      >
        X
      </Button>
      <h1>Edit Plant</h1>
      {newPhoto ? (
        <img
          src={newPhoto && URL.createObjectURL(newPhoto)}
          alt="plant"
          className="plant-card-image"
          height="250"
          width="250"
        />
      ) : (
        <CardImage photo={plant && plant.photo} />
      )}
      {renderButton()}
      <Form onSubmit={handleSubmit}>
        {updatePhoto && (
          <Form.Field>
            <label htmlFor="photo">photo: </label>
            <input
              id="photo"
              type="file"
              name="photo"
              onChange={(e) => setNewPhoto(e.target.files[0])}
            />
          </Form.Field>
        )}
        <Form.Field>
          <label htmlFor="name">name: </label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="name"
            value={userPlant.name}
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field>
          <label htmlFor="plantSpecies">plant species: </label>
          <input
            id="plantSpecies"
            type="text"
            name="plantSpeciesQuery"
            placeholder="plant species"
            value={userPlant.plantSpeciesQuery}
            onChange={handleSearch}
            list="plant-species-list"
          />
          <datalist id="plant-species-list">{displayResults()}</datalist>
        </Form.Field>
        <Form.Field>
          <label htmlFor="difficulty">difficulty: </label>
          <input
            id="difficulty"
            type="number"
            min="1"
            max="5"
            name="difficulty"
            value={userPlant.difficulty}
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field>
          <label htmlFor="moisture">moisture: </label>
          <input
            id="moisture"
            type="number"
            min="1"
            max="5"
            name="moisture"
            value={userPlant.moisture}
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field>
          <Checkbox
            label="Indoor"
            id="indoor"
            type="checkbox"
            name="indoor"
            checked={userPlant.indoor}
            onChange={() => setUserPlant((p) => ({ ...p, indoor: !p.indoor }))}
          />
        </Form.Field>

        <Button type="submit">Update</Button>
      </Form>
    </div>
  );
}
