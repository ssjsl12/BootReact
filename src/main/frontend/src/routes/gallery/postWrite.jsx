import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // URL 파라미터를 사용하기 위한 useParams
import axios from "axios";
import "./css/postWrite.css";

const PostWrite = ({ isAuthenticated }) => {
    const { category, galleryId } = useParams(); // URL 파라미터에서 category와 galleryId 추출
    const navigate = useNavigate();

    const [post, setPost] = useState({
        title: "",
        content: "",
        author: "",
    });

    // 글쓰기 폼을 가져옵니다.
    useEffect(() => {
        axios
            .get(`/${category}/${galleryId}/write`)
            .then((res) => setPost(res.data)) // 서버에서 가져온 DTO 값을 상태에 저장
            .catch((err) => console.error(err));
    }, [category, galleryId]);

    // 폼 입력값 변경 처리
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPost((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // 게시글 작성 처리
    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post(`/${category}/${galleryId}/write`, post)
            .then(() => {
                navigate(`/${category}/${galleryId}/0`);
            })
            .catch((err) => console.error(err));
    };

    // 게시글 내용 처리
    const handleContentChange = (event) => {

        setPost((prevPost) => ({
            ...prevPost,
            content: event.target.innerHTML, // 입력한 내용을 문자열로 상태에 저장
        }));

        console.log(post);

    };



    // 이미지 업로드 처리
    const handleImageUpload = async (event) => {
        const files = Array.from(event.target.files); // 여러 파일을 배열로 변환
        if (files.length > 0) {
            try {
                const formData = new FormData();

                // 모든 파일을 formData에 추가
                files.forEach((file) => {
                    formData.append("images", file); // 서버에서 "images" 키로 받을 수 있도록 설정
                });

                // 서버로 이미지 업로드 요청
                const response = await axios.post("/api/upload", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });

                // 서버에서 업로드된 이미지 URL 배열 반환
                const imageUrls = response.data; // 예: ['/uploads/img1.jpg', '/uploads/img2.jpg']

                // 이미지 URL들을 HTML로 변환하여 content에 추가
                const imgHTML = imageUrls
                    .map(
                        (url) =>
                            `<img src="http://localhost:8080/api${url}" alt="Uploaded Image" style="max-width: 100%;" />`
                    )
                    .join(""); // 여러 이미지 URL을 하나의 HTML로 합침
                const newContent = post.content + imgHTML;

                // 상태 업데이트
                setPost((prevPost) => ({
                    ...prevPost,
                    content: newContent,
                }));
            } catch (error) {
                console.error("이미지 업로드 실패:", error);
            }
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
                                value={post.password || ""}
                                onChange={handleChange}
                            />
                        </>
                    )}
                </div>
                <div>
                    {!isAuthenticated && (
                        <>
                            <label htmlFor="author">작성자</label>
                            <input
                                type="author"
                                id="author"
                                name="author"
                                value={post.author || ""}
                                onChange={handleChange}
                            />
                        </>
                    )}
                </div>

                <div>


                    <input
                        type="file"
                        accept="image/*" // 이미지 파일만 선택 가능
                        onChange={handleImageUpload} // 이미지 파일 선택 시 이벤트 발생
                        style={{display: "none"}} // 파일 입력창 숨기기
                        id="image-upload"
                        multiple
                    />

                    <div className="content-group">
                        <div></div>
                        <label htmlFor="content">내용</label>
                        <button
                            className="image-add-btn"
                            type="button"
                            onClick={() => document.getElementById("image-upload").click()}
                        >
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
                        onBlur={handleContentChange}  // 내용 변경 시 상태 업데이트
                    />
                </div>

                <button className="write-add-btn" type="submit">
                    글쓰기
                </button>
            </form>
        </div>
    );
};

export default PostWrite;
