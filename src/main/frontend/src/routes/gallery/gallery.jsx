import axios from "axios";
import React, { useEffect, useState } from 'react';
import './css/gallery.css'; // CSS 파일 import

const Gallery = (props) => {
    const [categories, setCategories] = useState([]);
    const [galleries, setGalleries] = useState([]);

    useEffect(() => {
        // galleryType이 'gallery'인 카테고리 가져오기
        axios.get('/categories/gallery', { withCredentials: true })
            .then(res => {
                setCategories(res.data); // 카테고리 목록 저장
            })
            .catch(err => console.error(err));

        // 모든 갤러리 가져오기 (모든 카테고리에 속하는 갤러리들)
        axios.get('/galleries', { withCredentials: true })
            .then(res => {
                setGalleries(res.data); // 갤러리 목록 저장
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="container">
            <h1 style={{margin: '10px'}}>Gallery Categories</h1>
            <ul>
                {categories.map((category) => (
                    <li key={category.no}>
                        <h3>{category.cateName}</h3>

                        {/* 해당 카테고리에 속하는 갤러리만 필터링해서 표시 */}
                        <div className="gallery-list">
                            {galleries
                                .filter((gallery) => gallery.category.no === category.no) // 카테고리 번호가 일치하는 갤러리 필터링
                                .map((gallery) => (
                                    <div key={gallery.no} className="gallery-item">
                                        {gallery.galleryName}
                                    </div>
                                ))}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Gallery;
