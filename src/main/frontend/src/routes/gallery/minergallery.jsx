import axios from "axios";
import React, {useEffect, useState} from 'react';

const Minergallery = (props) => {

    const [data, setData] = useState('')

    useEffect(() =>
    {
        axios.get('/test', { withCredentials: true })
            .then(res => {
                setData(res.data);  // 상태에 응답 데이터 저장
            })
            .catch(err => console.error(err));
    },[]);


    return (
        <>
            <h1>This Miner</h1>
        </>
    );
};

export default Minergallery;
