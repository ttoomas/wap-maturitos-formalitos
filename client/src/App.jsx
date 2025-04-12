import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";

// Dogs
import DogsHome from "./pages/Dogs/DogsHome/DogsHome";
import CreateDog from "./pages/Dogs/CreateDog/CreateDog";
import UpdateDog from "./pages/Dogs/UpdateDog/UpdateDog";
import ViewDog from "./pages/Dogs/ViewDog/ViewDog";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>

        <Route path="/dogs">
          <Route index element={<DogsHome />}></Route>
          <Route path=":id" element={<ViewDog />}></Route>
          <Route path="create" element={<CreateDog />}></Route>
          <Route path="update/:id" element={<UpdateDog />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
