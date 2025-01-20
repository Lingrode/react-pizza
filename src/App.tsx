import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router";

import NotFound from "./pages/NotFound";
import { Loader, Header } from "./components";

import "./scss/app.scss";

// const Header = lazy(() => import("./components"));
const Home = lazy(() => import("./pages/Home"));
const Cart = lazy(() => import("./pages/Cart"));
const FullPizza = lazy(() => import("./pages/FullPizza"));

const App = () => {
  return (
    <div className="wrapper">
      <Suspense fallback={<Loader />}>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/pizza/:id" element={<FullPizza />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Suspense>
    </div>
  );
};

export default App;
