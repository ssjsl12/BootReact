import React from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import Test from "./routes/Test";
import Gallery from "./routes/gallery/gallery";
import GalleryDetail from './routes/gallery/galleryDetail';  // 갤러리 상세 페이지 컴포넌트
import PostWrite from './routes/gallery/postWrite';

function App() {
    const navigate = useNavigate();  // useNavigate 훅 사용

    const navLinks = [
        { path: '/gallery', label: '갤러리' },
        { path: '/minergallery', label: '마이너갤' },
        { path: '/minigallery', label: '미니갤' },
        { path: '/persongallery', label: '인물갤' },
        { path: '/test' , label : '테스트' }
    ];

    return (
        <div className="App">
            {/* 헤더 */}
            <header style={{backgroundColor: "#333"}}>
                <h1 style={{color:"white"}}>헤더 제목</h1>
                <h3>서브 타이틀</h3>
            </header>

            {/* 내비게이션 */}
            <Navbar className="custom-navbar" expand="lg" data-bs-theme="dark">
                <Container>
                    <Nav className="me-auto">
                        {
                            navLinks.map((link, index) => (
                            <Nav.Link key={index} onClick={() => navigate(link.path)} className="nav-link">
                                {link.label}
                            </Nav.Link>
                        ))}
                    </Nav>
                </Container>
            </Navbar>

            {/* 라우팅 설정 */}
            <Routes>
                <Route path="/:category" element={<Gallery />} />  {/* 카테고리별 갤러리 리스트 */}
                <Route path="/:category/:galleryId" element={<GalleryDetail />} />  {/* 갤러리 상세 페이지 게시글 리스트 */}
                <Route path="/:category/:galleryId/write" element={<PostWrite/>} /> {/* 게시글 작성 */}
                {/*게시글 상세페이지추가 */}
            </Routes>

            {/* 푸터 */}
            <footer style={{textAlign: 'center', marginTop: '30px'}}>
                <p className="footer">COPYRIGHT(C) 2024 Nike, Inc, All Rights Reserved</p>
            </footer>
        </div>
    );
}

function AppWrapper() {
    return (
        <Router>
            <App />
        </Router>
    );
}

export default AppWrapper;
