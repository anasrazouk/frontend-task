import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Products from "./components/Products";

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root path to '/products' */}
        <Route path="/" element={<Products />} />
        <Route path="/new-product" element={<p>add new product</p>} />
        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
