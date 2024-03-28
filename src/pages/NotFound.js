import { Link } from "react-router-dom"
import "./NotFound.css"
import cookie from "react-cookies";
import { useContext } from "react";
import { MyUserContext } from "../App";

export default function NotFound() {
    const current = cookie.load("user")
    const [user, dispatch] = useContext(MyUserContext);
    if(current !=null){
        dispatch({
            "type": "login",
            "payload": current
          });
    }
    return(<>
     <div id="notfound">
		<div className="notfound">
			<div className="notfound-404">
				<div/>
				<h1>404</h1>
			</div>
			<h2>Page not found</h2>
			<p>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
            <Link to={"/dashboard/app"}>home page</Link>
		</div>
	</div>
    </>)
   
}