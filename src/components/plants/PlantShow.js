import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import { Card, Icon, Image, Button } from "semantic-ui-react";
import {
  setPlantShow,
  setFavorite,
  setUnFavorite,
} from "../../redux/actions/plantActions";
import CareNotes from "../userPlants/CareNotes";
import Comments from "../userPlants/Comments";

const API = process.env.REACT_APP_BACKEND_IMAGE_BASE_URL;

const PlantShow = ({ match }) => {
  const dispatch = useDispatch();
  const getPlant = bindActionCreators(setPlantShow, dispatch);
  const favoritePlant = bindActionCreators(setFavorite, dispatch);
  const unFavoritePlant = bindActionCreators(setUnFavorite, dispatch);
  const id = parseInt(match.params.id);

  const plant = useSelector(
    (state) => state.plantReducer.plants.filter((p) => p.id === id)[0]
  );
  const userId = useSelector((state) => state.userReducer.id);

  useEffect(() => {
    if (!plant) {
      getPlant(id);
    }
  }, [plant]);

  if (!plant) return <h1>No Plant Found</h1>;

  const favorited = plant.favorites.filter((f) => f.user_id === userId)[0];

  function handleLike() {
    favoritePlant(plant.id, userId);
  }

  function handleUnLike() {
    unFavoritePlant(plant.id, favorited.id);
  }

  // console.log(plant);
  return (
    <div className="plant-show-container">
      <Card>
        {plant.photo.includes("https://") ? (
          <Image
            src={plant.photo}
            wrapped
            ui={false}
            height="40vh"
            width="100vw"
          />
        ) : (
          <Image src={`${API}${plant.photo}`} wrapped ui={false} />
        )}
        <Card.Content>
          <Card.Header>{plant.name}</Card.Header>
          <Card.Meta>
            {!plant.user_plant ? (
              <span className="date"> Not in a greenhouse at this time</span>
            ) : (
              <span className="date"> Featured - {plant.user_plant?.name}</span>
            )}
          </Card.Meta>
          <Card.Description>
            {/* difficulty: {showPlant?.difficulty} <br />
          moisture: {showPlant?.moisture} <br /> */}
            {/* {showPlant?.indoor ? "indoor" : "outdoor"} */}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          {plant.user_plant && (
            <Link to={`/user_plant/${plant.user_plant?.id}`}>
              <Button>Check out {plant.user_plant?.name}</Button>
            </Link>
          )}
          <br />
          {plant.favorites.length} Likes
          {favorited ? (
            <Icon
              name="thumbs up"
              id="like-icon"
              className="like-icon"
              onClick={() => handleUnLike(favorited?.id)}
            />
          ) : (
            <Icon
              name="thumbs up outline"
              id="like-icon"
              className="like-icon"
              onClick={handleLike}
            />
          )}
        </Card.Content>
      </Card>
      <div>
        <CareNotes
          careNotes={plant.care_notes}
          userPlantId={plant.user_plant?.id}
          plantId={plant.id}
        />
        <Comments comments={[]} userPlantId={plant.id} />
      </div>
    </div>
  );
};

export default PlantShow;
