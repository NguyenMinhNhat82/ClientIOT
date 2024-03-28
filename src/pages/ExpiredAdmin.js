import { Link, useNavigate } from "react-router-dom"
import "./Expired.css"
import { useContext } from "react";
import { AdminContext, MyUserContext } from "../App";


export default function ExpiredAdmin() {
    const [user, dispatch] = useContext(AdminContext); 
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
                    navigate("/admin/login")
                }} className="login">Đăng nhập</button>
            </div>
        </div>
    </>)
}