import React from 'react';
import './Main.css'; // CSS 파일 import
import 'bootstrap/dist/css/bootstrap.min.css'; // 부트스트랩 CSS import
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // 부트스트랩 JavaScript import
import Navbar from '../Navbar/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Accomodation from '../Leisure/Accomodation';
import Restaurant from '../Leisure/Restaurant';
import AdoptionInfo from '../Adoption/AdoptionInfo'; 
import AdoptionReview from '../Adoption/AdoptionReview'; 
import AbandonedNotice from '../Abandoned/AnimalNotice';
import Shelter from '../Abandoned/Shelter';
import DogEncyclopedia from '../Encyclopedia/DogEncyclopedia'; 
import CatEncyclopedia from '../Encyclopedia/CatEncyclopedia'; 
import Signup from '../Signup/Signup';
import Login from '../Login/Login';
import Home from '../Home/Home';
import RegisterLostPets from '../Missing/RegisterLostPets';
import SearchLostPets from '../Missing/SearchLostPets';


const Main = () => {
  return (
    <div>
      <Router>
          <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/abandoned/notice' element={<AbandonedNotice />} />
                <Route path='/abandoned/shelter' element={<Shelter/>} />
                <Route path='/adoption/info' element={<AdoptionInfo />} />
                <Route path='/adoption/review' element={<AdoptionReview />} />
                <Route path='/encyclopedia/dog' element={<DogEncyclopedia />} />
                <Route path='/encyclopedia/cat' element={<CatEncyclopedia />} />
                <Route path='/leisure/restaurant' element={<Restaurant />} />
                <Route path='/leisure/accommodation' element={<Accomodation />} />
                <Route path='/missing/search' element={<SearchLostPets/>} />
                <Route path='/missing/register' element={<RegisterLostPets/>} />
            </Routes>
       </Router>
    </div>
  );
}

export default Main;
