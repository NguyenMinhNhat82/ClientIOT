
import cookie from "react-cookies";
import { setGlobalState, useGlobalState } from "..";
import Apis, { endpoints } from "../configs/Apis";




const DataReducer = (currentState, action) => {

    const loaddata = async () => {
        const res = await Apis.get(endpoints.loaddata, {
            headers: {
                Authorization: `Bearer ${cookie.load("token")}`,
            },
        }
        )
        
        const map = new Map()
        if (res.data === '') {
            setGlobalState("isAuthorized", false)
            
        }
        else {
            map.set("1", res.data.station1);
            map.set("2", res.data.station2);
            map.set("3", res.data.station3);
            map.set("4", res.data.station4);
            map.set("5", res.data.station5);
            setGlobalState("data", map);
            
        }
        
    }

    const historyOFStation1 = async () =>{
        const res = await Apis.get(endpoints.historyOFStation1, {
            headers: {
                Authorization: `Bearer ${cookie.load("token")}`,
            },
        }
        )
        if (res.data === '') {
            setGlobalState("isAuthorized", false)
        
        }
        else {
            setGlobalState("station1",res.data)
            
        }
    }
    switch (action.type) {
        case "reset":
            loaddata();
            historyOFStation1();
            return currentState;
        default:
            return currentState;
    }


};
export default DataReducer;