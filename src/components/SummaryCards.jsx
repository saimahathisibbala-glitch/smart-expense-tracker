import { getTopCategory, safeNumber } from "../utils/helpers";

export default function SummaryCards({ expenses, allExpenses }) {
  const totalFiltered = expenses.reduce(
    (sum, e) => sum + safeNumber(e.amount),
    0
  );
  const countFiltered = expenses.length;

  const totalAll = allExpenses.reduce(
    (sum, e) => sum + safeNumber(e.amount),
    0
  );
  const topCat = getTopCategory(expenses);

  return (
    <div className="summary">
      <div className="card mini">
        <div className="mini-title">Total Spent (Filtered)</div>
        <div className="mini-value">₹{totalFiltered}</div>
        <div className="mini-sub">{countFiltered} records</div>
      </div>

      <div className="card mini">
        <div className="mini-title">Top Category (Filtered)</div>
        <div className="mini-value">{topCat}</div>
        <div className="mini-sub">Highest spend group</div>
      </div>

      <div className="card mini">
        <div className="mini-title">Total Spent (All)</div>
        <div className="mini-value">₹{totalAll}</div>
        <div className="mini-sub">{allExpenses.length} records</div>
      </div>
    </div>
  );
}
