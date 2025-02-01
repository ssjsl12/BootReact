import axios from "axios";
import {useNavigate} from "react-router-dom";
import './css/main.css';
import React, {useEffect, useState} from "react";

const Main = () =>
{
        //실시간 베스트

    const [data, setData] = useState(null); // 서버에서 받아온 데이터
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 번호
    const navigate = useNavigate(); // navigate 함수 선언

    useEffect(() => {
        const fetchData = async () => {

            try {
                setLoading(true);
                const response = await axios.get(`/best/post/${currentPage}`)
                setData(response.data); // API 데이터 설정
            } catch (err) {
                console.error("Error fetching data:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    },[]);

    const handlePostClick = (no) => {
        console.log(no);
        navigate(`gallery/best/detail/${no.id}`); // 게시글 상세 페이지로 이동
    };
    if (loading) {
        return <p>Loading...</p>; // 로딩 중일 때 메시지 표시
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString(); // 로컬 시간 형식으로 변환
    };


    const handlePageChange = (newPage) => {

        setCurrentPage(newPage); // 페이지 변경
    };


    return(

        <div className="best-group">
            <h1 className="real-time-group">
               실시간 베스트
            </h1>

            <div className="post-list">
                <div className="post-item-header">
                    <span className="post-no">번호</span>
                    <span className="post-title">제목</span>
                    <span className="post-author">작성자</span>
                    <span className="post-date">업데이트 시간</span>
                    <span className="post-views">조회수</span>
                    <span className="post-best">추천수</span>
                </div>
                {data.content && data.content.length > 0 ? (
                    data.content.map(p => (
                        <div
                            key={p.id}
                            className="post-item"
                            onClick={() => handlePostClick(p)} // 클릭 시 해당 게시글 상세 페이지로 이동
                        >
                            <span className="post-no">{p.id}</span>
                            <span className="post-title">{p.title}({p.comments.length})</span>
                            <span className="post-author">{p.author}</span>
                            <span className="post-date">{formatDate(p.updateTime)}</span>
                            <span className="post-views">{p.views}</span>
                            <span className="post-views">{p.recommend}</span>
                        </div>
                    ))
                ) : (
                    <p>No posts available</p> // 게시글이 없을 때 표시할 메시지
                )}

            </div>

            {/*페이징처리*/}
            <div className="pagination">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={data.first}
                >
                    이전
                </button>

                {/* 동적으로 페이지 번호 생성 */}
                {Array.from({length: data.totalPages}, (_, index) => {
                    const startPage = Math.max(currentPage - 1, 0); // 시작 범위 (최소 0)
                    const endPage = Math.min(currentPage + 1, data.totalPages - 1); // 끝 범위 (최대 totalPages - 1)

                    if (index < startPage || index > endPage) {
                        // 범위 밖 페이지는 표시하지 않음
                        if (index === 0 || index === data.totalPages - 1) {
                            return (
                                <span key={index} className="ellipsis">  ...  </span>
                            );
                        }
                        return null;
                    }

                    return (
                        <button
                            key={index}
                            onClick={() => handlePageChange(index)}
                            className={index === currentPage ? "active" : ""}
                        >
                            {index + 1}
                        </button>
                    );
                })}

                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={data.last}
                >
                    다음
                </button>
            </div>


        </div>
    )

}

export default Main;