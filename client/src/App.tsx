import { Routes, Route } from "react-router-dom";
import { HomeView } from "./views/HomeView";
import { Navbar } from "./components/Navbar";
import NotFound from "./components/NotFound";
import { FullPost } from "./components/posts/FullPost";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/posts/:id" element={<FullPost />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
