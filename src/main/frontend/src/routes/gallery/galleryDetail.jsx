import React, { useEffect, useState } from 'react';
import { useParams  } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';  // useNavigate 사용
// URL 파라미터를 사용하기 위한 useParams
import axios from "axios";
import './css/galleryDetail.css';
const GalleryDetail = () => {
    const { galleryId ,category } = useParams();  // URL에서 galleryId 추출

    const navigate = useNavigate(); // navigate 함수 선언

    const[post, setPost] = useState([]);
    useEffect(() => {
        axios.get(`/${category}/${galleryId}`)
            .then(res => setPost(res.data))
            .catch(err => console.error(err));
    }, [category, galleryId]); // 의존성 배열 추가

    //게시글 제목

    const handleWriteClick = () => {
        navigate(`/${category}/${galleryId}/write`); // 원하는 경로로 이동
    };

    const handlePostClick = (no) => {
        navigate(`/${category}/${galleryId}/detail/${no}`); // 상세 페이지로 이동
    };

 /*   localStorage.clear();*/

    return (


        <div className="gallery-posts">
            <h1>{galleryId}</h1>

            <div className="post-list-option">

                <div className="post-right">

                    <button className="btn_write" onClick={handleWriteClick}>
                        글쓰기
                    </button>

                </div>

            </div>

            <div className="post-list">
                <div className="post-item-header">
                    <span className="post-no">번호</span>
                    <span className="post-title">제목</span>
                    <span className="post-author">작성자</span>
                    <span className="post-date">업데이트 시간</span>
                    <span className="post-views">조회수</span>
                </div>

                {post.map(p => (
                    <div
                        key={p.id}
                        className="post-item"
                        onClick={() => handlePostClick(p.id)} // 클릭 시 해당 게시글 상세 페이지로 이동
                    >
                        <span className="post-no">{p.id}</span>
                        <span className="post-title">{p.title}</span>
                        <span className="post-author">{p.author}</span>
                        <span className="post-date">{p.updatedAt}</span>
                        <span className="post-views">{p.views}</span>
                    </div>
                ))}
            </div>
        </div>

    );
};

export default GalleryDetail;