import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Products from "./components/Products";
import PrimarySearchAppBar from "./components/AppBar";
import AddProductPage from "./components/AddProductPage";
import CartPage from "./components/CartPage";
function AppLayout() {
  return (
    <>
      <PrimarySearchAppBar />
      <div style={{ paddingTop: "128px" }}>
        {/* Space added to avoid overlap with AppBar */}
        <Outlet />
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
      <Route element={<AppLayout />}>
        {/* Redirect root path to '/products' */}
        <Route index  path="/" element={<Products />} />
        <Route path="/new-product" element={<AddProductPage/>} />
        <Route path="/cart" element={<CartPage />} />
        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
