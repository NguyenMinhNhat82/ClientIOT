import { useEffect, useState } from "react";
import { Table } from "react-bootstrap"
import cookie from 'react-cookies';
import Apis, { endpoints } from "../configs/Apis";
import { setGlobalState, useGlobalState } from "..";
import MySpinner from "../layouts/Spinner";
import ExpiredAdmin from "../pages/ExpiredAdmin";


export default function DataMinMax(id) {

    const listener = useGlobalState('message')[0];
    const [data, setData] = useState();
    const displayDate = (date) => {
        const dateArr = date.split("-");
        return `${dateArr[2]}-${dateArr[1]}-${dateArr[0]}`
    }
    useEffect(() => {
        const process = async () => {
            setData(null)
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



        }
        process();

    }, [listener, id]);
    console.log(data)

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
                        <th>09</th>
                        <th>9</th>
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
                                <td>{element.data[0].max}</td>
                                <td>{element.data[1].max}</td>
                                <td>{element.data[2].max}</td>
                                <td>{element.data[3].max}</td>
                                <td>{element.data[4].max}</td>
                                <td>{element.data[5].max}</td>
                                <td>{element.data[6].max}</td>
                                <td>{element.data[7].max}</td>
                                <td>{element.data[8].max}</td>
                                <td>{element.data[9].max}</td>
                                <td>{element.data[10].max}</td>
                                <td>{element.data[11].max}</td>
                                <td>{element.data[12].max}</td>
                                <td>{element.data[13].max}</td>
                                <td>{element.data[14].max}</td>
                                <td>{element.data[15].max}</td>
                                <td>{element.data[16].max}</td>
                                <td>{element.data[17].max}</td>
                                <td>{element.data[18].max}</td>
                                <td>{element.data[19].max}</td>
                                <td>{element.data[20].max}</td>
                                <td>{element.data[21].max}</td>
                                <td>{element.data[22].max}</td>
                                <td>{element.data[23].max}</td>
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
                        <th>09</th>
                        <th>9</th>
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
                                <td>{element.data[0].min}</td>
                                <td>{element.data[1].min}</td>
                                <td>{element.data[2].min}</td>
                                <td>{element.data[3].min}</td>
                                <td>{element.data[4].min}</td>
                                <td>{element.data[5].min}</td>
                                <td>{element.data[6].min}</td>
                                <td>{element.data[7].min}</td>
                                <td>{element.data[8].min}</td>
                                <td>{element.data[9].min}</td>
                                <td>{element.data[10].min}</td>
                                <td>{element.data[11].min}</td>
                                <td>{element.data[12].min}</td>
                                <td>{element.data[13].min}</td>
                                <td>{element.data[14].min}</td>
                                <td>{element.data[15].min}</td>
                                <td>{element.data[16].min}</td>
                                <td>{element.data[17].min}</td>
                                <td>{element.data[18].min}</td>
                                <td>{element.data[19].min}</td>
                                <td>{element.data[20].min}</td>
                                <td>{element.data[21].min}</td>
                                <td>{element.data[22].min}</td>
                                <td>{element.data[23].min}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>

    </>)
}