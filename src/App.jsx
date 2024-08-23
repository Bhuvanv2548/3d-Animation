import { Route, Routes } from "react-router-dom";
import ButtonGradient from "./assets/svg/ButtonGradient";
import AddVideoComponent from './components/AddVideoComponents';
import Benefits from "./components/Benefits";
import CharacterSelection from "./components/CharacterSelection";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Pricing from "./components/Pricing";
// import Roadmap from "./components/Roadmap";
// import Services from "./components/Services";
import Signup from "./components/Signup";

const App = () => {
  return (
    <div className="overflow-hidden">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Header />
              <Benefits />
              {/* <Services /> */}
              <Pricing />
              {/* <Roadmap /> */}
              <Footer />
            </>
          }
        />
        <Route path="/character-selection" element={<CharacterSelection />}/>
        <Route path="/character-selection/add" element={<AddVideoComponent />} />
        <Route path="/signin" element={<Signup />} />
      </Routes>
      <ButtonGradient />
    </div>
  );
};

export default App;
