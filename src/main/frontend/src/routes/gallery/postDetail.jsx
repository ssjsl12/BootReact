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

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString(); // 로컬 시간 형식으로 변환
    };

    function handleSubmit() {

        const authorName = document.getElementById('userid').value;
        const password = document.getElementById('userpwd').value;
        const content = document.getElementById('usercomment').value;

       axios.post(`/${category}/${galleryId}/${post.id}/write`, {
           authorName,
           password,
           content
        })
            .then(response => {
                window.location.reload()
            })
            .catch(error => {

            });
    }

    return (
        <div>
            <div className="post-detail">
                <button className="btn" onClick={() =>
                    navigate(`/${category}/${galleryId}/modify/${no}`)}>수정</button>
                <h1 className="post_title">{post.title}</h1>
                <div className="post-meta">
                    <p className="author">{post.author}</p> <p> | </p>
                    <p className="date">{formatDate(post.updateTime)}</p>
                </div>
                <div className="post-content">{post.content}</div>
            </div>
            <div className="comment-group">
                <h2>댓글</h2>

                {post.comments && post.comments.length > 0 ? (
                    post.comments.map(comment => (
                        <div className="comment-detail">
                            <div key={comment.id} className="comment-item">
                                <p className="comment-author">{comment.authorName}</p>
                                <p className="comment-content">{comment.content}</p>
                                <p className="comment-time">{new Date(comment.createdAt).toLocaleString()}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No comments available</p>
                )}

                <div className="write-comment-group">

                    <div className="id-pw-group">

                        <div className="id">
                            <input type="text" id ="userid" placeholder="Enter your ID"/>
                        </div>

                        <div className="password">
                            <input type="password" id="userpwd" placeholder="Enter your password"/>
                        </div>

                    </div>

                    <div className="comment-input">
                        <textarea className="comment" id="usercomment" name="comment" placeholder="Write your comment here..."></textarea>
                    </div>

                    <div className="submit-button">
                            <button type="button" onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            </div>


        </div>
    );


};

export default PostDetail;



