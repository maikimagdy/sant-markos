import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginWithEmail from "./auth/LoginWithEmail";
import Signup from "./auth/Signup";
import Home from "./Home";
import NamesForm from "./Components/NamesForm";
import ShowNames from "./Components/ShowNames";
import WelcomePage from "./Components/WelcomePage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="login" element={<LoginWithEmail />} />
          <Route path="signup" element={<Signup />} />
          <Route element={<NamesForm />} path="/namesform" />
          <Route path="/welcome" element={<WelcomePage />} /> {/* New route */}
          <Route element={<ShowNames />} path="/shownames" />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
