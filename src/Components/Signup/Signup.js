import {React, useState} from 'react';
import '../Main/Main.css'; // CSS 파일 import
import 'bootstrap/dist/css/bootstrap.min.css'; // 부트스트랩 CSS import
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // 부트스트랩 JavaScript import
import Header from '../Navbar/Header';
import './Signup.css';


const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 회원가입 버튼 클릭 핸들러
  const handleSubmit = (event) => {
      event.preventDefault(); // 기본 동작 방지
      // 여기서 실제 회원가입 처리 로직을 구현할 수 있습니다.
      console.log(`회원가입 정보: ${username}, ${email}, ${password}`);
      // 예시로 콘솔에 출력하거나 API 호출 등의 작업을 수행할 수 있습니다.
  };

  return (
    <div>
      <Header/><br/><br/><br/><br/>
      <div className='signup-container'>
        <center><h2>Sign up</h2></center>
          <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Name :</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email :</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password :</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="submit-btn">회원가입</button>
            </form>
      </div>

    </div>
  );
}

export default Signup;