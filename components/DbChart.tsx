/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface GraphPoint {
  id: string;
  doubloons: number;
  timestamp: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black/90 border border-yellow-500/20 p-3 rounded-lg">
        <p className="text-yellow-400 font-medium">
          {new Date(label).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
          })}
        </p>
        <p className="text-white font-bold">
          {payload[0].value.toLocaleString()} doubloons
        </p>
      </div>
    );
  }
  return null;
};

const DoubloonsChart = ({ data }: { data: GraphPoint[] }) => {
  const sortedData = [...data].sort((a, b) => 
    new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={sortedData}
        margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
        <XAxis
          dataKey="timestamp"
          tickFormatter={(timestamp) => 
            new Date(timestamp).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric'
            })
          }
          stroke="#ffffff40"
          fontSize={12}
        />
        <YAxis
          tickFormatter={(value) => value.toLocaleString()}
          stroke="#ffffff40"
          fontSize={12}
        />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="doubloons"
          stroke="#EAB308"
          strokeWidth={2}
          dot={false}
          activeDot={{
            r: 4,
            fill: "#EAB308",
            stroke: "#000000",
            strokeWidth: 2
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default DoubloonsChart;