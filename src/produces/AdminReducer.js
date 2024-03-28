
import cookie from "react-cookies";
import Cookies from "js-cookie";
import { setGlobalState } from "..";



const AdminReducer = (currentState, action) => {
  switch (action.type) {
    case "login":
      return action.payload;
    case "logout": {
      setGlobalState("isAuthorized", false)
      // cookie.remove("token");
      // cookie.remove("user");

      cookie.remove("token");
      cookie.remove("user");
      cookie.save("user", "");
      cookie.save("token", "")
      setGlobalState("user", null);
      return null;
    }
    default:
      return currentState;
  }


};

export default AdminReducer;
