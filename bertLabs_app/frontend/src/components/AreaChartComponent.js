import React from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AreaChartComponent = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height={280}>
            <AreaChart
            width={500}
            height={400}
            data={data}
            margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
            }}
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={false} label={{ value: 'Dates (Order placed)', position: 'insideBottom', offset: 10 }}/>
            <YAxis tick={false} label={{ value: 'Amount', angle: -90, position: 'insideLeft', offset: 40 }} />
            <Tooltip />
            <Area type="monotone" dataKey="amount" stroke="#8884d8" fill="#22d0c7" />
            </AreaChart>
        </ResponsiveContainer>
    );
}

export default AreaChartComponent
