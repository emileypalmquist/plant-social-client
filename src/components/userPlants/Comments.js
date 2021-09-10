import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Comment, Header, Input, Message } from "semantic-ui-react";
import { api } from "../../services/api";
import {
  addCommentToUserPlant,
  removeComment,
  addCommentLike,
  removeCommentLike,
} from "../../redux/actions/plantActions";

const Comments = ({
  userPlantId,
  comments,
  userId,
  addCommentToUserPlant,
  removeComment,
  addCommentLike,
  removeCommentLike,
}) => {
  const [content, setContent] = useState("");
  const [message, setMessage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const comment = {
      content,
      user_plant_id: userPlantId,
      user_id: userId,
    };
    setContent("");
    api.comments
      .createComment(comment)
      .then((data) => addCommentToUserPlant(data));
  };

  const formatDate = (date) => {
    let d = new Date(date);
    let ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
    let mo = new Intl.DateTimeFormat("en", { month: "long" }).format(d);
    let da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
    return `${mo} ${da}, ${ye}`;
  };

  const handleDelete = ({ id, user_plant_id }) => {
    api.comments.deleteComment(id).then((data) => {
      setMessage(data.message);
      removeComment(id, user_plant_id);
    });
  };

  const handleLike = (id) => {
    const like = { user_id: userId, likeable_id: id, likeable_type: "Comment" };
    api.likes
      .createLike(like)
      .then((data) => addCommentLike(data, userPlantId));
  };

  const handleUnLike = (like) => {
    console.log(like);
    api.likes
      .deleteLike(like.id)
      .then((data) => data.message && removeCommentLike(like, userPlantId));
  };

  const displayComments = () => {
    return (
      <>
        {message && (
          <Message onClick={() => setMessage(null)} positive>
            <p>{message}</p>
          </Message>
        )}
        <div id="careNotesSection">
          {comments.map((cm) => (
            <Comment key={cm.id}>
              <Comment.Avatar src={cm.user.profile_photo} />
              <Comment.Content>
                <Comment.Author as={Link} to={`/greenhouse/${cm.user.id}`}>
                  {cm.user.username}
                </Comment.Author>
                <Comment.Metadata>
                  <div>{formatDate(cm.created_at)}</div>
                </Comment.Metadata>
                <Comment.Text>{cm.content}</Comment.Text>
                <Comment.Actions>
                  {cm.likes.filter((l) => l.user_id === userId).length ? (
                    <Comment.Action
                      onClick={() =>
                        handleUnLike(cm.likes.find((l) => l.user_id === userId))
                      }
                    >
                      Unlike
                    </Comment.Action>
                  ) : (
                    <Comment.Action onClick={() => handleLike(cm.id)}>
                      Like
                    </Comment.Action>
                  )}
                  {userId === cm.user.id && (
                    <Comment.Action
                      id="delete-note"
                      onClick={() => handleDelete(cm)}
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
    <div className="comments">
      <section>
        <Comment.Group>
          <Header as="h3" dividing>
            Comments
          </Header>
          {displayComments()}
        </Comment.Group>
      </section>

      <form onSubmit={handleSubmit} className="care-notes-form">
        <Input
          fluid
          icon="arrow circle up"
          placeholder="comment"
          value={content}
          action=""
          required
          onChange={(e) => setContent(e.target.value)}
        />
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userId: state.userReducer.id,
  };
};

export default connect(mapStateToProps, {
  addCommentToUserPlant,
  removeComment,
  addCommentLike,
  removeCommentLike,
})(Comments);
