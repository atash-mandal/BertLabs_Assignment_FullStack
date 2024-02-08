import React, { useEffect, useState } from 'react'
import { Row, Col, Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Tracker from './tracker';
import './home.css'

function Home({data, searchedData, setSearchedData}) {
    const [noRes, setNoRes] = useState('none');
    const [mainTable, setMainTable] = useState('block');
    const [showDetails, setShowDetails] = useState(false);
    const [trackData, setTrackData] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [startAmount, setStartAmount] = useState('');
    const [endAmount, setEndAmount] = useState('');
    
    const handleSearch = () =>{
        var search_name = []
        var search_amount = []
        var name_flag = true
        var amount_flag = true

        if (inputValue.length != 0){
            data.forEach((row) => {
                if((row.merchant.toLowerCase()).includes(inputValue.toLowerCase())) {
                    search_name.push(row);
                }
            });
        }
        else{
            search_name = data;
            name_flag = false;
        }
        
        if(parseInt(startAmount) != NaN && parseInt(endAmount) != NaN && parseInt(startAmount) <= parseInt(endAmount)){
            data.forEach((row) => {
                if(parseInt(startAmount) <= parseInt(row.amount) && parseInt(row.amount) <= parseInt(endAmount)){
                    search_amount.push(row);
                }
            });
        }
        else{
            search_amount = data;
            amount_flag = false;
        }

        const filtered_data = search_name.filter(value => search_amount.includes(value));

        if(name_flag || amount_flag){
            setSearchedData(filtered_data);
            if(filtered_data.length == 0){
                console.log("TRRRRRRR")
                setMainTable('none');
                setNoRes('block');
            }
            else{
                setMainTable('block');
                setNoRes('none');
            }
        }
        else{
            setSearchedData(data);
            setMainTable('block');
            setNoRes('none');
        }
    }

    const handleDetails = (details) => {
        console.log("clicked.....");
        setTrackData(details);
        setShowDetails(!showDetails);
    }

    const handleStartAmountChange = (event) => {
        setStartAmount(event.target.value.trim());
    };

    const handleEndAmountChange = (event) => {
        setEndAmount(event.target.value.trim());
    };
    const handleInputChange = (event) => {
        setInputValue(event.target.value.trim());
    };

    const getUpdatedDate = (details) => {
        if(!(details.rev_completed === null))
            return details.rev_completed
        if(!(details.rev_settlement === null))
            return details.rev_settlement
        if(!(details.completed === null))
            return details.completed
        if(!(details.est_settlement === null))
            return details.est_settlement
        return details.initiated
    }

    const getStatus = (status) => {
        if(status === 0)
            return <td style={{color: "green"}}>completed</td>;
        if(status === 1)
            return <td style={{color: "orange"}}>in progress</td>;
        if(status === 2)
            return <td style={{color: "purple"}}>return</td>;
        return <td style={{color: "red"}}>failed</td>;
    }


    return ( data === null ? 
        <Container>Loading...</Container>
                    :
        <Container className="home-container">

            {/* show details */}
            {showDetails && <Tracker handleDetails = {handleDetails} details = {trackData}/>}

            {/* Filter */}
            <Container className='filter-container'>
                <Row>
                    <Col lg={4} md={4} sm={12} className='filter-text-wrapper'>
                        <div className='filter-text-container'>
                            <p>Search by Merchant Name</p>
                            <input
                                type="text"
                                id="inputField"
                                className="input-field"
                                onChange={handleInputChange}
                                onKeyDown={(e)=>{if(e.key === 'Enter') handleSearch()}}
                                value={inputValue}
                            />
                        </div>
                    </Col>

                    <Col lg={6} md={8} sm={12}>
                        <div className='amount-range-text'>
                            <p>Set a Amount range for the transactions</p>
                        </div>
                        <Row>
                            <Col sm={12} md={6} lg={6}>
                                <Row className='amount-start'>
                                    <Col>From:</Col>
                                    <Col>
                                        <input
                                            type="text"
                                            id="start-amount"
                                            className="amount"
                                            value={startAmount}
                                            onChange={handleStartAmountChange}
                                            onKeyDown={(e)=>{if(e.key === 'Enter') handleSearch()}}
                                        />
                                    </Col>
                                </Row>
                            </Col>

                            <Col sm={12} md={6} lg={6}>
                                <Row className='amount-end'>
                                    <Col>To:</Col>
                                    <Col>
                                        <input
                                            type="text"
                                            id="end-amount"
                                            className="amount"
                                            value={endAmount}
                                            onChange={handleEndAmountChange}
                                            onKeyDown={(e)=>{if(e.key === 'Enter') handleSearch()}}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col sm={12} md={12} lg={2} className='button-col'>
                        <div className='button-container'>
                            <Button variant="dark" className='filter-button' onClick={handleSearch}>Filter</Button>
                        </div>
                    </Col>
                </Row>
            </Container>

            {/* Table */}
            <Container className="table-container" style={{ display: noRes }}>
                <div>
                    No Results found.
                </div>
            </Container>

            <Container className="table-container" style={{ display: mainTable }}>
                <table className="custom-table">
                <thead>
                    <tr>
                    <th>Transaction ID</th>
                    <th>Merchant Name</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Initiated At</th>
                    <th>Last Updated At</th>
                    </tr>
                </thead>
                <tbody className='table-body'>
                    {searchedData.map((row) => (
                    <tr key={row.id}>
                        <td className='table-data' onClick={() => handleDetails(row)} >{row.id}</td>
                        <td className='table-data' >{row.merchant}</td>
                        <td className='table-data' >{row.amount}</td>
                        {getStatus(row.status)}
                        <td className='table-data' >{row.initiated.slice(0, 10)}</td>
                        <td className='table-data' >{getUpdatedDate(row).slice(0, 10)}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </Container>
        </Container> 
    );
}

export default Home
