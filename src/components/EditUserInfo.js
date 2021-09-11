import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { bindActionCreators } from "redux";
import { Form, Button, Popup } from "semantic-ui-react";
import { updateUser } from "../redux/actions/userActions";

export default function EditUserInfo() {
  const history = useHistory();
  const dispatch = useDispatch();
  const updateUserInfo = bindActionCreators(updateUser, dispatch);
  const userObj = {
    username: "",
    email: "",
    zone: "",
    experience_level: 0,
  };
  const [user, setUser] = useState(userObj);
  const { id, username, email, zone, experience_level } = useSelector(
    (state) => state.userReducer
  );

  useEffect(() => {
    if (username) {
      setUser({ username, email, zone, experience_level });
    }
  }, [username, email, zone, experience_level]);

  const handleSubmit = (e) => {
    updateUserInfo(e, id, user, history);
  };

  const handleChange = (e) => {
    setUser((user) => ({ ...user, [e.target.name]: e.target.value }));
  };

  return (
    <div className="form-container">
      <Button
        onClick={() => history.push(`/greenhouse/${id}`)}
        className="cancel-button"
      >
        X
      </Button>
      <h1>Edit Account</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label htmlFor="username">Username: </label>
          <input
            id="username"
            type="text"
            name="username"
            placeholder="username"
            value={user.username}
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field>
          <label htmlFor="email">Email: </label>
          <input
            id="form-input-control-error-email"
            type="email"
            name="email"
            placeholder="email"
            value={user.email}
            error={{
              content: "Please enter a valid email address",
              pointing: "below",
            }}
            onChange={handleChange}
          />
        </Form.Field>
        <Popup
          on="click"
          popper={{ id: "popper-container", style: { zIndex: 2000 } }}
          content="You can find this on the USDA Plant hardiness Zone map https://planthardiness.ars.usda.gov/ (Ex: 10a for San Jose, CA)"
          trigger={
            <Form.Field>
              <label htmlFor="growZone">Grow Zone: </label>
              <input
                id="growZone"
                type="text"
                name="zone"
                placeholder="grow zone"
                value={user.zone}
                onChange={handleChange}
              />
            </Form.Field>
          }
        ></Popup>
        <Form.Field>
          <label htmlFor="experience">Experience: </label>
          <input
            id="experience"
            type="number"
            name="experience_level"
            placeholder="experience"
            value={user.experience_level}
            max={5}
            min={1}
            onChange={handleChange}
          />
        </Form.Field>
        <label htmlFor="submit" />
        <Button type="submit">Update</Button>
      </Form>
    </div>
  );
}
