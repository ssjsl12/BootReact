import {useNavigate} from "react-router-dom";
import axios from "axios";

const Logout = () =>
{

    const navigate = useNavigate();
    axios.post("/logout")
        .then((response) => {
            console.log(response);
            navigate("/gallery"); // 성공 시 React 라우트로 이동
            window.location.reload();
        })
        .catch((error) =>
        {
            console.log(error);
        })


}

export default Logout;