import React, { useEffect, useState } from 'react';
import { useParams  } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';  // useNavigate 사용
// URL 파라미터를 사용하기 위한 useParams
import axios from "axios";
import './css/postDetail.css';

const PostDetail = () =>
{
    const { galleryId } = useParams();  // URL에서 galleryId 추출
    const { category } = useParams(); // URL 파라미터에서 category 가져오기

    const navigate = useNavigate(); // navigate 함수 선언
    const { no} = useParams();

    const[post, setPost] = useState([]);

    useEffect(() => {
        // 서버에서 게시글 상세 정보를 가져옵니다.
        axios.get(`/${category}/${galleryId}/detail/${no}`)
            .then(res => setPost(res.data)) // 데이터 받아서 상태 업데이트
            .catch(err => console.error("Error fetching post:", err));
    }, [category, galleryId, no]);

    if (!post) return <div>Loading...</div>; // 로딩 중일 때 표시


    return (
        <div className="post-detail">
            <p className="post_title">{post.title}</p>
            <div className="post-meta">
                <p className="author">{post.author}</p>
                <p className="date">{post.updateTime}</p>
            </div>
            <div className="post-content">
                {post.content}
            </div>
            <div className="btn-group">
                <button className="btn" onClick={() => navigate(`/${category}/${galleryId}/modify/${no}`)}>수정</button>
            </div>
        </div>
    );

};

export default PostDetail;



