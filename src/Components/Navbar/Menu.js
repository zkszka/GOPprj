import React from "react";
import { Link } from 'react-router-dom';

const Menu = () => {
    return(
        <div>
            {/* Menu */}
               <div className="menu-container">
               {/* Dropdowns */}
               {/* Dropdown 1 */}
               <div className="dropdown">
                   <div className="dropbtn"><div className="ear"/>
                       <span className="dropbtn_icon">유기동물정보</span>
                   </div>
                   <div className="dropdown-content">
                       <Link to="/abandoned/notice">유기동물조회</Link>
                       <Link to="/abandoned/shelter">보호소찾기</Link>
                   </div>
               </div>
               {/* Dropdown 2 */}
               <div className="dropdown">
                   <div className="dropbtn"><div className="ear"/>
                       <span className="dropbtn_icon"> 
                       <a href="https://www.animal.go.kr/front/community/show.do?boardId=contents&seq=53&menuNo=1000000058" style={{ color: 'inherit', textDecoration: 'none' }}>입양안내</a>
                        </span>
                   </div>
               </div>
               {/* Dropdown 3 */}
               <div className="dropdown">
                   <div className="dropbtn"><div className="ear"/>
                       <span className="dropbtn_icon">실종동물정보</span>
                   </div>
                   <div className="dropdown-content">
                       
                        <Link to="/missing/search">실종동물조회</Link>
                        <Link to="/missing/register">실종동물등록</Link>
                   </div>
               </div>
               {/* Dropdown 4 */}
               <div className="dropdown">
                   <div className="dropbtn"><div className="ear"/>
                       <span className="dropbtn_icon">백과사전</span>
                   </div>
                   <div className="dropdown-content">
                       <Link to="/encyclopedia/dog">강아지</Link>
                       <Link to="/encyclopedia/cat">고양이</Link>
                   </div>
               </div>
               {/* Dropdown 5 */}
               <div className="dropdown">
                   <div className="dropbtn"><div className="ear"/>
                       <span className="dropbtn_icon">반려동반시설</span>
                   </div>
                   <div className="dropdown-content">
                       <Link to="/leisure/petfacility">반려동반시설</Link>
                       <Link to="/leisure/petcare">반려의료시설</Link>
                   </div>
               </div>
               {/* Dropdown 6 */}
               <div className="dropdown">
                   <div className="dropbtn"><div className="ear"/>
                       <span className="dropbtn_icon">커뮤니티</span>
                   </div>
               </div>
           </div><br/>
        </div>
    )
}

export default Menu;

