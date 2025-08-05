// import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import AuthGuard from "./components/AuthGuard";
import PostsPage from "./views/pages/PostsPage";
import LoginPage from "./views/pages/LoginPage";
import NotFoundPage from "./views/pages/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <AuthGuard>
              <Layout />
            </AuthGuard>
          }
        >
          <Route index element={<div>Welcome Home!</div>} />
          <Route path="posts" element={<PostsPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
