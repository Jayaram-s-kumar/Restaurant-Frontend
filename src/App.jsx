import Admin from "./pages/adminpage/Admin"
import Home from "./pages/homepage/Home"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RestaurantNavbar from "./componets/Navbar/RestaurantNavbar"
import CreateMenu from "./componets/CreateMenu/CreateMenu"
import MenuItems from "./componets/MenuItems/MenuItems"
import UpdateItem from "./componets/UpdateItem/UpdateItem"
import CreateItem from "./componets/CreateItem/CreateItem"

function App() {
  return (
    <>
      <BrowserRouter>
        <RestaurantNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/menus/create" element={<CreateMenu />} />
          <Route path="/menu/items/:menuId" element={<MenuItems />} />
          <Route path="/items/edit/:id" element={<UpdateItem />} />
          <Route path="/items/create/:menuId" element={<CreateItem />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
