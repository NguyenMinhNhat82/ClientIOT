import { useEffect, useRef, useState } from "react";
import { Table } from "react-bootstrap"
import cookie from 'react-cookies';
import Apis, { endpoints } from "../configs/Apis";
import { setGlobalState, useGlobalState } from "..";
import MySpinner from "../layouts/Spinner";
import ExpiredAdmin from "../pages/ExpiredAdmin";


export default function DataMinMax(id) {

    const listener = useGlobalState('message')[0];
    const [data, setData] = useState();
    const formatdDte = (e) => {
        if(e!=null)
            return `Date:${e.split("T")[0]}, Time${e.split("T")[1]}`
        return ""
    }
    const displayDate = (date) => {
        const dateArr = date.split("-");
        return `${dateArr[2]}-${dateArr[1]}-${dateArr[0]}`
    }
    useEffect(() => {
        const process = async () => {
            // Only set data to null if listener has changed
            if (prevListener.current !== listener) {
                setData(null);
            }
            
            const res = await Apis.post(`${endpoints.allMinMax}/${id.id}`,
                {
                    "date": `${id.dateValue}`,
                },
                {
                    headers: {
                        Authorization: `Bearer ${cookie.load('token')}`,
                    },
                });
    
            if (res.data === '') {
                setGlobalState('isAuthorized', false);
            } else {
                setData(res.data.sensorMinMaxes)
            }
    
            // Update the previous listener value
            prevListener.current = listener;
        }
        process();
    
    }, [listener, id]);
    
    // Define a ref to store the previous value of listener
    const prevListener = useRef();
    

    const isAuthorized = useGlobalState('isAuthorized')[0];
    if (isAuthorized === false) {
        return (
            <>
                <ExpiredAdmin />
            </>
        );
    }
    if (data == null) {
        return (
            <div className="text-center">
                <MySpinner />
            </div>
        )
    }
    return (<>
        <div>
            {/* <h2>Max of all sensor in {date}</h2> */}
            <h2 className="text-center">Max of all sensors at {displayDate(id.dateValue)}</h2>
            <Table striped bordered hover style={{ marginTop: "50px" }}>
                <thead>

                    <tr>
                        <th>#</th>
                        <th>00</th>
                        <th>01</th>
                        <th>02</th>
                        <th>03</th>
                        <th>04</th>
                        <th>05</th>
                        <th>06</th>
                        <th>07</th>
                        <th>08</th>
                        <th>09</th>
                        <th>10</th>
                        <th>11</th>
                        <th>12</th>
                        <th>13</th>
                        <th>14</th>
                        <th>15</th>
                        <th>16</th>
                        <th>17</th>
                        <th>18</th>
                        <th>19</th>
                        <th>20</th>
                        <th>21</th>
                        <th>22</th>
                        <th>23</th>

                    </tr>
                </thead>
                <tbody>

                    {data.map((element) => {
                        return (
                            <tr>
                                <td>{element.sensor}</td>
                                <td  title={`Data max at: ${formatdDte(element.data[0].maxAt)}`}>{element.data[0].max}</td>
                                <td title={`Data max at: ${formatdDte(element.data[1].maxAt)}`}>{element.data[1].max}</td>
                                <td title={`Data max at: ${formatdDte(element.data[2].maxAt)}`}>{element.data[2].max}</td>
                                <td title={`Data max at: ${formatdDte(element.data[3].maxAt)}`}>{element.data[3].max}</td>
                                <td title={`Data max at: ${formatdDte(element.data[4].maxAt)}`}>{element.data[4].max}</td>
                                <td title={`Data max at: ${formatdDte(element.data[5].maxAt)}`}>{element.data[5].max}</td>
                                <td title={`Data max at: ${formatdDte(element.data[6].maxAt)}`}>{element.data[6].max}</td>
                                <td title={`Data max at: ${formatdDte(element.data[7].maxAt)}`}>{element.data[7].max}</td>
                                <td title={`Data max at: ${formatdDte(element.data[8].maxAt)}`}>{element.data[8].max}</td>
                                <td title={`Data max at: ${formatdDte(element.data[9].maxAt)}`}>{element.data[9].max}</td>
                                <td title={`Data max at: ${formatdDte(element.data[10].maxAt)}`}>{element.data[10].max}</td>
                                <td title={`Data max at: ${formatdDte(element.data[11].maxAt)}`}>{element.data[11].max}</td>
                                <td title={`Data max at: ${formatdDte(element.data[12].maxAt)}`}>{element.data[12].max}</td>
                                <td title={`Data max at: ${formatdDte(element.data[13].maxAt)}`}>{element.data[13].max}</td>
                                <td title={`Data max at: ${formatdDte(element.data[14].maxAt)}`}>{element.data[14].max}</td>
                                <td title={`Data max at: ${formatdDte(element.data[15].maxAt)}`}>{element.data[15].max}</td>
                                <td title={`Data max at: ${formatdDte(element.data[16].maxAt)}`}>{element.data[16].max}</td>
                                <td title={`Data max at: ${formatdDte(element.data[17].maxAt)}`}>{element.data[17].max}</td>
                                <td title={`Data max at: ${formatdDte(element.data[18].maxAt)}`}>{element.data[18].max}</td>
                                <td title={`Data max at: ${formatdDte(element.data[19].maxAt)}`}>{element.data[19].max}</td>
                                <td title={`Data max at: ${formatdDte(element.data[20].maxAt)}`}>{element.data[20].max}</td>
                                <td title={`Data max at: ${formatdDte(element.data[21].maxAt)}`}>{element.data[21].max}</td>
                                <td title={`Data max at: ${formatdDte(element.data[22].maxAt)}`}>{element.data[22].max}</td>
                                <td title={`Data max at: ${formatdDte(element.data[23].maxAt)}`}>{element.data[23].max}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            <br /><br />

            {/* <h2>Min of all sensor in {date}</h2> */}
            <h2 className="text-center">Min of all sensors at {displayDate(id.dateValue)}    </h2>
            <Table striped bordered hover style={{ marginTop: "50px" }}>
                <thead>

                    <tr>
                        <th>#</th>
                        <th>00</th>
                        <th>01</th>
                        <th>02</th>
                        <th>03</th>
                        <th>04</th>
                        <th>05</th>
                        <th>06</th>
                        <th>07</th>
                        <th>08</th>
                        <th>09</th>
                        <th>10</th>
                        <th>11</th>
                        <th>12</th>
                        <th>13</th>
                        <th>14</th>
                        <th>15</th>
                        <th>16</th>
                        <th>17</th>
                        <th>18</th>
                        <th>19</th>
                        <th>20</th>
                        <th>21</th>
                        <th>22</th>
                        <th>23</th>

                    </tr>
                </thead>
                <tbody>

                    {data.map((element) => {
                        return (
                            <>
                            <tr>
                                <td>{element.sensor}</td>    
                                <td title={`Data min at: ${formatdDte(element.data[0].minAt)}`}>{element.data[0].min}</td>
                                <td title={`Data min at: ${formatdDte(element.data[1].minAt)}`}> {element.data[1].min}</td>
                                <td title={`Data min at: ${formatdDte(element.data[2].minAt)}`}>{element.data[2].min}</td>
                                <td title={`Data min at: ${formatdDte(element.data[3].minAt)}`}>{element.data[3].min}</td>
                                <td title={`Data min at: ${formatdDte(element.data[4].minAt)}`}>{element.data[4].min}</td>
                                <td title={`Data min at: ${formatdDte(element.data[5].minAt)}`}>{element.data[5].min}</td>
                                <td title={`Data min at: ${formatdDte(element.data[6].minAt)}`}>{element.data[6].min}</td>
                                <td title={`Data min at: ${formatdDte(element.data[7].minAt)}`}>{element.data[7].min}</td>
                                <td title={`Data min at: ${formatdDte(element.data[8].minAt)}`}>{element.data[8].min}</td>
                                <td title={`Data min at: ${formatdDte(element.data[9].minAt)}`}> {element.data[9].min}</td>
                                <td title={`Data min at: ${formatdDte(element.data[10].minAt)}`}>{element.data[10].min}</td>
                                <td title={`Data min at: ${formatdDte(element.data[11].minAt)}`}>{element.data[11].min}</td>
                                <td title={`Data min at: ${formatdDte(element.data[12].minAt)}`}>{element.data[12].min}</td>
                                <td title={`Data min at: ${formatdDte(element.data[13].minAt)}`}>{element.data[13].min}</td>
                                <td title={`Data min at: ${formatdDte(element.data[14].minAt)}`}>{element.data[14].min}</td>
                                <td title={`Data min at: ${formatdDte(element.data[15].minAt)}`}>{element.data[15].min}</td>
                                <td title={`Data min at: ${formatdDte(element.data[16].minAt)}`}>{element.data[16].min}</td>
                                <td title={`Data min at: ${formatdDte(element.data[17].minAt)}`}>{element.data[17].min}</td>
                                <td title={`Data min at: ${formatdDte(element.data[18].minAt)}`}>{element.data[18].min}</td>
                                <td title={`Data min at: ${formatdDte(element.data[19].minAt)}`}>{element.data[19].min}</td>
                                <td title={`Data min at: ${formatdDte(element.data[20].minAt)}`}>{element.data[20].min}</td>
                                <td title={`Data min at: ${formatdDte(element.data[21].minAt)}`}>{element.data[21].min}</td>
                                <td title={`Data min at: ${formatdDte(element.data[22].minAt)}`}>{element.data[22].min}</td>
                                <td title={`Data min at: ${formatdDte(element.data[23].minAt)}`}>{element.data[23].min}</td>
                            </tr>
                            </>
                            
                        );
                    })}
                </tbody>
            </Table>
        </div>

    </>)
}