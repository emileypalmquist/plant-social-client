import React, { useState } from "react";
import { useLocation } from "react-router";
import { Comment, Header, Input, Message } from "semantic-ui-react";
import { api } from "../../services/api";
import { connect } from "react-redux";
import {
  addCareNoteToUserPlant,
  removeCareNote,
  addCareNoteLike,
  removeCareNoteLike,
} from "../../redux/actions/plantActions";

const CareNotes = ({
  userPlantId,
  careNotes,
  plantUserId,
  userId,
  addCareNoteToUserPlant,
  removeCareNote,
  addCareNoteLike,
  removeCareNoteLike,
  plantId,
}) => {
  const [content, setContent] = useState("");
  const [message, setMessage] = useState(null);
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const note = {
      content,
      user_plant_id: userPlantId,
    };
    setContent("");
    api.careNotes
      .createCareNote(note)
      .then((data) => addCareNoteToUserPlant(data));
  };

  const formatDate = (date) => {
    let d = new Date(date);
    let ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
    let mo = new Intl.DateTimeFormat("en", { month: "long" }).format(d);
    let da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
    return `${mo} ${da}, ${ye}`;
  };

  const handleDelete = ({ id, user_plant_id }) => {
    api.careNotes.deleteCareNote(id).then((data) => {
      console.log(data);
      setMessage(data.message);
      removeCareNote(id, user_plant_id);
    });
  };

  const handleLike = (id) => {
    const like = {
      user_id: userId,
      likeable_id: id,
      likeable_type: "CareNote",
    };

    api.likes
      .createLike(like)
      .then((data) => addCareNoteLike(data, userPlantId, plantId));
  };

  const handleUnLike = (like) => {
    api.likes
      .deleteLike(like.id)
      .then(
        (data) => data.message && removeCareNoteLike(like, userPlantId, plantId)
      );
  };

  const displayCareNotes = () => {
    return (
      <>
        {message && (
          <Message onClick={() => setMessage(null)} positive>
            <p>{message}</p>
          </Message>
        )}
        <div id="careNotesSection">
          {careNotes.map((cn) => (
            <Comment key={cn.id}>
              <Comment.Content>
                <Comment.Metadata>
                  <div> {formatDate(cn.created_at)}</div>
                </Comment.Metadata>
                <Comment.Text>{cn.content}</Comment.Text>
                <Comment.Actions>
                  {cn.likes.filter((l) => l.user_id === userId).length ? (
                    <Comment.Action
                      onClick={() =>
                        handleUnLike(cn.likes.find((l) => l.user_id === userId))
                      }
                    >
                      Unlike
                    </Comment.Action>
                  ) : (
                    <Comment.Action onClick={() => handleLike(cn.id)}>
                      Like
                    </Comment.Action>
                  )}
                  {userId === plantUserId && (
                    <Comment.Action
                      id="delete-note"
                      onClick={() => handleDelete(cn)}
                    >
                      Delete
                    </Comment.Action>
                  )}
                </Comment.Actions>
              </Comment.Content>
            </Comment>
          ))}
        </div>
      </>
    );
  };

  return (
    <div>
      <section>
        <Comment.Group>
          <Header as="h3" dividing>
            Care Notes
          </Header>
          {displayCareNotes()}
        </Comment.Group>
      </section>

      {userId === plantUserId && !location.pathname.includes("plant-species") && (
        <form onSubmit={handleSubmit} className="care-notes-form">
          <Input
            fluid
            icon="arrow circle up"
            required
            placeholder="care note"
            value={content}
            action=""
            onChange={(e) => setContent(e.target.value)}
          />
        </form>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userId: state.userReducer.id,
  };
};

export default connect(mapStateToProps, {
  addCareNoteToUserPlant,
  removeCareNote,
  addCareNoteLike,
  removeCareNoteLike,
})(CareNotes);
