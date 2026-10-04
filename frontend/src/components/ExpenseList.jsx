function ExpenseList({
    expenses,
    loading,
    filter,
    onFilterChange,
    onDelete,
    onEdit
}) {


    // --------------------------------
    // Category icons
    // --------------------------------

    const getIcon = (category) => {

        const icons = {

            Food: "●",

            Housing: "⌂",

            Travel: "↗",

            Shopping: "◇",

            Bills: "▣",

            Entertainment: "♪"

        };

        return icons[category] || "•";
    };


    // --------------------------------
    // Format date
    // --------------------------------

    const formatDate = (date) => {

        if (!date) {
            return "-";
        }

        return new Date(date).toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short"
            }
        );
    };


    // --------------------------------
    // Handle filter
    // --------------------------------

    const handleTypeChange = (event) => {

        onFilterChange(
            event.target.value,
            filter.category
        );

    };


    const handleCategoryChange = (event) => {

        onFilterChange(
            filter.type,
            event.target.value
        );

    };


    return (

        <div className="transactions-section">


            {/* ================================
                HEADER
            ================================= */}

            <div className="section-header">

                <div>

                    <p className="section-eyebrow">
                        ACTIVITY
                    </p>

                    <h2>
                        Recent transactions
                    </h2>

                </div>


                <span className="transaction-count">

                    {expenses.length} transactions

                </span>

            </div>


            {/* ================================
                FILTERS
            ================================= */}

            <div className="transaction-filters">


                <div className="filter-tabs">

                    <button
                        className={
                            filter.type === "ALL"
                                ? "filter-tab active"
                                : "filter-tab"
                        }
                        onClick={() =>
                            onFilterChange(
                                "ALL",
                                filter.category
                            )
                        }
                    >
                        All
                    </button>


                    <button
                        className={
                            filter.type === "INCOME"
                                ? "filter-tab active"
                                : "filter-tab"
                        }
                        onClick={() =>
                            onFilterChange(
                                "INCOME",
                                filter.category
                            )
                        }
                    >
                        Income
                    </button>


                    <button
                        className={
                            filter.type === "EXPENSE"
                                ? "filter-tab active"
                                : "filter-tab"
                        }
                        onClick={() =>
                            onFilterChange(
                                "EXPENSE",
                                filter.category
                            )
                        }
                    >
                        Expense
                    </button>

                </div>


                <select
                    className="category-filter"
                    value={filter.category}
                    onChange={handleCategoryChange}
                >

                    <option value="ALL">
                        All categories
                    </option>

                    <option value="Food">
                        Food
                    </option>

                    <option value="Housing">
                        Housing
                    </option>

                    <option value="Travel">
                        Travel
                    </option>

                    <option value="Shopping">
                        Shopping
                    </option>

                    <option value="Bills">
                        Bills
                    </option>

                    <option value="Entertainment">
                        Entertainment
                    </option>

                </select>

            </div>


            {/* ================================
                TRANSACTIONS
            ================================= */}

            <div className="transactions-card">


                {loading ? (

                    <div className="empty-state">

                        Loading transactions...

                    </div>

                ) : expenses.length === 0 ? (

                    <div className="empty-state">

                        <div className="empty-icon">
                            +
                        </div>

                        <p>
                            No transactions found
                        </p>

                        <span>
                            Try changing your filters
                            or add a new transaction.
                        </span>

                    </div>

                ) : (

                    expenses.map((expense) => (

                        <div
                            className="transaction"
                            key={expense.id}
                        >


                            {/* ICON */}

                            <div
                                className={`transaction-icon ${
                                    expense.type === "INCOME"
                                        ? "transaction-income"
                                        : ""
                                }`}
                            >

                                {getIcon(
                                    expense.category
                                )}

                            </div>


                            {/* INFO */}

                            <div className="transaction-info">

                                <div className="transaction-title">

                                    {expense.title}

                                </div>


                                <div className="transaction-meta">

                                    <span>
                                        {expense.category}
                                    </span>

                                    <span>
                                        •
                                    </span>

                                    <span>
                                        {formatDate(
                                            expense.date
                                        )}
                                    </span>

                                </div>

                            </div>


                            {/* AMOUNT */}

                            <div
                                className={`transaction-amount ${
                                    expense.type === "INCOME"
                                        ? "amount-income"
                                        : ""
                                }`}
                            >

                                {expense.type === "INCOME"
                                    ? "+"
                                    : "-"
                                }

                                ₹
                                {Number(
                                    expense.amount
                                ).toLocaleString("en-IN")}

                            </div>


                            {/* EDIT */}

                            <button
                                className="action-button edit-button"
                                onClick={() =>
                                    onEdit(expense)
                                }
                                title="Edit transaction"
                            >

                                ✎

                            </button>


                            {/* DELETE */}

                            <button
                                className="action-button delete-button"
                                onClick={() =>
                                    onDelete(expense.id)
                                }
                                title="Delete transaction"
                            >

                                ×

                            </button>

                        </div>

                    ))

                )}

            </div>

        </div>

    );
}


export default ExpenseList;