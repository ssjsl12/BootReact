import React, { useEffect, useState , useRef } from 'react';
import { useParams ,useNavigate } from 'react-router-dom';  // URL 파라미터를 사용하기 위한 useParams
import axios from "axios";
import './css/postWrite.css';

const PostWrite = ({ isAuthenticated }) => {
    const { category, galleryId } = useParams(); // URL 파라미터에서 category와 galleryId 추출

    const navigate = useNavigate();

    const [post, setPost] = useState({
        title: '',
        content: '',
        author: '',
    });

    // 글쓰기 폼을 가져옵니다.
    useEffect(() => {
        axios.get(`/${category}/${galleryId}/write`)
            .then(res => setPost(res.data)) // 서버에서 가져온 DTO 값을 상태에 저장
            .catch(err => console.error(err));
    }, [category, galleryId]);

    // 폼 입력값 변경 처리
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPost(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    // 게시글 작성 처리
    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(post);

        axios.post(`/${category}/${galleryId}/write`, post)
            .then(res => {
                navigate(`/${category}/${galleryId}/0`);
            })
            .catch(err => console.error(err));
    };


    //게시글 이미지 및 내용 처리

    const handleContentChange = (event) => {
        setPost((prevPost) => ({
            ...prevPost,
            content: event.target.value,  // 입력한 내용을 문자열로 상태에 저장
        }));
    };

    const handleAddImage = (event) => {
        // 파일이 선택되었을 때 처리
        const file = event.target.files[0]; // 첫 번째 파일 가져오기

        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                const imageUrl = reader.result; // 이미지 데이터 URL
                const editableDiv = document.getElementById('content');
                const imgTag = `<img src="${imageUrl}" alt="첨부 이미지" style="max-width: 100%; height: auto;"/>`;
                editableDiv.innerHTML += imgTag; // 현재 내용에 이미지 추가
                setPost({ ...post, content: editableDiv.innerHTML }); // 상태 업데이트
            };

            reader.readAsDataURL(file); // 파일을 읽어들여 DataURL로 변환
        }
    };



        return (
            <div>
                <h1>{galleryId}</h1>
                <form
                    onSubmit={handleSubmit}
                    className={`form ${isAuthenticated ? "form-authenticated" : "form-unauthenticated"}`}
                >
                    <div>
                        <label htmlFor="title">제목</label>
                        <input
                            type="title"
                            id="title"
                            name="title"
                            value={post.title}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        {!isAuthenticated && (
                            <>
                                <label htmlFor="password">패스워드</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={post.password}
                                    onChange={handleChange}
                                />
                            </>
                        )}
                    </div>
                    <div>
                        {/* 작성자 입력 필드: isAuthenticated가 false일 때만 렌더링 */}
                        {!isAuthenticated && (
                            <>
                                <label htmlFor="author">작성자</label>
                                <input
                                    type="author"
                                    id="author"
                                    name="author"
                                    value={post.author}
                                    onChange={handleChange}
                                />
                            </>
                        )}
                    </div>
                    <div>

                        <input
                            type="file"
                            accept="image/*" // 이미지 파일만 선택 가능
                            onChange={handleAddImage} // 이미지 파일 선택 시 이벤트 발생
                            style={{display: 'none'}} // 파일 입력창 숨기기
                            id="image-upload"
                        />

                        <div  className="content-group">
                            <div></div>
                            <label htmlFor="content">내용</label>
                            <button className="image-add-btn" type="button"
                                    onClick={() => document.getElementById('image-upload').click()}>
                                이미지 추가
                             </button>
                        </div>
                        <div
                            id="content"
                            contentEditable
                            className={`form ${isAuthenticated ? "editable-content-authenticated" : "editable-content-unauthenticated"}`}
                            dangerouslySetInnerHTML={{
                                __html: post.content,  // 기존 content 값을 HTML로 삽입
                            }}
                            onInput={handleContentChange}  // 내용 변경 시 상태 업데이트
                        />

                    </div>
                    <button className="write-add-btn" type="submit">글쓰기</button>
                </form>
            </div>
        )
            ;
};
export default PostWrite;