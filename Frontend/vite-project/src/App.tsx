// App.tsx

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './styles/App.css';
import MyPage from './pages/Mypage';
import Feedback from './pages/Feedback';
import Navbar from "./components/Navbar"; // Navbar 컴포넌트 임포트
import Write from "./components/Write";
import Login from "./pages/Login";
import Postpage1 from "./components/Postpage1";
<Route path="/postpage" element={<Postpage1 />} />


function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <div>
        <Navbar /> {/* Navbar 컴포넌트를 삽입 */} {/*라우터 경로 안에 전역배치*/}
        <Routes>
          {/* 홈 화면 */}
          <Route path="/" element={
            <>
              <div>
                <a href="https://vite.dev" target="_blank">
                  <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                  <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
              </div>
              <h1>Vite + React</h1>
              <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                  count is {count}
                </button>
                <p>
                  Edit <code>src/App.tsx</code> and save to test HMR
                </p>
              </div>
              <p className="read-the-docs">
                Click on the Vite and React logos to learn more
              </p>
            </>
          } />
          {/* 마이페이지 */}
          <Route path="/mypage" element={<MyPage />} />
          {/* 피드백 페이지 */}
          <Route path="/feedback" element={<Feedback />} />
          {/* Write.tsx 경로 추가 */}
          <Route path="/write" element={<Write />} />
          {/* Login.tsx 경로 추가 */}
          <Route path="/login" element={<Login />} />
          {/* Postpage1.tsx 경로 추가 */}
          <Route path="/postpage1" element={<Postpage1 />} />  
        </Routes>
      </div>
    </Router>
  );
}

export default App;
