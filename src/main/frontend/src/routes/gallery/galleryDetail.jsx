import React, { useEffect, useState } from 'react';
import { useParams  } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';  // useNavigate 사용
// URL 파라미터를 사용하기 위한 useParams
import axios from "axios";
import './css/galleryDetail.css';
const GalleryDetail = () => {
    const { galleryId } = useParams();  // URL에서 galleryId 추출
    const { category } = useParams(); // URL 파라미터에서 category 가져오기

    const navigate = useNavigate(); // navigate 함수 선언

    const[post, setPost] = useState([]);
    useEffect(() => {
        // 갤러리 상세 정보를 가져옵니다.
        axios.get(`/${category}/${galleryId}`)
            .then(res => setPost(res.data))
            .catch(err => console.error(err));
    }, [galleryId]);

    //게시글 제목

    const handleWriteClick = () => {
        navigate(`/${category}/${galleryId}/write`); // 원하는 경로로 이동
    };

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
                    <div key={p.id} className="post-item">
                        <span className="post-title">{p.id}</span>
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