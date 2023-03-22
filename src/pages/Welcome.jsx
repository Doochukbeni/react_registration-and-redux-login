import { useSelector } from "react-redux";
import {
  selectCurrentToken,
  selectCurrentUser,
} from "../features/auth/authSlice";
import { Link } from "react-router-dom";

const Welcome = () => {
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);

  const welcome = user ? `welcome ${user} !` : "welcome";

  return (
    <section className="welcome">
      <h1>{welcome}</h1>

      <p>we are glad to have you here</p>
      <span> here is your access token {token.slice(0, 20)}... </span>
    </section>
  );
};

export default Welcome;
