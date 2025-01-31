import React, { useEffect, useState } from 'react';
import { useParams  } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';  // useNavigate 사용
// URL 파라미터를 사용하기 위한 useParams
import axios from "axios";
import './css/postDetail.css';
import UserOption from "./UserOption";

const PostDetail = ({ isAuthenticated }) =>
{
    const [showModal, setShowModal] = useState(false);  // 모달 창 표시 여부 상태
    const {galleryId } = useParams();  // URL에서 galleryId 추출
    const {category } = useParams(); // URL 파라미터에서 category 가져오기
    const [password, setPassword] = useState('');
    const [type, setType] = useState([]);
    const navigate = useNavigate(); // navigate 함수 선언
    const { no} = useParams(); // 게시글 넘버
    const [ commentNo ,setCommentNo] = useState( []); // 코멘트 넘버
    const[post, setPost] = useState([]);
    const [showOptions, setShowOptions] = useState(false);

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

    function scrap()
    {
        axios.post(`/scrap?postno=${no}`)
            .then(res =>
            {
                window.location.reload();
            })
            .catch(error =>{

                console.log("error");
            });
    }


    //수정버튼
    function modify()
    {
        setShowModal(true);
        setType("modify");
    }

    function postDelete()
    {
        setShowModal(true);
        setType("delete");
    }

    function commentDelete(commentNum)
    {
        setCommentNo(commentNum);
        setShowModal(true);
        setType("commentdelete");
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

            var response = null;

            if(type === "modify" || type == "delete")
            {
                 response = await axios.post('/api/verify-password', {  password, postPassword: post.password });  // 서버로 비밀번호 확인 요청 - 게시글
            }
            else{

                 response = await axios.post('/api/verify-comment-password', {  password, postPassword: post.password });  //서버에서 비밀번호 확인 - 댓글
            }


            if (response.data.isValid) {

                setShowModal(false);  // 모달 닫기

                if(type === "modify")
                {
                    navigate(`/${category}/${galleryId}/modify/${no}`);
                }
                else if(type === "delete")
                {
                    //삭제
                    axios.post(`/${category}/${galleryId}/delete/${no}`)
                        .then(res => {
                            alert("삭제 완료")
                            window.location.reload();
                        }) // 데이터 받아서 상태 업데이트
                        .catch(error => {
                            alert("삭제 실패")
                        });

                    navigate(`/${category}/${galleryId}/0`);
                }
                else
                {
                    axios.post(`/comment/delete/${commentNo}`)
                        .then(res => {
                            window.location.reload()
                            alert(res.data);
                        })
                        .catch(error => {
                            alert(error);
                        })

                    navigate(`/${category}/${galleryId}/detail/${no}`);
                }


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

    //추천
    function recommend(type)
    {
        axios.post(`/${category}/${galleryId}/${post.id}/recommend?type=${type}`)
            .then(res =>
            {
                window.location.reload();
            })
            .catch(error =>{

                console.log("error");
            });
    }

    return (
        <div>
            <div className="post-detail">
                <div className="btn-detail-group">
                    {isAuthenticated && (
                        <button className="btn" onClick={scrap}>스크랩</button>
                    )}
                    <button className="btn" onClick={modify}>수정</button>
                    <button className="btn" onClick={postDelete}>삭제</button>
                </div>
                <h1 className="post_title">{post.title}</h1>
                <div className="post-meta">
                    <p
                        className="author"
                        onClick={() => {
                            if (post.authenticated) {  // authenticated가 true일 때만 동작
                                setShowOptions(!showOptions);
                            }
                        }
                    }
                        style={{cursor: "pointer"}}
                    >
                        {post.author} {post.authenticated && "✅"}
                    </p>
                     {formatDate(post.updateTime)}

                    {showOptions && <UserOption receiver ={post.author}/>}

                </div>
                <div
                    className="post-content"
                    dangerouslySetInnerHTML={{__html: post.content}} // HTML로 렌더링
                />
            </div>

            <div className="recommend-group">

                <div onClick={() => recommend(1)}>추천 {post.recommend}</div>
                <div onClick={() => recommend(-1)}>비추천{post.notrecommend}</div>
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
                                <button className="comment-delete" onClick={() => commentDelete(comment.id)}>X</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No comments available</p>
                )}

                <div className="write-comment-group">

                    <div className="id-pw-group">

                        <div className="id">
                            <input type="id" id="userid" placeholder="Enter your ID"/>
                        </div>

                        <div className="password">
                            <input type="password" id="userpwd" placeholder="Enter your password"/>
                        </div>

                    </div>

                    <div className="comment-input">
                        <textarea className="comment" id="usercomment" name="comment"
                                  placeholder="Write your comment here..."></textarea>
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



