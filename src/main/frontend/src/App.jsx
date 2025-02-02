import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import React, { useEffect, useState } from 'react';
import Test from "./routes/Test";
import Gallery from "./routes/gallery/gallery";
import GalleryDetail from './routes/gallery/galleryDetail';  // 갤러리 상세 페이지 컴포넌트
import PostWrite from './routes/gallery/postWrite';
import PostDetail from "./routes/gallery/postDetail";
import PostModify from "./routes/gallery/postModify";
import LoginForm from "./routes/gallery/LoginForm";
import JoinForm from "./routes/gallery/JoinDetail"
import Logout from "./routes/gallery/Logout"
import MyGall from "./routes/gallery/MyGall"
import Message from "./routes/gallery/message";
import Main from "./routes/gallery/Main";
import MyInfo from "./routes/gallery/MyInfo";
import axios from "axios";
import './App.css';
import RePassword from "./routes/gallery/RePassword";



function App() {
    const navigate = useNavigate();  // useNavigate 훅 사용
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const [isOpen, setIsOpen] = useState(false); // 로그인 창 열림/닫힘 상태

    const toggleLoginWindow = () => {
        setIsOpen(!isOpen); // 상태 반전
    };

    //로그인 처리
    useEffect(() => {
        axios
            .get("/auth-check", { withCredentials: true })
            .then((response) => {
                setIsAuthenticated(response.data.authenticated); // 서버에서 인증 상태를 반환
            })
            .catch(() => {
                setIsAuthenticated(false);
            });
    }, []);


    const navLinks = [
        { path: '/gallery', label: '갤러리' },
        { path: '/minergallery', label: '마이너갤' },
        { path: '/minigallery', label: '미니갤' },
        { path: '/persongallery', label: '인물갤' },
    ];

    return (
        <div className="App">
            {/* 헤더 */}
            <header style={{backgroundColor: "#333"}}>
                <h1 style={{color: "white", padding: "10px" }} onClick={() => navigate("/")}>ForumGall</h1>


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



            </header>

            <section>
                <div className="login">
                    <button className="connet-login" onClick={toggleLoginWindow}>
                        {isAuthenticated ? '로그아웃 하시겠습니까?' : '로그인을 해주세요.'}
                    </button>

                    {/* 로그인 창 토글 */}
                    <div className={`login-window ${isOpen ? 'open' : ''}`}>
                        <div className="login-option">
                            <button
                                className="login-action"
                                onClick={() => {
                                    if (isAuthenticated) {
                                        navigate('/logout'); // 로그아웃으로 이동
                                    } else {
                                        navigate('/login'); // 로그인 폼으로 이동
                                    }
                                }}
                            >
                                {isAuthenticated ? '로그아웃' : '로그인'}
                            </button>

                            <button className="user-gall" onClick={() => navigate("/myGall")}>
                                스크랩
                            </button>
                            <button className="bookmark" onClick={() => navigate("/message")}>
                                쪽지함
                            </button>
                            <button className="alert-message" onClick={() => navigate("/myinfo")}>내정보</button>
                        </div>
                    </div>
                </div>

                {/* 라우팅 설정 */}
                <Routes>
                    <Route path="/" element={<Main/>}></Route>
                    <Route path="/logout" element={<Logout/>}/>
                    <Route path="/myinfo" element={<MyInfo isAuthenticated ={isAuthenticated}/>}/>
                    <Route path="/rePassword" element={<RePassword isAuthenticated={isAuthenticated}/>}/>
                    <Route path="/login" element={<LoginForm/>}/> {/* 로그인 */}
                    <Route path="/join" element={<JoinForm/>}/> {/*회원가입*/}
                    <Route path="/message" element={<Message  isAuthenticated ={isAuthenticated}/>}/> {/*메세지*/}
                    <Route path="/myGall" element={<MyGall isAuthenticated ={isAuthenticated}/>}/> {/*나의 스크랩*/}
                    <Route path="/:category" element={<Gallery/>}/> {/* 카테고리별 갤러리 리스트 */}
                    <Route path="/:category/:galleryId/:page" element={<GalleryDetail/>}/> {/* 갤러리 상세 페이지 게시글 리스트 */}
                    <Route path="/:category/:galleryId/write"
                           element={<PostWrite isAuthenticated={isAuthenticated}/>}/>{/* 게시글 작성 */}
                    <Route path="/:category/:galleryId/detail/:no" element={<PostDetail isAuthenticated={isAuthenticated}/>}/> {/*게시글 상세정보*/}
                    <Route path="/:category/:galleryId/modify/:no" element={<PostModify/>}/> {/*게시글 상세정보*/}
                </Routes>

            </section>
            {/* 푸터 */}
            <footer className="footer">
                <p>COPYRIGHT(C) 2024 Inc, All Rights Reserved</p>
            </footer>
        </div>
    );
}

function AppWrapper() {
    return (
        <Router>
            <App/>
        </Router>
    );
}

export default AppWrapper;
