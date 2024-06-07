import { Routes, Route } from "react-router-dom";
import { HomeView } from "./views/HomeView";
import { Navbar } from "./components/Navbar";
import NotFound from "./components/NotFound";
import { FullPost } from "./components/posts/FullPost";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./redux/store";
import { useEffect } from "react";
import { fetchMe } from "./redux/slices/auth";
import { isTokenExists } from "./helpers/checkToken";
function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (isTokenExists()) {
      dispatch(fetchMe());
    }
  }, []);
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
