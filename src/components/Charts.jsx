import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { groupSumByCategory, groupSumByMonth } from "../utils/helpers";

const PIE_COLORS = [
  "#2a62ff",
  "#00c8ff",
  "#8c64ff",
  "#78ff8c",
  "#ffb400",
  "#ff3b5c",
];

export default function Charts({ expenses }) {
  const catData = groupSumByCategory(expenses);
  const monthData = groupSumByMonth(expenses);

  return (
    <div className="card">
      <h2 className="card-title">Charts</h2>
      <p className="card-subtitle">Based on current filters.</p>

      <div className="charts-grid">
        <div className="chart-box">
          <div className="chart-title">Category Split</div>

          {catData.length ? (
            <div style={{ width: "100%", height: 260 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={catData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={90}
                    label
                  >
                    {catData.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="chart-placeholder">No data for chart</div>
          )}
        </div>

        <div className="chart-box">
          <div className="chart-title">Monthly Spending</div>

          {monthData.length ? (
            <div style={{ width: "100%", height: 260 }}>
              <ResponsiveContainer>
                <BarChart data={monthData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="chart-placeholder">No data for chart</div>
          )}
        </div>
      </div>
    </div>
  );
}
