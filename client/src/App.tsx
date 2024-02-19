import { Routes, Route } from "react-router-dom";
import { HomeView } from "./views/HomeView";
import { Navbar } from "./components/Navbar";
function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomeView/>}/>
      </Routes>
    </>
  );
}

export default App;
