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
import ProfileView from "./views/ProfileView";
import CreatePostScreen from "./components/posts/CreatePostScreen";
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
      <div className="pt-[90px]">
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/posts/:id" element={<FullPost />} />
          <Route path="/posts/:id/edit" element={<CreatePostScreen />} />
          <Route path="/posts/new" element={<CreatePostScreen />} />
          <Route path="/profile" element={<ProfileView />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
