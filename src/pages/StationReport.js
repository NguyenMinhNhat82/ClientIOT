import { useEffect, useState } from "react";
import { Form, Table } from "react-bootstrap"
import { useParams } from "react-router-dom";
import { useGlobalState } from "..";
import Apis, { endpoints } from "../configs/Apis";
import DataMinMax from "../components/DataMinMax";


export default function StationReport() {

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
    const [date, setDate] = useState(formatDate());
    const path = useParams();

    const listener = useGlobalState('message')[0];
    return (<>
        <div className="App container" style={{ width: "300px", float: "left" }}>
            <Form.Control
                type="date"
                name="datepic"
                placeholder="DateRange"
                value={date}
                onChange={(e) => {
                    setDate(e.target.value)
                    console.log(e.target.value)
                }}
            />
        </div>
        <br /><br /><br />
        <DataMinMax id = {path.id} dateValue = {date}/>

    </>)
}