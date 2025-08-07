// import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthGuard from "./components/authguard/AuthGuard";
import PostsPage from "./views/pages/PostsPage";
import LoginPage from "./views/pages/LoginPage";
import NotFoundPage from "./views/pages/NotFoundPage";
import PrimeReact from "./views/pages/PrimeReact";
import TableDataPage from "./views/pages/TableDataPage";
import Layout from "./components/layout/Layout";
import MyTable from "./views/pages/MyTable";
import ProductPage from "./views/pages/ProductPage";

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
          <Route path="prime-controls" element={<PrimeReact />} />
          <Route path="table-data" element={<MyTable />} />
          <Route path="products" element={<ProductPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
