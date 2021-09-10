import { useState } from "react";
import { connect } from "react-redux";
import { Button, Form, Checkbox } from "semantic-ui-react";
import { newUserPlant } from "../../redux/actions/userActions";
import { api } from "../../services/api";

const UserPlantForm = ({ history, newUserPlant, userId }) => {
  const [name, setName] = useState("");
  const [difficulty, setDifficulty] = useState(1);
  const [moisture, setMoisture] = useState(1);
  const [indoor, setIndoor] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [plantSpeciesQuery, setPlantSpeciesQuery] = useState("");
  const [plants, setPlants] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    newUserPlant(
      {
        name,
        difficulty,
        moisture,
        indoor,
        photo,
        userId,
        plant: plantSpeciesQuery,
      },
      history
    );
  };

  const handleSearch = (query) => {
    setPlantSpeciesQuery(query);
    api.plants
      .searchForPlantSpecies(query)
      .then((plantsResult) => setPlants(plantsResult));
  };

  const displayResults = () => {
    return plants.map((plant) => <option key={plant.id}>{plant.name}</option>);
  };

  return (
    <div className="form-container">
      <Button
        onClick={() => history.push(`/greenhouse/${userId}`)}
        className="cancel-button"
      >
        X
      </Button>
      <h1>Add a Plant to your Garden</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label htmlFor="name">name: </label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label htmlFor="plantSpecies">plant species: </label>
          <input
            id="plantSpecies"
            type="text"
            name="plantSpecies"
            placeholder="plant species"
            value={plantSpeciesQuery}
            onChange={(e) => handleSearch(e.target.value)}
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
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
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
            value={moisture}
            onChange={(e) => setMoisture(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <Checkbox
            label="Indoor"
            id="indoor"
            type="checkbox"
            name="indoor"
            checked={indoor}
            onChange={(e) => setIndoor(e.target.checked)}
          />
        </Form.Field>
        <Form.Field>
          <label htmlFor="photo">photo: </label>
          <input
            id="photo"
            type="file"
            name="photo"
            onChange={(e) => setPhoto(e.target.files[0])}
          />
        </Form.Field>

        <Button type="submit">Create</Button>
      </Form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userId: state.userReducer.id,
  };
};

export default connect(mapStateToProps, { newUserPlant })(UserPlantForm);
