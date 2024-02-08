import { Legend } from 'chart.js';
import React from 'react'
import { Container, Tooltip } from 'react-bootstrap';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';


const BarChartComponent = ({ data, colors }) => {

    return (data === null ?
            <Container>Loading...</Container>
            :
            <ResponsiveContainer width="100%" height={280}>
                <BarChart data={data} animationBegin={500}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="merchant" tick={false} />
                <YAxis domain={[0,1.05*(data.reduce((acc, obj) => Math.max(acc, obj.total_cost), -Infinity))]}/>
                
                <Bar dataKey="total_cost" fill="#8884d8">
                    {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % 100]} />
                    ))} 
                </Bar>
                <Tooltip />
                </BarChart>
            </ResponsiveContainer>
    );
}

export default BarChartComponent
