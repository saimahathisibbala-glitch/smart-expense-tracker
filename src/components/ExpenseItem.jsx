function badgeClass(category) {
  const map = {
    Food: "badge badge-food",
    Travel: "badge badge-travel",
    Shopping: "badge badge-shopping",
    Bills: "badge badge-bills",
    Others: "badge badge-others",
  };
  return map[category] || "badge";
}

export default function ExpenseItem({ expense, onDelete, onEdit }) {
  return (
    <div className="item">
      <div className="item-left">
        <div className="item-title">{expense.title}</div>
        <div className="item-meta">
          <span className={badgeClass(expense.category)}>
            {expense.category}
          </span>
          <span className="dot">•</span>
          <span>{expense.date}</span>
        </div>
      </div>

      <div className="item-right">
        <div className="amount">₹{expense.amount}</div>
        <div className="actions">
          <button
            className="icon-btn"
            type="button"
            onClick={() => onEdit?.(expense)}
          >
            Edit
          </button>
          <button
            className="icon-btn danger"
            type="button"
            onClick={() => onDelete?.(expense.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
