import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import { Button } from "./components/ui/button";
import Home from "./pages/Home";
import Products from "./pages/Products.tsx";
import Cart from "./pages/Cart.tsx";
import ProductDetail from "./pages/PostDetail.tsx";

function App() {
  return (
    <BrowserRouter>
      <header className="w-full flex gap-4 p-4 justify-center border-b mb-8 bg-gray-100 shadow-md">
        <Button asChild variant={"outline"}>
          <Link to="/">Home</Link>
        </Button>
        <Button asChild variant={"outline"}>
          <Link to="/products">Products</Link>
        </Button>
        <Button asChild variant={"outline"}>
          <Link to="/cart">Cart</Link>
        </Button>
      </header>
      <main className="container mx-auto p-4">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<Products />} />
          <Route path='/products/:productId' element={<ProductDetail />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;