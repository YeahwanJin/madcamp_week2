// App.tsx

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './styles/App.css';
import MyPage from './pages/Mypage';
import Feedback from './pages/Feedback';
import Navbar from "./components/Navbar"; // Navbar 컴포넌트 임포트
import Write from "./components/Write";
import Login from "./pages/Login";
import Postpage1 from "./components/Postpage1";
<Route path="/postpage" element={<Postpage1 />} />
import Chatbot from "./components/Chatbot.tsx"
import VideoCarousel from "./components/VideoCarousel"; // VideoCarousel 컴포넌트 임포트
import Home from "./pages/Home.tsx"

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} /> {/* 홈 화면에서 비디오 캐러셀 표시 */}
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/write" element={<Write />} />
          <Route path="/login" element={<Login />} />
          <Route path="/posts/:id" element={<Postpage1 />} />
          <Route path="/chatbot" element={<Chatbot />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;