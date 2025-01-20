import React, { useEffect, useState } from 'react';
import { useParams ,useNavigate } from 'react-router-dom';  // URL 파라미터를 사용하기 위한 useParams
import axios from "axios";


const PostModify = () => {
    const { category, galleryId } = useParams(); // URL 파라미터에서 category와 galleryId 추출
    const navigate = useNavigate();
    const { no} = useParams();
    const [post, setPost] = useState({
        title: '',
        content: '',
        author: '',
    });

    // 글쓰기 폼을 가져옵니다.
    useEffect(() => {
        axios.get(`/${category}/${galleryId}/modify/${no}`)
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

        axios.post(`/${category}/${galleryId}/modify/${no}`, post)
            .then(res => {
                navigate(`/${category}/${galleryId}/detail/${no}`);
            })
            .catch(err => console.error(err));
    };

    return (
        <div>
            <h1>{galleryId}</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">제목</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={post.title}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="author">작성자</label>
                    <input
                        type="text"
                        id="author"
                        name="author"
                        value={post.author}
                       readOnly
                    />
                </div>
                <div>
                    <label htmlFor="content">내용</label>
                    <textarea
                        id="content"
                        name="content"
                        value={post.content}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">글쓰기</button>
            </form>
        </div>
    );
};
export default PostModify;