import React from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBCardHeader,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import './tracker.css'
import { Button } from "react-bootstrap";


export default function Tracker( props ) {
    var details = props.details;
    console.log(details);
    function formatDate(inputDate) {
        const [year, month, day] = inputDate.split('-');
        const date = new Date(year, month - 1, day); 
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
        return formattedDate;
    }
    return (
        <section className="vh-100" id="track-wrapper">
            <MDBContainer className="py-5 h-100">
            <MDBRow className="justify-content-center align-items-center h-100">
                <MDBCol>
                <MDBCard
                    className="card-stepper"
                    style={{ borderRadius: "10px" }}
                >
                    <MDBCardBody className="p-4">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex flex-column">
                        {details.status == 0 && <span className="lead fw-normal">
                                                    Order has been completed
                                                </span>}
                        {details.status == 1 && <span className="lead fw-normal">
                                                    Order is in progress
                                                </span>}
                        {details.status == 2 && <span className="lead fw-normal">
                                                    Order has been reversed
                                                </span>}
                        {details.status == 3 && <span className="lead fw-normal">
                                                    Order has been failed
                                                </span>}
                        
                        <span className="text-muted small">
                            Merchant - {details.merchant}
                        </span>
                        </div>
                        <div>
                        <Button variant="outline-danger" onClick={props.handleDetails}>Close</Button>
                        </div>
                    </div>

                    <hr className="my-4" />

                    {/* Completed */}
                    {details.status === 0 && 
                    <>
                        <div className="d-flex flex-row justify-content-between align-items-center align-content-center">
                            <span className="dot"></span>
                            <hr className="flex-fill track-line" />
                            <span className="dot"></span>
                            <hr className="flex-fill track-line" />
                            <span className="d-flex justify-content-center align-items-center big-dot dot">
                            <MDBIcon icon="check text-white" />
                            </span>
                        </div>

                        <div className="d-flex flex-row justify-content-between align-items-center">
                            <div className="d-flex flex-column align-items-start">
                            <span>{formatDate(details.initiated.slice(0,10))}</span>
                            <span>Placed</span>
                            </div>
                            <div className="d-flex flex-column align-items-center">
                            <span>{formatDate(details.est_settlement.slice(0,10))}</span>
                            <span>Expected</span>
                            </div>
                            <div className="d-flex flex-column align-items-end">
                            <span>{formatDate(details.completed.slice(0,10))}</span>
                            <span>Completed</span>
                            </div>
                        </div>
                    </>}


                    {/* In progress case */}
                    {details.status === 1 && 
                    <>
                        <div className="d-flex flex-row justify-content-between align-items-center align-content-center">
                            {(details.est_settlement === null) ? <span className="d-flex justify-content-center align-items-center big-dot dot"></span>:<span className="dot"></span>}
                            {!(details.est_settlement === null) && 
                            <>
                                <hr className="flex-fill track-line" />
                                <span className="d-flex justify-content-center align-items-center big-dot dot"></span>
                            </>}
                        </div>

                        <div className="d-flex flex-row justify-content-between align-items-center">
                            <div className="d-flex flex-column align-items-start">
                            <span>{formatDate(details.initiated.slice(0,10))}</span>
                            <span>Placed</span>
                            </div>
                            {details.est_settlement && 
                                <div className="d-flex flex-column justify-content-center">
                                <span>{formatDate(details.est_settlement.slice(0,10))}</span>
                                <span>Expected</span>
                                </div>
                            }   
                        </div>
                    </>}



                    {/* reversal case */}
                    {details.status === 2 && 
                    <>
                        <div className="d-flex flex-row justify-content-between align-items-center align-content-center">
                            <span className="dot"></span>
                            <hr className="flex-fill track-line" />
                            <span className="dot"></span>
                            <hr className="flex-fill track-line" />
                            <span className="dot"></span>
                            <hr className="flex-fill track-line" />
                            
                            {details.rev_completed === null ? 
                                <>
                                <span className="d-flex justify-content-center align-items-center big-dot dot"></span> 
                                <hr className="flex-fill track-line-n" />
                                </>
                                : 
                                <>
                                <span className="dot"></span>
                                <hr className="flex-fill track-line" />
                                </>}   
                                
                            {details.rev_completed === null ? 
                                <span className="dot-n"></span> 
                                : 
                                <span className="d-flex justify-content-center align-items-center big-dot dot">
                                    <MDBIcon icon="check text-white" />
                                </span>}   
                        </div>

                        <div className="d-flex flex-row justify-content-between align-items-center">
                            <div className="d-flex flex-column align-items-start">
                            <span>{formatDate(details.initiated.slice(0,10))}</span>
                            <span>Placed</span>
                            </div>
                            <div className="d-flex flex-column justify-content-center">
                            <span>{formatDate(details.est_settlement.slice(0,10))}</span>
                            <span>Expected</span>
                            </div>
                            <div className="d-flex flex-column justify-content-center align-items-center">
                            <span>{formatDate(details.completed.slice(0,10))}</span>
                            <span>Received</span>
                            </div>
                            <div className="d-flex flex-column align-items-center">
                            <span>{formatDate(details.rev_settlement.slice(0,10))}</span>
                            <span>Return Request</span>
                            </div>
                            <div className="d-flex flex-column align-items-end">
                            {!(details.rev_completed === null) && <span>{formatDate(details.rev_completed.slice(0,10))}</span>}
                            <span>Return Completed</span>
                            </div>
                        </div>
                    </>}

                    {/* failed */}
                    {details.status === 3 && 
                    <>
                        <div className="d-flex flex-row justify-content-between align-items-center align-content-center">
                            <span className="dot"></span>
                            <hr className="flex-fill track-line" />
                            <span className="d-flex justify-content-center align-items-center big-dot-n dot-n">
                            <MDBIcon icon="check text-white" />
                            </span>
                        </div>

                        <div className="d-flex flex-row justify-content-between align-items-center">
                            <div className="d-flex flex-column align-items-start">
                            <span>{formatDate(details.initiated.slice(0,10))}</span>
                            <span>Placed</span>
                            </div>
                            <div className="d-flex flex-column align-items-end">
                            <span>Failed</span>
                            </div>
                        </div>
                    </>}

                    </MDBCardBody>
                </MDBCard>
                </MDBCol>
            </MDBRow>
            </MDBContainer>
        </section>
    );
}