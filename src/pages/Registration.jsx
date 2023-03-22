import { useRef, useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const REGISTER_URL = "/api/user/register";

const Registration = () => {
  const navigate = useNavigate();
  const userRef = useRef();
  const errorRef = useRef();

  const [username, setUserName] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [matchPassword, setMatchPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(username);

    setValidName(result);
  }, [username]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);

    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = PWD_REGEX.test(password);

    setValidPassword(result);
    const match = password === matchPassword;
    setValidMatch(match);
  }, [password, matchPassword]);

  useEffect(() => {
    setErrorMsg("");
  }, [username, password, email, matchPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // TO PREVENT USER CREDENTIAL HACK , VERIFY DETAILS AGAIN

    const v1 = USER_REGEX.test(username);
    const v2 = PWD_REGEX.test(password);
    const v3 = EMAIL_REGEX.test(email);
    if (!v1 || !v2 || !v3) {
      setErrorMsg("invalid entry");
      return;
    }

    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ username, password, email }),
        {
          headers: { "Content-Type": "application/json" },

          // this code disrupts the cors from accepting request from the frontend client

          withCredentials: true,
        }
      );
      // console.log(response.accessToken);
      console.log(JSON.stringify(response));
      setSuccess(true);
      if (response) {
        return navigate("/login");
      }
    } catch (error) {
      if (!error?.response) {
        setErrorMsg("No Server Response");
      } else if (error.response?.status === 409) {
        setErrorMsg("Username is not available");
      } else {
        setErrorMsg("registration failed");
      }
      errorRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1> success !</h1>
          {/* { navigate()} */}
        </section>
      ) : (
        <section>
          <p
            ref={errorRef}
            className={errorMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errorMsg}
          </p>

          <h1>Register</h1>

          <form onSubmit={handleSubmit}>
            <label htmlFor="username">
              Username:
              <span className={validName ? "valid" : "hide"}>
                <DoneIcon />
              </span>
              <span className={validName || !username ? "hide" : "invalid"}>
                <CloseIcon />
              </span>
            </label>
            <input
              ref={userRef}
              type="text"
              name="username"
              autoComplete="off"
              required
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
              id="username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />

            <p
              id="uidnote"
              className={
                userFocus && username && !validName
                  ? "instructions"
                  : "offscreen"
              }
            >
              <CheckCircleIcon />
              4 to 24 characters.
              <br />
              Must begin with a letter. <br />
              letters, numbers,underscores, hyphens allowed.
            </p>

            <label htmlFor="email">
              Email:
              <span className={validEmail ? "valid" : "hide"}>
                <DoneIcon />
              </span>
              <span className={validEmail || !username ? "hide" : "invalid"}>
                <CloseIcon />
              </span>
            </label>
            <input
              type="email"
              name="email"
              autoComplete="off"
              required
              aria-invalid={validEmail ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="password">
              password:
              <span className={validPassword ? "valid" : "hide"}>
                <DoneIcon />
              </span>
              <span className={validPassword || !password ? "hide" : "invalid"}>
                <CloseIcon />
              </span>
            </label>
            <input
              type="password"
              name="password"
              required
              aria-invalid={validPassword ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setPasswordFocus(true)}
              onBlur={() => setPasswordFocus(false)}
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <p
              id="pwdnote"
              className={
                passwordFocus && !validPassword ? "instructions" : "offscreen"
              }
            >
              <CheckCircleIcon />
              8 to 24 characters.
              <br />
              Must include uppercase and lowercase letters, a number and a
              special character. <br />
              Allowed special characters :{" "}
              <span aria-label="exclamation">!</span>{" "}
              <span aria-label="at symbol">@</span>{" "}
              <span aria-label="hashtag">#</span>{" "}
              <span aria-label="dollar sign">$</span>{" "}
              <span aria-label="percent">%</span>
            </p>

            <label htmlFor="confirm_password">
              Confirm password:
              <span className={validMatch && matchPassword ? "valid" : "hide"}>
                <DoneIcon />
              </span>
              <span
                className={validMatch || !matchPassword ? "hide" : "invalid"}
              >
                <CloseIcon />
              </span>
            </label>
            <input
              type="password"
              required
              aria-invalid={validMatch ? "false" : "true"}
              aria-describedby="matchpasswordnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
              id="confirm_password"
              onChange={(e) => setMatchPassword(e.target.value)}
            />

            <p
              id="passwordnote"
              className={
                passwordFocus && !validPassword ? "instructions" : "offscreen"
              }
            >
              <CheckCircleIcon />
              Must match the first password input field
            </p>

            <button
              disabled={
                !validName || !validPassword || !validMatch ? true : false
              }
            >
              sign up
            </button>
          </form>
          <p>
            Already registered ?<br />
            <Link to="/login">Sign in</Link>
          </p>
        </section>
      )}
    </>
  );
};

export default Registration;
