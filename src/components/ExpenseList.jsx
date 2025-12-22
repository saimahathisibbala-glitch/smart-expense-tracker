import ExpenseItem from "./ExpenseItem";

export default function ExpenseList({ expenses, onDelete, onEdit }) {
  if (!expenses?.length) {
    return <div className="empty">No expenses found for selected filters.</div>;
  }

  return (
    <div className="list">
      {expenses.map((e) => (
        <ExpenseItem
          key={e.id}
          expense={e}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}
