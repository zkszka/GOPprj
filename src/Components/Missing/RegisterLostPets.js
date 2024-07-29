import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterLostPets.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Navbar from '../Navbar/Navbar';
import Footer from '../Navbar/Footer';
import dbAxios from '../../api/axios'; // 세션 확인 API import 추가

const RegisterLostPets = () => {
  const [formData, setFormData] = useState({
    petName: '',
    species: '강아지',
    description: '',
    contactInfo: '',
    photo: null
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false); // 등록 성공 상태 변수 추가
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await dbAxios.get('/check-session'); // axios로 세션 확인 요청 보내기
        if (response.status === 200) {
          setIsLoggedIn(true); // 세션이 유효하면 로그인 상태로 설정
        } else {
          setIsLoggedIn(false); // 세션이 유효하지 않으면 로그인 상태를 false로 설정하고, 로그인 페이지로 이동
          navigate('/login');
        }
      } catch (error) {
        console.error('Error checking session:', error);
        setIsLoggedIn(false); // 에러 발생 시 로그인 상태를 false로 설정
      }
    };

    checkLoginStatus();
  }, [navigate]); // navigate를 의존성 배열에 추가하여 navigate 함수가 변경될 때마다 useEffect가 다시 실행되도록 설정

  const handleChange = (e) => {
    if (e.target.name === 'photo') {
      setFormData({
        ...formData,
        photo: e.target.files[0] // 파일 업로드의 경우 e.target.files[0]으로 접근
      });
    } else {
      const { name, value } = e.target;
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!isLoggedIn) {
      alert('로그인이 필요합니다.');
      navigate('/login');
      return;
    }
  
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('petName', formData.petName);
      formDataToSend.append('species', formData.species);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('contactInfo', formData.contactInfo);
      if (formData.photo) {
        formDataToSend.append('photo', formData.photo); // 파일 업로드 추가
      }
  
      // 서버로 데이터 전송
      const response = await dbAxios.post('/missing', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data' // 파일 업로드의 경우 Content-Type을 지정해야 함
        }
      });
      console.log('Server Response:', response.data);
  
      // 등록 성공 시 알림 메시지 표시 및 메인 화면으로 이동
      setIsRegistered(true);
      navigate('/search');
  
    } catch (error) {
      console.error('Error submitting form:', error);
      // 오류 처리 (예: 사용자에게 오류 메시지 표시)
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
                      accept="image/*"
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
      {isRegistered && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          등록되었습니다!
          <button type="button" className="close" onClick={() => setIsRegistered(false)}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default RegisterLostPets;
