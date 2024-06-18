import { useEffect, useState } from "react";
import { Form, Table } from "react-bootstrap"
import { useParams } from "react-router-dom";
import { useGlobalState } from "..";
import Apis, { endpoints } from "../configs/Apis";
import DataMinMax from "../components/DataMinMax";
import DataMinMaxWeekInMonth from "../components/DataMinMaxWeekInMonth";
import DataMinMaxDayInWeek from "../components/DataMinMaxDayInWeek";



export default function StationReport() {

    const [type, setType] = useState(1);
    function formatDate() {
        const d = new Date();
        let month = `${(d.getMonth() + 1)}`;
        let day = `${d.getDate()}`;
        const year = d.getFullYear();

        if (month.length < 2)
            month = `0${month}`;
        if (day.length < 2)
            day = `0${day}`;
        return `${year}-${month}-${day}`
    }
    const path = useParams();

    const listener = useGlobalState('message')[0];
    return (<>
        <div className="d-flex">
        <button type="button" className="btn btn-light" onClick={() =>{setType(1)}}>Thống kê các ngày trong tháng</button>
        <button type="button" className="btn btn-light" onClick={() =>{setType(2)}}>Thống kê các tuần trong tháng</button>
        <button type="button" className="btn btn-light" onClick={() =>{setType(3)}}>Thống kê các ngày trong tuần</button>
        </div>
        <hr/>
        <br/>
        <br/>
        
        {type === 1?<>
            <DataMinMax id = {path.id}/>
        </>:type ===2?<>

        <DataMinMaxWeekInMonth id = {path.id}/>
        
        </>:<>
        <DataMinMaxDayInWeek id = {path.id}/>
        </>}
        

    </>)
}