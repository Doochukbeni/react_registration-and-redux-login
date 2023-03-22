import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import Welcome from "./Welcome";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";
import { useLoginMutation } from "../features/auth/authApiSlice.js";

// const LOGIN_URL = "/api/user/login";

const Login = () => {
  const navigate = useNavigate();
  const userRef = useRef();
  const errorRef = useRef();

  const [password, setPassword] = useState("");

  const [email, setEmail] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrorMsg("");
  }, [password, email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // THIS IS AXIOS METHOD OF LOGIN WITHOUT REDUX
      // const response = await axios.post(
      //   LOGIN_URL,
      //   JSON.stringify({ password, email }),
      //   {
      //     headers: { "Content-Type": "application/json" },

      //     withCredentials: true,
      //   }
      // );
      // console.log(response.data);

      // console.log(JSON.stringify(response));

      // setSuccess(true);

      const userData = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...userData, email }));
      setEmail("");
      setPassword("");
      navigate("/welcome");
    } catch (error) {
      if (!error?.originalStatus) {
        setErrorMsg("No Server Response");
      } else if (error.originalStatus === 400) {
        setErrorMsg("missing email and password");
      } else {
        setErrorMsg("login failed");
      }
      errorRef.current.focus();
    }
  };

  return (
    <>
      {isLoading ? (
        <h1>loading ... </h1>
      ) : (
        <section>
          <p
            ref={errorRef}
            className={errorMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errorMsg}
          </p>

          <h1>Login</h1>

          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              ref={userRef}
              name="email"
              autoComplete="off"
              required
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              required
              name="password"
              value={password}
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button disabled={!email || !password ? true : false}>
              sign up
            </button>
          </form>
          <p>
            Don't have an Account ?<br />
            <span className="line">
              <Link to="/register">Register</Link>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default Login;
