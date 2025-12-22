import { useEffect, useMemo, useState } from "react";
import { CATEGORIES, todayISO } from "../utils/helpers";

export default function ExpenseForm({
  mode = "add", // "add" | "edit"
  initialValues = null, // expense when editing
  onAdd,
  onUpdate,
  onCancelEdit,
}) {
  const isEdit = mode === "edit";

  const defaults = useMemo(
    () => ({
      title: "",
      amount: "",
      category: "Food",
      date: todayISO(),
    }),
    []
  );

  const [title, setTitle] = useState(defaults.title);
  const [amount, setAmount] = useState(defaults.amount);
  const [category, setCategory] = useState(defaults.category);
  const [date, setDate] = useState(defaults.date);
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialValues) {
      setTitle(initialValues.title ?? "");
      setAmount(String(initialValues.amount ?? ""));
      setCategory(initialValues.category ?? "Food");
      setDate(initialValues.date ?? todayISO());
      setError("");
    } else {
      setTitle(defaults.title);
      setAmount(defaults.amount);
      setCategory(defaults.category);
      setDate(defaults.date);
      setError("");
    }
  }, [initialValues, defaults]);

  function validate() {
    const t = title.trim();
    const a = Number(amount);

    if (!t) return "Title cannot be empty.";
    if (!Number.isFinite(a) || a <= 0) return "Amount must be greater than 0.";
    if (!date) return "Date is required.";
    if (!category) return "Category is required.";
    return "";
  }

  function resetForm() {
    setTitle(defaults.title);
    setAmount(defaults.amount);
    setCategory(defaults.category);
    setDate(defaults.date);
    setError("");
  }

  function handleSubmit(e) {
    e.preventDefault();

    const msg = validate();
    if (msg) {
      setError(msg);
      return;
    }

    const payload = {
      id: isEdit ? initialValues.id : crypto.randomUUID(),
      title: title.trim(),
      amount: Number(amount),
      category,
      date,
    };

    if (isEdit) {
      onUpdate?.(payload);
    } else {
      onAdd?.(payload);
      resetForm();
    }
  }

  function handleSecondary() {
    if (isEdit) {
      onCancelEdit?.();
      return;
    }
    resetForm();
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label className="field">
        <span className="label">Title</span>
        <input
          className="input"
          type="text"
          placeholder="e.g., Lunch, Uber, Rent"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>

      <div className="two">
        <label className="field">
          <span className="label">Amount (₹)</span>
          <input
            className="input"
            type="number"
            placeholder="e.g., 250"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>

        <label className="field">
          <span className="label">Date</span>
          <input
            className="input"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
      </div>

      <label className="field">
        <span className="label">Category</span>
        <select
          className="input"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>

      {error ? (
        <div className="hint" style={{ color: "#ff93a4" }}>
          {error}
        </div>
      ) : null}

      <div className="row">
        <button className="btn" type="submit">
          {isEdit ? "Save Changes" : "Add Expense"}
        </button>
        <button
          className="btn btn-ghost"
          type="button"
          onClick={handleSecondary}
        >
          {isEdit ? "Cancel Edit" : "Clear"}
        </button>
      </div>

      <div className="hint">
        Tip: Try adding few expenses across different months to see charts
        working.
      </div>
    </form>
  );
}
