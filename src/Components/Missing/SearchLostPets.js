import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Navbar/Footer';
import dbAxios from '../../api/axios';
import './SearchLostPets.css'; // CSS 파일 import

const SearchLostPets = () => {
  const [lostPets, setLostPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLostPets = async () => {
      try {
        const response = await dbAxios.get('/missing/all'); // 서버에서 모든 실종 동물 데이터 가져오기
        setLostPets(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching lost pets:', error);
      }
    };

    fetchLostPets();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-md-8">
            <div className="card">
              <div className="card-body">
                <h2 className="text-center mb-4">실종 동물 조회</h2>
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <ul className="list-group">
                    {lostPets.map(pet => (
                      <li key={pet.id} className="list-group-item">
                        <h3>{pet.petName}</h3>
                        <p>종류: {pet.species}</p>
                        <p>특징 및 설명: {pet.description}</p>
                        <p>연락처: {pet.contactInfo}</p>
                        {pet.photo && (
                          <img
                            src={`data:image/jpeg;base64,${pet.photo}`}
                            alt={pet.petName}
                            className="img-fluid"
                          />
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SearchLostPets;
