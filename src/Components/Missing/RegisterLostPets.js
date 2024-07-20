import React, { useState } from 'react';
import './RegisterLostPets.css'; // RegisterLostPets.css 파일 import 추가
import 'bootstrap/dist/css/bootstrap.min.css'; // 부트스트랩 CSS import
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // 부트스트랩 JavaScript import
import Navbar from '../Navbar/Navbar';
import Footer from '../Navbar/Footer';

const RegisterLostPets = () => {
  const [formData, setFormData] = useState({
    petName: '',
    species: '강아지',
    description: '',
    contactInfo: '',
    photo: null // 사진을 위한 상태 추가
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 추가

  const handleChange = (e) => {
    if (e.target.name === 'photo') {
      // 사진 파일 선택 시 처리
      setFormData({
        ...formData,
        photo: e.target.files[0]
      });
    } else {
      const { name, value } = e.target;
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 로그인 상태 확인
    if (!isLoggedIn) {
      alert('로그인이 필요합니다.');
      // 로그인 페이지로 이동하는 코드 추가
      // 예: window.location.href = '/login'; (실제 로그인 페이지 경로에 맞게 수정)
      return;
    }

    // 여기에서 실종 동물 등록 처리 로직을 추가할 수 있습니다
    console.log(formData); // 예시: 폼 데이터 출력

    // 사진 파일이 있는 경우 FormData 객체를 생성하여 전송할 수 있음
    const formDataToSend = new FormData();
    formDataToSend.append('petName', formData.petName);
    formDataToSend.append('species', formData.species);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('contactInfo', formData.contactInfo);
    if (formData.photo) {
      formDataToSend.append('photo', formData.photo);
    }

    // 실제 서버로 데이터를 전송하거나 다른 처리를 수행할 수 있습니다
    // fetch 또는 axios 등을 사용하여 서버로 데이터 전송 가능

    // 예시로 콘솔에 FormData 확인
    for (var pair of formDataToSend.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-md-8">
            <div className="card">
              <div className="card-body">
                <h2 className="text-center mb-4">실종 동물 등록</h2>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="petName">반려동물 이름 :</label>
                    <input
                      type="text"
                      className="form-control smaller-input"
                      id="petName"
                      name="petName"
                      value={formData.petName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="species">동물 종류 :</label>
                    <select
                      className="form-control species-input"
                      id="species"
                      name="species"
                      value={formData.species}
                      onChange={handleChange}
                      required
                    >
                      <option value="강아지">강아지</option>
                      <option value="고양이">고양이</option>
                      <option value="기타">기타</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">특징 및 설명 :</label>
                    <textarea
                      className="form-control"
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows="5"
                      required
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <label htmlFor="contactInfo">연락처 :</label>
                    <input
                      type="text"
                      className="form-control"
                      id="contactInfo"
                      name="contactInfo"
                      value={formData.contactInfo}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="photo">사진 업로드 :</label>
                    <input
                      type="file"
                      className="form-control-file"
                      id="photo"
                      name="photo"
                      onChange={handleChange}
                      accept="image/*" // 이미지 파일만 허용
                    />
                  </div>
                  <div className="form-row align-items-center">
                    <div className="col-md-12 text-right">
                      <button type="submit" className="btn btn-primary">
                        등록
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div><br/><br/>
      <Footer />
    </div>
  );
};

export default RegisterLostPets;
