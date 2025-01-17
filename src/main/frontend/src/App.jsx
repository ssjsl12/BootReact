
import React from "react";
import "./App.css";

import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import Test from "./routes/Test";
import Persongallery from "./routes/gallery/Persongallery";
import Minigallery from "./routes/gallery/minigallery";
import Minergallery from "./routes/gallery/minergallery";
import Gallery from "./routes/gallery/gallery";
import GalleryDetail from './routes/gallery/galleryDetail';  // 갤러리 상세 페이지 컴포넌트

function App() {
    const navigate = useNavigate();  // useNavigate 훅 사용

    const navLinks = [
        { path: '/gallery', label: '갤러리' },
        { path: '/minergallery', label: '마이너갤' },
        { path: '/minigallery', label: '미니갤' },
        { path: '/persongallery', label: '인물갤' },
        { path: '/test' , label : '테스트'}
    ];

    const routes = [

        { path: '/test', element: <Test /> },
        { path: '/persongallery' , element: <Persongallery/> },
        { path: '/minigallery' , element: <Minigallery/> },
        { path: '/minergallery' , element: <Minergallery/> },
        { path: '/gallery' , element: <Gallery/> }
        // 필요한 라우트 추가 가능
    ];

    return (
        <div className="App">
            {/* 헤더: 커뮤니티 제목 */}
            <header style={{backgroundColor: "#333"}}>
                <h1 style={{color:"white"}}>헤더 제목</h1>  {/* 헤더 제목 */}
                <h2>서브 타이틀 </h2>  {/* 서브 타이틀 */}
            </header>


            {/* 타이틀 */}
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
                {routes.map((route, index) => (
                    <Route key={index} path={route.path} element={route.element} />
                ))}
                <Route path="/gallery/:galleryId" element={<GalleryDetail />} />  {/* 갤러리 상세 페이지 */}
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
