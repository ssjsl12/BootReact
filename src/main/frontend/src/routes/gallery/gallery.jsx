import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './css/gallery.css';

const Gallery = () => {
    const { category } = useParams(); // URL 파라미터에서 category 가져오기
    const navigate = useNavigate(); // 디테일 페이지로 이동할 때 사용

    const [categories, setCategories] = useState([]);
    const [galleries, setGalleries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // 에러 상태 추가

    // 데이터 가져오기
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null); // 초기화

            try {
                // 카테고리 데이터와 갤러리 데이터를 동시에 가져오기
                const [categoriesRes, galleriesRes] = await Promise.all([
                    axios.get(`/category/${category}`, { withCredentials: true }),
                    axios.get(`/galleries/${category}`, { withCredentials: true }),
                ]);

                setCategories(categoriesRes.data);
                setGalleries(galleriesRes.data);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("데이터를 불러오는 데 실패했습니다. 다시 시도해주세요.");
            } finally {
                setLoading(false);
            }
        };

        if (category) {
            fetchData();
        }
    }, [category]); // category 값 변경 시 데이터 다시 로드

    // 로딩 상태 처리
    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    // 에러 상태 처리
    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="container">
           {/* <h1 style={{ margin: '10px' }}>Gallery: {category}</h1>*/}
            {/* 카테고리별 갤러리 리스트 */}
            {categories.map((cat) => {
                // 현재 카테고리와 연결된 갤러리 필터링
                const filteredGalleries = galleries.filter(
                    (gallery) => gallery.category.no === cat.no
                );

                return (
                    <div key={cat.no} className="category-section">
                        <h2>{cat.cateName}</h2>
                        <div className="gallery-list">
                            {filteredGalleries.map((gallery) => (
                                <div
                                    key={gallery.no}
                                    className="gallery-item"
                                    onClick={() => navigate(`/gallery/${category}/${gallery.url}`)} // 클릭 시 디테일 페이지로 이동
                                >
                                    <h3>{gallery.galleryKorName}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Gallery;
