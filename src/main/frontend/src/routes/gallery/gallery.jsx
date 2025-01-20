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

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            setCategories([]); // 카테고리 변경 시 기존 카테고리 데이터 비우기
            setGalleries([]);  // 갤러리 변경 시 기존 갤러리 데이터 비우기

            // 로컬 스토리지에서 데이터 확인
            const cachedCategories = localStorage.getItem(`categories-${category}`);
            const cachedGalleries = localStorage.getItem(`galleries-${category}`);

            if (cachedCategories && cachedGalleries) {
                // 캐시된 데이터가 있다면 로컬 스토리지의 데이터를 사용
                setCategories(JSON.parse(cachedCategories));
                setGalleries(JSON.parse(cachedGalleries));
                setLoading(false); // 로딩 종료
            } else {
                // 캐시된 데이터가 없으면 API 호출
                try {
                    const [categoriesRes, galleriesRes] = await Promise.all([
                        axios.get(`/category/${category}`, { withCredentials: true }),
                        axios.get(`/galleries/${category}`, { withCredentials: true }),
                    ]);

                    // 데이터를 로컬 스토리지에 저장
                    localStorage.setItem(`categories-${category}`, JSON.stringify(categoriesRes.data));
                    localStorage.setItem(`galleries-${category}`, JSON.stringify(galleriesRes.data));

                    setCategories(categoriesRes.data);
                    setGalleries(galleriesRes.data);
                } catch (error) {
                    console.error("Error fetching data:", error);
                    setError("데이터를 불러오는 데 실패했습니다. 다시 시도해주세요.");
                } finally {
                    setLoading(false);
                }
            }
        };

        if (category) {
            fetchData();
        }
    }, [category]); // 카테고리 값이 변경될 때마다 데이터를 새로 요청


/*    localStorage.clear();*/

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
                // 현재 카테고ain/.리와 연결된 갤러리 필터링
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
                                    onClick={() => navigate(`/${category}/${gallery.url}`)} // 클릭 시 디테일 페이지로 이동
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
