
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { PositionRange } from "../types";

interface PositionDistributionChartProps {
  data: PositionRange[];
}

export const PositionDistributionChart = ({ data }: PositionDistributionChartProps) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Position Distribution</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" name="Keywords" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="text-sm text-gray-500 mt-2 text-center">
        Distribution of keywords across different ranking positions
      </p>
    </div>
  );
};
