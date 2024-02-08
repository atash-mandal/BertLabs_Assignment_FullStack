import React from 'react'
import { Container } from 'react-bootstrap';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Area,
} from 'recharts';

const LineChartComponent = ({ data }) => {
  return (data === null ?
    <Container>Loading...</Container>
    :
    <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data} margin={{
            top: 5,
            right: 2,
            left: 2,
            bottom: 5,
          }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="merchant" 
            padding={{ left: 30, right: 30 }} 
            tick={false}
            label={{ value: 'Merchants', position: 'insideBottom', offset: 0 }}
            />
          <YAxis 
            tick={false} 
            label={{ value: 'Total Cost', angle: -90, position: 'insideLeft', offset: 40 }}
            domain={[0.7*(data.reduce((minValue, obj) => Math.min(minValue, obj.total_cost), Infinity)), 1.05*(data.reduce((maxValue, obj) => Math.max(maxValue, obj.total_cost), -Infinity))]} 
            />
          <Tooltip />
          {/* <Legend /> */}
          <Line type="monotone" dataKey="total_cost" stroke="#22d0c7" strokeWidth = {3} activeDot={{ r: 8 }} />
        </LineChart>
        
      </ResponsiveContainer>
  )
}

export default LineChartComponent
