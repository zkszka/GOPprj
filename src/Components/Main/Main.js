import React from 'react';
import './Main.css'; // CSS 파일 import
import 'bootstrap/dist/css/bootstrap.min.css'; // 부트스트랩 CSS import
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // 부트스트랩 JavaScript import
import Navbar from '../Navbar/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PetCare from '../Leisure/PetCare';
import PetFacility from '../Leisure/PetFacility';
import AbandonedNotice from '../Abandoned/AnimalNotice';
import Shelter from '../Abandoned/Shelter';
import DogEncyclopedia from '../Encyclopedia/DogEncyclopedia'; 
import CatEncyclopedia from '../Encyclopedia/CatEncyclopedia'; 
import Signup from '../Signup/Signup';
import Login from '../Login/Login';
import Home from '../Home/Home';
import RegisterLostPets from '../Missing/RegisterLostPets';
import SearchLostPets from '../Missing/SearchLostPets';
import MainBoard from '../Community/MainBoard';
import PostBoard from '../Community/PostBoard';
import DetailBoard from '../Community/DetailBoard';
import UpdateBoard from '../Community/UpdateBoard';


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
                {/* <Route path='/adoption/info' element={<AdoptionInfo />} />
                <Route path='/adoption/review' element={<AdoptionReview />} /> */}
                <Route path='/encyclopedia/dog' element={<DogEncyclopedia />} />
                <Route path='/encyclopedia/cat' element={<CatEncyclopedia />} />
                <Route path='/leisure/petfacility' element={<PetFacility />} />
                <Route path='/leisure/petcare' element={<PetCare />} />
                <Route path='/missing/search' element={<SearchLostPets/>} />
                <Route path='/missing/register' element={<RegisterLostPets/>} />
                <Route path='/community/main_board' element={<MainBoard/>} />
                <Route path='/community/post' element={<PostBoard/>} />
                <Route path='/community/detail/:postId' element={<DetailBoard/>} />
                <Route path='/community/update/:postId' element={<UpdateBoard/>} />
            </Routes>
       </Router>
    </div>
  );
}

export default Main;
