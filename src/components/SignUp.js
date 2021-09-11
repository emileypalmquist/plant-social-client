import { useState } from "react";
import { connect } from "react-redux";
import { Form, Button, Popup } from "semantic-ui-react";
import { login } from "../redux/actions/userActions";

const SignUp = ({ login, history }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [email, setEmail] = useState("");
  const [growZone, setGrowZone] = useState("");
  const [experience, setExperience] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    let user = {
      username,
      password,
      password_confirmation: passwordConfirmation,
      email,
      zone: growZone,
      experience_level: experience,
    };

    login(e, user, "/users", history);
  };

  return (
    <div className="form-container">
      <h1>Create an Account</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Field required>
          <label htmlFor="username">Username: </label>
          <input
            id="username"
            type="text"
            name="username"
            placeholder="username"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Field>
        <Form.Field required>
          <label htmlFor="password">Password: </label>
          <input
            id="form-input-password"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Field>
        <Form.Field required>
          <label htmlFor="passwordConfirmation">Password Confirmation: </label>
          <input
            id="form-input-passwordConfirmation"
            type={showPassword ? "text" : "password"}
            name="passwordConfirmation"
            placeholder="password confirmation"
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
        </Form.Field>
        <Form.Field required>
          <label htmlFor="email">Email: </label>
          <input
            id="form-input-control-error-email"
            type="email"
            name="email"
            placeholder="email"
            error={{
              content: "Please enter a valid email address",
              pointing: "below",
            }}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Field>
        <Popup
          on="click"
          popper={{ id: "popper-container", style: { zIndex: 2000 } }}
          content="You can find this on the USDA Plant hardiness Zone map https://planthardiness.ars.usda.gov/ (Ex: 10a for San Jose, CA)"
          trigger={
            <Form.Field required>
              <label htmlFor="growZone">Grow Zone: </label>
              <input
                id="growZone"
                type="text"
                name="growZone"
                placeholder="grow zone"
                required
                onChange={(e) => setGrowZone(e.target.value)}
              />
            </Form.Field>
          }
        ></Popup>
        <Form.Field>
          <label htmlFor="experience">Experience: </label>
          <input
            id="experience"
            type="number"
            name="experience"
            placeholder="experience"
            defaultValue={1}
            max={5}
            min={1}
            onChange={(e) => setExperience(e.target.value)}
          />
        </Form.Field>

        <label htmlFor="submit" />
        <Button type="submit">Let's Go!</Button>
      </Form>
      <Button onClick={() => setShowPassword(!showPassword)}>
        {showPassword ? "Hide Passwords" : "Show Passwords"}
      </Button>
    </div>
  );
};

export default connect(null, { login })(SignUp);
