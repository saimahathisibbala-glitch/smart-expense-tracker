import { CATEGORIES, formatMonthLabel } from "../utils/helpers";

export default function Filters({
  category,
  setCategory,
  month,
  setMonth,
  sort,
  setSort,
  monthOptions,
  thisMonthKey,
  lastMonthKey,
}) {
  return (
    <div className="filters">
      <select
        className="input small"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="All">All Categories</option>
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <select
        className="input small"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
      >
        <option value="AllTime">All Time</option>
        <option value="ThisMonth">
          This Month ({formatMonthLabel(thisMonthKey)})
        </option>
        <option value="LastMonth">
          Last Month ({formatMonthLabel(lastMonthKey)})
        </option>
        {monthOptions.map((k) => (
          <option key={k} value={k}>
            {formatMonthLabel(k)}
          </option>
        ))}
      </select>

      <select
        className="input small"
        value={sort}
        onChange={(e) => setSort(e.target.value)}
      >
        <option value="Newest">Sort: Newest</option>
        <option value="Oldest">Sort: Oldest</option>
        <option value="High">Sort: Amount High</option>
        <option value="Low">Sort: Amount Low</option>
      </select>
    </div>
  );
}
