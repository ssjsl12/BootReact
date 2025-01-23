import React, { useEffect, useState } from 'react';
import { useParams  } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';  // useNavigate 사용
// URL 파라미터를 사용하기 위한 useParams
import axios from "axios";
import './css/postDetail.css';

const PostDetail = () =>
{
    const [showModal, setShowModal] = useState(false);  // 모달 창 표시 여부 상태
    const { galleryId } = useParams();  // URL에서 galleryId 추출
    const { category } = useParams(); // URL 파라미터에서 category 가져오기
    const [password, setPassword] = useState('');

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

    //수정버튼
    function modify()
    {
        setShowModal(true);
    }

    // 비밀번호 입력
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    //모달 닫기
    const closeModal = () => {
        setShowModal(false);
    };

    const isAuthentic = async (password) => {
        try {
            const response = await axios.post('/api/verify-password', {  password, postPassword: post.password });  // 서버로 비밀번호 확인 요청

            if (response.data.isValid) {
                console.log('비밀번호가 맞습니다.');
                setShowModal(false);  // 모달 닫기
                navigate(`/${category}/${galleryId}/modify/${no}`);
            } else {
                console.log('비밀번호가 틀립니다.');
                alert('비밀번호가 일치하지 않습니다.');
            }
        } catch (error) {
            console.error('비밀번호 검증 오류:', error);
            alert('비밀번호 검증에 실패했습니다.');
        }
    };


    function handleSubmit() {

        const authorName = document.getElementById('userid').value
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
                <button className="btn" onClick={modify}>수정</button>
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
                            <input type="id" id ="userid" placeholder="Enter your ID"/>
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

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>비밀번호를 입력하세요</h2>
                        <input
                            type="password"
                            id="modal-password"
                            onChange={handlePasswordChange}
                            placeholder="비밀번호"
                        />
                        <button onClick={() => isAuthentic(password)}>확인</button>
                        <button onClick={closeModal}>취소</button>
                    </div>
                </div>
            )}


        </div>
    );


};

export default PostDetail;



