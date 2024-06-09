import React from 'react';
import './Overlay.css'; // Import CSS file for styling
import { Spinner } from 'react-bootstrap';

function Overlay({ show, onClick, type }) {
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
      {type === "loading"?<>
        <div className="spinner-overlay">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
      </>:type === "success"?<>
      <div className="spinner-overlay"><div style={{"backgroundColor":"white", "width":"500px","height":"400px"}}>
      <img className='d-flex justify-content-center' style={{"width" :"150px", "position":"relative","left":"170px"}} src={"https://th.bing.com/th/id/OIP.5wR8PD0wKgtN34ngpVL6sgHaHw?rs=1&pid=ImgDetMain"} alt="Logo" />
        <div className='d-flex justify-content-center'>
            <h1>Success</h1>
        </div>
        <div className='d-flex'>
        <button style={{"width" :"150px", "position":"relative","left":"170px", "top" :"70px"}} onClick={onclick} type="button" className="btn btn-primary">OK</button>
        </div>
            </div>
            
            </div>
      </>:<>
      <div className="spinner-overlay"><div style={{"backgroundColor":"white", "width":"500px","height":"400px"}}>
      <img className='d-flex justify-content-center' style={{"width" :"150px", "position":"relative","left":"170px"}} src={"https://cdn-icons-png.flaticon.com/512/6659/6659895.png"} alt="Logo" />
        <div className='d-flex justify-content-center'>
            <h1>Fail</h1>
        </div>
        <div className='d-flex'>
        <button style={{"width" :"150px", "position":"relative","left":"170px", "top" :"70px"}} onClick={onclick} type="button" className="btn btn-primary">OK</button>
        </div>
            </div>
            
            </div>
      </>}
      </div>
    );
  }

export default Overlay;