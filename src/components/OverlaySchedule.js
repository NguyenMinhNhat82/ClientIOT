import React from 'react';
import './Overlay.css'; // Import CSS file for styling
import { Spinner } from 'react-bootstrap';
import { TimePicker } from '@mui/lab';


function OverlaySchedule({ show, onClick, id }) {
    if (!show) return null;
  
    return (
      <div
        className="overlay"
        role="presentation" // Indicates that the div is not interactive
        onClick={onClick}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            onClick(); // Dismiss the overlay when Escape key is pressed
          }
        }}
        {...(show ? { tabIndex: 0 } : {})} // Conditionally add tabIndex when show is true
      > 
       <div className="spinner-overlay"><div style={{"backgroundColor":"white", "width":"500px","height":"400px"}}>
        <button className='justify-content-end' style={{"padding":"5px", "backgroundColor":"red", "color":"white",
          "position":"relative", "float":"right"
        }} onClick={onclick}>X</button>
        <div className='d-flex justify-content-center'>
            <h1>Hẹn giờ</h1>
        </div>
        <input type='time'/>
        <div className='d-flex'>
        <button style={{"width" :"150px", "position":"relative","left":"170px", "top" :"70px"}} onClick={onclick} type="button" className="btn btn-primary">OK</button>
        </div>
            </div>
            
            </div>
      </div>
    );
  }

export default OverlaySchedule;