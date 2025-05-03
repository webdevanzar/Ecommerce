import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Layout } from "./layouts/Layout";
// import { Input } from "./components/input/Input";
// import {SignUp} from "./pages/SignUp";
// import { Login } from "./pages/Login";
import Home from "./components/sections/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
      {/* <SignUp /> */}
      {/* <Login /> */}
    </>
  );
}

export default App;
