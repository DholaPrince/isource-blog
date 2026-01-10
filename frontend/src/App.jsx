import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Categories from "./pages/Categories";
import About from "./pages/About";
import CategoryArticles from "./pages/CategoryArticles";
import ArticleView from "./pages/ArticleView";
import PrivacyPolicy from "./pages/PrivacyPolicy"
import Terms from "./pages/Terms"
import Disclaimer from "./pages/Disclaimer"


// admin
import AdminLogin from "./pages/AdminLogin";
import ProtectedAdmin from "./components/ProtectedAdmin";
import Dashboard from "./admin/pages/Dashboard";
import AdminCategories from "./admin/pages/Categories";
import AdminArticles from "./admin/pages/Articles";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* FRONTEND */}
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:slug" element={<CategoryArticles />} />
        <Route path="/article/:slug" element={<ArticleView />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/disclaimer" element={<Disclaimer />} />

        {/* ADMIN LOGIN */}
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* PROTECTED ADMIN */}
        <Route
          path="/admin"
          element={
            <ProtectedAdmin>
              <Dashboard />
            </ProtectedAdmin>
          }
        />

        <Route
          path="/admin/categories"
          element={
            <ProtectedAdmin>
              <AdminCategories />
            </ProtectedAdmin>
          }
        />

        <Route
          path="/admin/articles"
          element={
            <ProtectedAdmin>
              <AdminArticles />
            </ProtectedAdmin>
          }
        />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
