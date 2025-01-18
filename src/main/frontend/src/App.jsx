import React from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import Test from "./routes/Test";
import Gallery from "./routes/gallery/gallery";
import GalleryDetail from './routes/gallery/galleryDetail';  // 갤러리 상세 페이지 컴포넌트

function App() {
    const navigate = useNavigate();  // useNavigate 훅 사용

    const navLinks = [
        { path: '/gallery/gallery', label: '갤러리' },
        { path: '/gallery/minergallery', label: '마이너갤' },
        { path: '/gallery/minigallery', label: '미니갤' },
        { path: '/gallery/persongallery', label: '인물갤' },
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
                        {navLinks.map((link, index) => (
                            <Nav.Link key={index} onClick={() => navigate(link.path)} className="nav-link">
                                {link.label}
                            </Nav.Link>
                        ))}
                    </Nav>
                </Container>
            </Navbar>

            {/* 라우팅 설정 */}
            <Routes>
                <Route path="/gallery/:category" element={<Gallery />} />  {/* 카테고리별 갤러리 리스트 */}
                <Route path="/gallery/:category/:galleryId" element={<GalleryDetail />} />  {/* 갤러리 상세 페이지 */}
                <Route path="/test" element={<Test />} />
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
