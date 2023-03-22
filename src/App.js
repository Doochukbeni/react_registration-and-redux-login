import "./App.css";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import RequireAuth from "./features/auth/RequireAuth";
import Welcome from "./pages/Welcome";
import Layout from "./components/Layout";
import Public from "./components/Public";

import { Routes, Route } from "react-router-dom";
import { ClassNames } from "@emotion/react";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes  */}

          <Route index element={<Public />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Registration />} />

          {/* protected routes  */}
          <Route element={<RequireAuth />}>
            <Route path="welcome" element={<Welcome />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
