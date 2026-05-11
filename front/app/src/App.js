import { BrowserRouter, Routes, Route } from "react-router-dom";
import './input.css'
import Home from "./Pages/HomePage";
import HistoryPage from "./Pages/HistoryPage";
import MasksPage from "./Pages/MasksPage";
import { ShopPage } from "./Pages/ShopPage";
import RegPage from "./Pages/RegPage";
import LoginPage from "./Pages/LoginPage";
import Profile from "./Pages/Profile";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/history' element={<HistoryPage></HistoryPage>}></Route>
        <Route path='/masks' element={<MasksPage></MasksPage>}></Route>
        <Route path='/shop' element={<ShopPage></ShopPage>}></Route>
        <Route path='/register' element={<RegPage></RegPage>}></Route>
        <Route path= '/login' element={<LoginPage></LoginPage>}></Route>
        <Route path= '/profile' element={<Profile></Profile>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
