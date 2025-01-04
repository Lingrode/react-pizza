import { useState } from "react";
import { Routes, Route } from "react-router";
import Header from "./components/Header";
import Home from "./pages/Home";
import Cart from "./pages/Cart";

import "./scss/app.scss";
import NotFound from "./pages/NotFound";

const App = () => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="wrapper">
      <Header searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
