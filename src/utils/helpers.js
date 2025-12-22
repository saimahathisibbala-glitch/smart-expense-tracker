export const CATEGORIES = ["Food", "Travel", "Shopping", "Bills", "Others"];

export function todayISO() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export function monthKey(isoDate) {
  // iso: YYYY-MM-DD -> YYYY-MM
  if (!isoDate || typeof isoDate !== "string") return "";
  return isoDate.slice(0, 7);
}

export function formatMonthLabel(yyyyMm) {
  // "2025-12" -> "Dec 2025"
  if (!yyyyMm) return "";
  const [y, m] = yyyyMm.split("-");
  const date = new Date(Number(y), Number(m) - 1, 1);
  return date.toLocaleString(undefined, { month: "short", year: "numeric" });
}

export function groupSumByCategory(expenses) {
  const map = new Map();
  for (const e of expenses) {
    const cat = e.category || "Others";
    map.set(cat, (map.get(cat) || 0) + Number(e.amount || 0));
  }
  return Array.from(map.entries()).map(([name, value]) => ({ name, value }));
}

export function groupSumByMonth(expenses) {
  const map = new Map();
  for (const e of expenses) {
    const k = monthKey(e.date);
    if (!k) continue;
    map.set(k, (map.get(k) || 0) + Number(e.amount || 0));
  }
  // sorted by month ascending
  return Array.from(map.entries())
    .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
    .map(([k, value]) => ({ month: formatMonthLabel(k), value, raw: k }));
}

export function getTopCategory(expenses) {
  const grouped = groupSumByCategory(expenses);
  if (!grouped.length) return "—";
  grouped.sort((a, b) => b.value - a.value);
  return grouped[0].name;
}

export function safeNumber(n) {
  const x = Number(n);
  return Number.isFinite(x) ? x : 0;
}

export function compareSort(a, b, sort) {
  // a,b expense objects
  if (sort === "Newest") return (b.date || "").localeCompare(a.date || "");
  if (sort === "Oldest") return (a.date || "").localeCompare(b.date || "");
  if (sort === "High") return safeNumber(b.amount) - safeNumber(a.amount);
  if (sort === "Low") return safeNumber(a.amount) - safeNumber(b.amount);
  return 0;
}
