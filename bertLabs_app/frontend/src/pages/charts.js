import { Row, Col, Container } from 'react-bootstrap';
import BarChartComponent from '../components/BarChartComponent';
import PieChartComponent from '../components/PieChartComponent';
import LineChartComponent from '../components/LineChartComponent';
import AreaChartComponent from '../components/AreaChartComponent';
import './charts.css';
import { useEffect, useState } from 'react';


function Charts({ chartData, colors }) {
    const [merchant, setMerchant] = useState(null);
    const [merchantName, setMerchantName] = useState("");

    useEffect(()=>{
        const fetchData = async() => {
            const name = merchantName;
            console.log("Clicked a merchant"+name)
            try {
                const response = await fetch(`http://localhost:5000/charts/${name}/`); // Replace URL with your endpoint
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json();
                setMerchant(jsonData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    },[merchantName]);

    

    return ( chartData === null ?
        <Container>Loading...</Container>
        :
        <Container className='chart-container'>
            <Row className='graph-header'>
                <span> Graphical representation of the data <hr/> </span>
            </Row>
            <Row className='charts-wrapper'>
                <Col md={12} lg={7}>
                    <Container className='bar-chart-wrapper'>
                        <Container className='bar-chart-container'>
                            <Container className='bar-chart-text'>
                                <span>Total Cost of Orders per Merchants</span>
                            </Container>
                            <hr/>
                            <Container className='bar-chart-box'>
                                {/* {chartData && <BarChartComponent data = {chartData} colors = {colors}/>} */}
                                <LineChartComponent data = {chartData} />
                            </Container>
                        </Container>
                    </Container>
                </Col>

                <Col md={12} lg={5}>
                    <Container className='pie-chart-wrapper'>
                        <Container className='pie-chart-container'>
                            <Container className='pie-chart-text'>
                                <span>Number of Orders per Merchants</span>
                            </Container>
                            <hr/>
                            <Container className='pie-chart-box'>
                                <PieChartComponent data={chartData} colors = {colors}/>
                            </Container>
                        </Container>
                    </Container>
                </Col>
            </Row>

            <hr/>

            <Container className='merchant-charts-container'>
                <Row className='merchant-header-wrapper'>
                    <Container className='merchant-header-box'>
                        <span className='merchant-header-text'>List of all Merchants<hr/></span>
                    </Container>

                    {chartData === null ?
                        <Container>Loading...</Container>
                        :
                        <Container className='merchant-list-container'>
                            <Row className='merchant-list-box'>
                                {chartData.map((row) => (
                                    <Col xs={4} sm={4} md={3} lg={2} className='merchant-name-col'>
                                        <div className='merchant-box-wrapper'>
                                            <div className='merchant-box' onClick={()=>{setMerchantName(row.merchant)}}>
                                                <span>{row.merchant}</span>
                                            </div>
                                        </div>
                                    </Col>
                                    )
                                )}
                            </Row>
                        </Container>
                    } 
                    {merchant &&
                        <Container>
                            <hr/>
                            <div>
                                <span className='merchant-header-text' style={{"display": 'inline-block'}}>
                                    Orders of {merchantName} <hr/>
                                </span>
                            </div>
                            <Container className='bar-chart-wrapper'>
                                <Container className='bar-chart-container'>
                                    <Container className='bar-chart-text'>
                                        <span>Total Cost of Orders per Merchants</span>
                                    </Container>
                                    <hr/>
                                    <Container className='bar-chart-box'>

                                        <AreaChartComponent data={merchant} />
                                    </Container>
                                </Container>
                            </Container>

                        </Container>
                    }
                </Row>
            </Container>

        </Container>
    );
}

export default Charts
