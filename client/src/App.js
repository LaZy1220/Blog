import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { HomePage } from "./pages/HomePage";
import { FullPostPage } from "./pages/FullPostPage";
import { AddPostsPage } from "./pages/AddPostsPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/posts/:id" element={<FullPostPage />} />
        <Route path="/add-post" element={<AddPostsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </>
  );
}

export default App;
