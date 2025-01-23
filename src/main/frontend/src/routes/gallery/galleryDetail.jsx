import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // useNavigate 사용
import axios from "axios";
import './css/galleryDetail.css';

const GalleryDetail = () => {
    const { galleryId, category } = useParams();  // URL에서 galleryId 추출
    const navigate = useNavigate(); // navigate 함수 선언

    const [data, setData] = useState(null); // 서버에서 받아온 데이터
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [error, setError] = useState(null); // 에러 상태
    const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 번호

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/${category}/${galleryId}/${currentPage}`)
                setData(response.data); // API 데이터 설정
            } catch (err) {
                console.error("Error fetching data:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    },[category,currentPage]);

    if (loading) {
        return <p>Loading...</p>; // 로딩 중일 때 메시지 표시
    }

    if (error) {
        return <p>Error: {error.message}</p>; // 에러 발생 시 메시지 표시
    }

    if (!data || !data.content || data.content.length === 0) {
        return <p>No posts available.</p>; // 데이터가 없을 때 처리
    }

    const handlePageChange = (newPage) => {
        navigate(`/${category}/${galleryId}/${newPage}`);
        setCurrentPage(newPage); // 페이지 변경
    };


    const handleWriteClick = () => {
        navigate(`/${category}/${galleryId}/write`); // 글쓰기 페이지로 이동
    };

    const handlePostClick = (no) => {
        navigate(`/${category}/${galleryId}/detail/${no}`); // 게시글 상세 페이지로 이동
    };

    // 날짜 포맷을 더 읽기 쉽게 변환하는 함수
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString(); // 로컬 시간 형식으로 변환
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
                {data.content.map(p => (
                    <div
                        key={p.id}
                        className="post-item"
                        onClick={() => handlePostClick(p.id)} // 클릭 시 해당 게시글 상세 페이지로 이동
                    >
                        <span className="post-no">{p.id}</span>
                        <span className="post-title">{p.title}</span>
                        <span className="post-author">{p.author}</span>
                        <span className="post-date">{formatDate(p.updateTime)}</span>
                        <span className="post-views">{p.views}</span>
                    </div>
                ))}

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
    );


};

export default GalleryDetail;
