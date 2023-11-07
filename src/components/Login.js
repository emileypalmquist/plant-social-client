import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Form, Button, Message } from "semantic-ui-react";
import { login } from "../redux/actions/userActions";
import { setLoading } from "../redux/actions/statusActions";

const Login = ({ login, history, isLoading, setLoading, loading }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    login(e, { username, password }, "/login", history);
  };

  useEffect(() => setLoading(false), []);

  return (
    <div className="form-container">
      {isLoading && <Message>
        Loading...
      </Message>}
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="username">username: </label>
        <input
          id="username"
          type="text"
          name="username"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <label htmlFor="password">password: </label>
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <label htmlFor="submit" />
        <Button disabled={isLoading} type="submit">Submit</Button>
      </Form>

      <Button onClick={() => setShowPassword(!showPassword)}>
        Show Password
      </Button>
    </div>
  );
};

export default connect(null, { login, setLoading })(Login);
