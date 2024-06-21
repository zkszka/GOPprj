import React from 'react';
import './Main.css'; // CSS 파일 import
import 'bootstrap/dist/css/bootstrap.min.css'; // 부트스트랩 CSS import
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // 부트스트랩 JavaScript import
import Navbar from '../Navbar/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Accomodation from '../Leisure/Accomodation';
import Restaurant from '../Leisure/Restaurant';
import AdoptionInfo from '../Adoption/AdoptionInfo'; // 추가한 부분
import AdoptionReview from '../Adoption/AdoptionReview'; // 추가한 부분
import VolunteerInfo from '../Volunteer/VolunteerInfo'; // 추가한 부분
import VolunteerReview from '../Volunteer/VolunteerReview'; // 추가한 부분
import DogEncyclopedia from '../Encyclopedia/DogEncyclopedia'; // 추가한 부분
import CatEncyclopedia from '../Encyclopedia/CatEncyclopedia'; // 추가한 부분
import Signup from '../Signup/Signup';
import Login from '../Login/Login';
import Home from '../Home/Home';


const Main = () => {
  return (
    <div>
     <Router>
        <Navbar/>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/volunteer/info' element={<VolunteerInfo />} />
                <Route path='/volunteer/review' element={<VolunteerReview />} />
                <Route path='/adoption/info' element={<AdoptionInfo />} />
                <Route path='/adoption/review' element={<AdoptionReview />} />
                <Route path='/encyclopedia/dog' element={<DogEncyclopedia />} />
                <Route path='/encyclopedia/cat' element={<CatEncyclopedia />} />
                <Route path='/leisure/restaurant' element={<Restaurant />} />
                <Route path='/leisure/accommodation' element={<Accomodation />} />
            </Routes>
       </Router>
    </div>
  );
}

export default Main;
