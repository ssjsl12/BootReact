import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';  // URL 파라미터를 사용하기 위한 useParams
import axios from "axios";

const GalleryDetail = () => {
    const { galleryId } = useParams();  // URL에서 galleryId 추출
    const [gallery, setGallery] = useState(null);

    useEffect(() => {
        // 갤러리 상세 정보를 가져옵니다.
        axios.get(`/gallery/${galleryId}`)
            .then(res => setGallery(res.data))
            .catch(err => console.error(err));
    }, [galleryId]);

    if (!gallery) {
        return <div>Loading...</div>;
    }

    return (
        <div className="gallery-detail">
            <h1>{gallery.galleryName}</h1>
            <p>{gallery.description}</p>
            {/* 갤러리 상세 정보 추가 */}
        </div>
    );
};

export default GalleryDetail;