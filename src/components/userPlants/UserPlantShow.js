import { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Card, Icon, Image, Button } from "semantic-ui-react";

import {
  setUserPlantShow,
  addUserPlantLike,
  removeUserPlantLike,
} from "../../redux/actions/plantActions";
import { api } from "../../services/api";
import CareNotes from "./CareNotes";
import Comments from "./Comments";

const API = process.env.REACT_APP_BACKEND_IMAGE_BASE_URL;

const UserPlantShow = ({
  userId,
  userPlants,
  showPlant,
  match,
  setUserPlantShow,
  addUserPlantLike,
  removeUserPlantLike,
}) => {
  const wsClient = useRef(null);

  const handleResponse = (resp) => {
    if (!resp.error) {
      setUserPlantShow(resp);
    }
  };

  useEffect(() => {
    if (!wsClient.current) {
      console.log("hello");
    }
  }, []);

  useEffect(() => {
    const found = userPlants.filter((p) => p.id === parseInt(match.params.id));

    if (found.length) {
      setUserPlantShow(found[0]);
    } else {
      api.userPlants
        .getUserPlant(match.params.id)
        .then((resp) => handleResponse(resp));
    }
  }, [userPlants]);

  const handleLike = () => {
    const like = {
      user_id: userId,
      likeable_id: showPlant?.id,
      likeable_type: "UserPlant",
    };
    api.likes.createLike(like).then((data) => addUserPlantLike(data));
  };

  const handleUnLike = (like) => {
    api.likes
      .deleteLike(like.id)
      .then((data) => data.message && removeUserPlantLike(like));
  };

  const like = showPlant?.likes?.find((like) => like.user_id === userId);

  return (
    <div className="plant-show-container">
      {Object.keys(showPlant).length ? (
        <>
          <Card>
            {showPlant?.photo.includes("https://") ? (
              <Image
                src={showPlant?.photo}
                wrapped
                ui={false}
                height="40vh"
                width="100vw"
              />
            ) : (
              <Image src={`${API}${showPlant?.photo}`} wrapped ui={false} />
            )}
            <Card.Content>
              <Card.Header>{showPlant?.name}</Card.Header>
              <Card.Meta>
                <span className="date">{showPlant?.plant?.name}</span>
              </Card.Meta>
              <Card.Description>
                difficulty: {showPlant?.difficulty} <br />
                moisture: {showPlant?.moisture} <br />
                {showPlant?.indoor ? "indoor" : "outdoor"}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              {showPlant.user_id === userId ? (
                <Link to={`/edit-plant/${showPlant?.id}`}>
                  <Button>Edit Plant</Button>
                </Link>
              ) : (
                <Link to={`/greenhouse/${showPlant?.user_id}`}>
                  <Button>Check out my greenhouse</Button>
                </Link>
              )}
              <br />
              {showPlant?.likes?.length} Likes
              {like ? (
                <Icon
                  name="thumbs up"
                  id="like-icon"
                  className="like-icon"
                  onClick={() => handleUnLike(like)}
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
              careNotes={showPlant?.care_notes}
              userPlantId={showPlant?.id}
              plantUserId={showPlant?.user_id}
              plantId={showPlant?.plant?.id}
            />
            <Comments
              comments={showPlant?.comments}
              userPlantId={showPlant?.id}
            />
          </div>
        </>
      ) : (
        <h1>No Plant Found</h1>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    showPlant: state.plantReducer.userPlantShow,
    userPlants: state.plantReducer.userPlants,
    userId: state.userReducer.id,
  };
};

export default connect(mapStateToProps, {
  setUserPlantShow,
  addUserPlantLike,
  removeUserPlantLike,
})(UserPlantShow);
