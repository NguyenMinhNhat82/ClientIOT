import { Link, useNavigate } from "react-router-dom"
import "./Expired.css"
import { useContext } from "react";
import { MyUserContext } from "../App";


export default function Expired() {
    const [user, dispatch] = useContext(MyUserContext); 
    const navigate = useNavigate();
    return (<>
        <div id="notfound1">
            <div className="notfound1">
                <div className="notfound-404">
                    <h1>Oops!</h1>
                    <h2>Phiên đăng nhập hết hạn</h2>
                </div>

                <button onClick={() => {
                    dispatch({
                        "type": "logout"
                    }
                    )
                    navigate("/login")
                }} className="login">Đăng nhập</button>
            </div>
        </div>
    </>)
}