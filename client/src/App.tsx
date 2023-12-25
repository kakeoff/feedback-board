import { Routes, Route } from "react-router-dom";
import { HomeView } from "./views/HomeView";
function App() {
  return (
    <>
    <nav className="w-full h-[50px] bg-red-500"></nav>
      <Routes>
        <Route path="/" element={<HomeView/>}/>
      </Routes>
    </>
  );
}

export default App;
