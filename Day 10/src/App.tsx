import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import { Button } from "./components/ui/button";
import Home from "./pages/Home";
import Products from "./pages/Products.tsx";
import Cart from "./pages/Cart.tsx";
import ProductDetail from "./pages/ProductDetail.tsx";
import { AuthProvider } from "./context/AuthProvider.tsx";
import { useAuth } from "./hooks/useAuth.ts";
import Login from "./pages/Login.tsx";
import About from "./pages/About.tsx";
import PrivateRoute from "./lib/PrivateRoute.tsx";
import Movies from "./pages/Movies.tsx";
import Favorites from "./pages/Favorites.tsx";
import MovieDetail from "../src/pages/MovieDetail.tsx";

function Header() {
  const { token, logout } = useAuth();
  return (
      <header className="w-full flex gap-4 p-4 justify-center border-b mb-8 bg-gray-100 shadow-md">
        <Button asChild variant={"outline"}>
          <Link to="/">Home</Link>
        </Button>
        <Button asChild variant={"outline"}>
          <Link to="/products">Products</Link>
        </Button>
        <Button asChild variant={"outline"}>
          <Link to="/movies">Movies</Link>
        </Button>
        {token && (
          <>
            <Button asChild variant={"outline"}>
              <Link to="/cart">Cart</Link>
            </Button>
            <Button asChild variant={"outline"}>
              <Link to="/favorites">Favorites</Link>
            </Button>
          </>
        )}
        {token ? (
          <Button onClick={logout} variant="destructive">Logout</Button>
        ) : (
          <Button asChild variant="outline">
            <Link to="/login">Login</Link>
          </Button>
        )}
      </header>
  )
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header/>
        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<PrivateRoute><Products /></PrivateRoute>} />
            <Route path='/products/:productId' element={<ProductDetail />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/movies' element={<Movies />} />
            <Route path='/movies/:imdbid' element={<MovieDetail />} />
            <Route path='/favorites' element={<PrivateRoute><Favorites /></PrivateRoute>} />
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;