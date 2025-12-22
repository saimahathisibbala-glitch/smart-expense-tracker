import { useMemo, useState } from "react";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import SummaryCards from "../components/SummaryCards";
import Filters from "../components/Filters";
import Charts from "../components/Charts";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { compareSort, monthKey } from "../utils/helpers";

const STORAGE_KEY = "smart-expenses-v1";

const seed = [
  {
    id: "1",
    title: "Biriyani",
    amount: 180,
    category: "Food",
    date: "2025-12-21",
  },
  { id: "2", title: "Bus", amount: 40, category: "Travel", date: "2025-12-20" },
  {
    id: "3",
    title: "Netflix",
    amount: 199,
    category: "Bills",
    date: "2025-12-18",
  },
  {
    id: "4",
    title: "Shoes",
    amount: 1299,
    category: "Shopping",
    date: "2025-11-28",
  },
];

export default function Dashboard() {
  const [expenses, setExpenses] = useLocalStorage(STORAGE_KEY, seed);
  const [editingExpense, setEditingExpense] = useState(null);

  // filters
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [monthFilter, setMonthFilter] = useState("AllTime"); // AllTime | ThisMonth | LastMonth | YYYY-MM
  const [sort, setSort] = useState("Newest");

  function handleAddExpense(newExpense) {
    setExpenses((prev) => [newExpense, ...prev]);
  }

  function handleDeleteExpense(id) {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
    if (editingExpense?.id === id) setEditingExpense(null);
  }

  function handleStartEdit(expense) {
    setEditingExpense(expense);
  }

  function handleCancelEdit() {
    setEditingExpense(null);
  }

  function handleUpdateExpense(updated) {
    setExpenses((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
    setEditingExpense(null);
  }

  function handleResetAll() {
    setExpenses([]);
    setEditingExpense(null);
  }

  // derive month shortcuts
  const thisMonthKey = useMemo(() => {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    return `${y}-${m}`;
  }, []);

  const lastMonthKey = useMemo(() => {
    const d = new Date();
    d.setMonth(d.getMonth() - 1);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    return `${y}-${m}`;
  }, []);

  const filteredExpenses = useMemo(() => {
    let out = [...expenses];

    if (categoryFilter !== "All") {
      out = out.filter((e) => e.category === categoryFilter);
    }

    if (monthFilter === "ThisMonth") {
      out = out.filter((e) => monthKey(e.date) === thisMonthKey);
    } else if (monthFilter === "LastMonth") {
      out = out.filter((e) => monthKey(e.date) === lastMonthKey);
    } else if (monthFilter !== "AllTime") {
      // monthFilter might be YYYY-MM
      out = out.filter((e) => monthKey(e.date) === monthFilter);
    }

    out.sort((a, b) => compareSort(a, b, sort));
    return out;
  }, [expenses, categoryFilter, monthFilter, sort, thisMonthKey, lastMonthKey]);

  // month options based on data
  const monthOptions = useMemo(() => {
    const keys = new Set();
    for (const e of expenses) {
      const k = monthKey(e.date);
      if (k) keys.add(k);
    }
    return Array.from(keys).sort().reverse(); // latest first
  }, [expenses]);

  return (
    <div className="app">
      <header className="topbar">
        <div>
          <h1 className="title">Smart Expense Tracker</h1>
        </div>

        <div className="row">
          <button
            className="btn btn-ghost"
            type="button"
            onClick={handleResetAll}
          >
            Reset All
          </button>
        </div>
      </header>

      <main className="grid">
        <section className="card">
          <h2 className="card-title">
            {editingExpense ? "Edit Expense" : "Add Expense"}
          </h2>
          <p className="card-subtitle">
            {editingExpense
              ? "Update and save changes."
              : "Add new expense with validation."}
          </p>

          <ExpenseForm
            mode={editingExpense ? "edit" : "add"}
            initialValues={editingExpense}
            onAdd={handleAddExpense}
            onUpdate={handleUpdateExpense}
            onCancelEdit={handleCancelEdit}
          />
        </section>

        <section className="stack">
          <SummaryCards expenses={filteredExpenses} allExpenses={expenses} />

          <div className="card">
            <div className="row-between">
              <div>
                <h2 className="card-title">Expenses</h2>
                <p className="card-subtitle">
                  Showing {filteredExpenses.length} / {expenses.length}
                </p>
              </div>

              <Filters
                category={categoryFilter}
                setCategory={setCategoryFilter}
                month={monthFilter}
                setMonth={setMonthFilter}
                sort={sort}
                setSort={setSort}
                monthOptions={monthOptions}
                thisMonthKey={thisMonthKey}
                lastMonthKey={lastMonthKey}
              />
            </div>

            <ExpenseList
              expenses={filteredExpenses}
              onDelete={handleDeleteExpense}
              onEdit={handleStartEdit}
            />
          </div>

          <Charts expenses={filteredExpenses} />
        </section>
      </main>

      <footer className="footer">
        Built with React + Vite • Data saved in LocalStorage
      </footer>
    </div>
  );
}
