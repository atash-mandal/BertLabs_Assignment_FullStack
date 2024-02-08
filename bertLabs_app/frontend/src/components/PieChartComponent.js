import React from 'react'
import { Container } from 'react-bootstrap';
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const PieChartComponent = ({data,colors}) => {
    return (data === null ?
        <Container>Loading...</Container>
        :
        <ResponsiveContainer width="100%" height={280}>
            <PieChart>
            <Pie data={data} dataKey="order_count" nameKey="merchant" cx="50%" cy="50%" outerRadius="100%" innerRadius="50%">
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % 100]} />
                ))}
            </Pie>
            <Tooltip />          
            </PieChart>
        </ResponsiveContainer>
    )
}

export default PieChartComponent
