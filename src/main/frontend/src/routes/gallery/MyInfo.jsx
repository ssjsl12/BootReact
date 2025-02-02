import {useNavigate} from "react-router-dom";
import {useEffect} from "react";


const MyInfo = ({isAuthenticated}) =>
{
    const navigate = useNavigate();  // useNavigate 훅 사용

    useEffect(() => {

      /*  if(!isAuthenticated)
        {
            navigate("/login");
            return;
        }
        */



    })

    return (

        <div className="my-info">




        </div>


    );


}


export  default  MyInfo