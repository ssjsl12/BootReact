import React, {useEffect, useState} from "react";
import './css/scrap.css';
import axios from "axios";
import {useNavigate} from "react-router-dom";

const MyGall = ({isAuthenticated}) =>
{
    const [data, setData] = useState(null); // 서버에서 받아온 데이터
    const [loading, setLoading] = useState(true); // 로딩 상태
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {

            try {

                if(!isAuthenticated) {
                    navigate("/loginForm");
                    return;
                }
                setLoading(true);
                const response = await axios.get(`/scrap/post`)
                setData(response.data); // API 데이터 설정

            } catch (err) {
                console.error("Error fetching data:", err);

            } finally {
                setLoading(false);
            }
        };

        fetchData();
    },[]);


    const handlePostClick = (no , category , galleryId) => {
        /*navigate(`/${category}/${galleryId}/detail/${no}`);*/ // 게시글 상세 페이지로 이동

        axios
            .get(`/scrapViewPost`, { params: { no, category , galleryId } }) // 서버로 중복 확인 요청
            .then((response) => {
                navigate(response.data);
            })
            .catch((error) => {

            });

    };
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString(); // 로컬 시간 형식으로 변환
    };

    if (loading) {
        return <p>Loading...</p>; // 로딩 중일 때 메시지 표시
    }

    return (
        <div className="scrap-list">
            <div className="scrap-header">
                <span className="post-title">제목</span>
                <span className="post-author">작성자</span>
                <span className="post-date">업데이트 시간</span>
                <span className="post-views">조회수</span>
                <span className="post-best">추천수</span>
            </div>
            {data && data.length > 0 ? (
                data.map(p => (
                    <div
                        onClick={() => handlePostClick(p.id , p.category, p.galleryId)}
                        className="post-item"// 클릭 시 해당 게시글 상세 페이지로 이동
                    >
                        <span className="post-title">{p.postTitle}</span>
                        <span className="post-author">{p.author}</span>
                        <span className="post-date">{formatDate(p.postDate)}</span>
                        <span className="post-views">{p.views}</span>
                        <span className="post-views">{p.recommends}</span>
                    </div>
                ))
            ) : (
                <p>No posts available</p> // 게시글이 없을 때 표시할 메시지
            )}

        </div>
    )


}

export default MyGall;