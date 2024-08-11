import { Box } from "@chakra-ui/react";
import './App.css';
import Arena from "./frontend/components/Arena/Arena";
import Playground from "./frontend/components/Playground/Playground";
import ProblemsPage from "./frontend/components/Arena/ProblemsPage";
import Leaderboard from "./frontend/components/Battleground/Leaderboard";
import CookieCardPage from "./frontend/components/Battleground/CookieCardPage";
import LoginSignup from "./frontend/components/LoginPage/LoginSignup";
import { UserProvider } from "../UserContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./frontend/components/Landing/Landing";
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import { Bounce } from 'react-toastify';
import Combine from "./frontend/components/Dashboard/combine";

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<LoginSignup />} />
            <Route path="/dashboard" element={<Combine />} />
          
          </Routes>
          <ToastContainer
              position="top-right"
              autoClose={1000} // Updated to a standard value
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              transition={Bounce}
          />
          
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
