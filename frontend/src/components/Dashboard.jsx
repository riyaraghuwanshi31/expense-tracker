import { useEffect, useState } from "react";

import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";

import {
    getExpenses,
    getSummary,
    createExpense,
    updateExpense,
    deleteExpense,
    getExpensesByCategory,
    getExpensesByType
} from "../services/expenseService";


function Dashboard() {

    // --------------------------------
    // State
    // --------------------------------

    const [expenses, setExpenses] = useState([]);

    const [summary, setSummary] = useState({
        totalIncome: 0,
        totalExpense: 0,
        balance: 0
    });

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    // Used when editing an existing transaction
    const [editingExpense, setEditingExpense] = useState(null);

    // Current filter
    const [filter, setFilter] = useState({
        type: "ALL",
        category: "ALL"
    });


    // --------------------------------
    // Load dashboard
    // --------------------------------

    const loadDashboard = async () => {

        try {

            setLoading(true);
            setError("");

            const [expenseData, summaryData] =
                await Promise.all([
                    getExpenses(),
                    getSummary()
                ]);

            setExpenses(expenseData);

            setSummary({
                totalIncome: summaryData.totalIncome || 0,
                totalExpense: summaryData.totalExpense || 0,
                balance: summaryData.balance || 0
            });

        } catch (error) {

            console.error(error);

            setError(
                "Unable to connect to the server. Make sure Spring Boot is running."
            );

        } finally {

            setLoading(false);

        }
    };


    // --------------------------------
    // Initial load
    // --------------------------------

    useEffect(() => {

        loadDashboard();

    }, []);


    // --------------------------------
    // Add transaction
    // --------------------------------

    const handleAddExpense = async (expense) => {

        try {

            await createExpense(expense);

            setEditingExpense(null);

            await loadDashboard();

        } catch (error) {

            console.error(error);

            alert("Failed to add transaction.");

            throw error;
        }
    };


    // --------------------------------
    // Update transaction
    // --------------------------------

    const handleUpdateExpense = async (expense) => {

        try {

            await updateExpense(
                expense.id,
                expense
            );

            setEditingExpense(null);

            await loadDashboard();

        } catch (error) {

            console.error(error);

            alert("Failed to update transaction.");

            throw error;
        }
    };


    // --------------------------------
    // Delete transaction
    // --------------------------------

    const handleDeleteExpense = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this transaction?"
        );

        if (!confirmed) {
            return;
        }

        try {

            await deleteExpense(id);

            await loadDashboard();

        } catch (error) {

            console.error(error);

            alert("Failed to delete transaction.");

        }
    };


    // --------------------------------
    // Filter transactions
    // --------------------------------

    const handleFilterChange = async (type, category) => {

        try {

            setLoading(true);

            setFilter({
                type,
                category
            });


            // No filter
            if (
                type === "ALL" &&
                category === "ALL"
            ) {

                const data = await getExpenses();

                setExpenses(data);

                return;
            }


            // Type filter
            if (
                type !== "ALL" &&
                category === "ALL"
            ) {

                const data =
                    await getExpensesByType(type);

                setExpenses(data);

                return;
            }


            // Category filter
            if (
                type === "ALL" &&
                category !== "ALL"
            ) {

                const data =
                    await getExpensesByCategory(category);

                setExpenses(data);

                return;
            }


            // Both filters selected
            // Backend doesn't currently have
            // a combined filter API.
            //
            // So we fetch by type and filter
            // the category on frontend.

            const data =
                await getExpensesByType(type);

            const filteredData =
                data.filter(
                    (expense) =>
                        expense.category === category
                );

            setExpenses(filteredData);

        } catch (error) {

            console.error(error);

            alert("Failed to filter transactions.");

        } finally {

            setLoading(false);

        }
    };


    // --------------------------------
    // Start editing
    // --------------------------------

    const handleEditExpense = (expense) => {

        setEditingExpense(expense);

        document
            .getElementById("expense-form")
            ?.scrollIntoView({
                behavior: "smooth"
            });
    };


    // --------------------------------
    // Cancel editing
    // --------------------------------

    const handleCancelEdit = () => {

        setEditingExpense(null);

    };


    return (

        <div className="dashboard">

            {/* ================================
                NAVBAR
            ================================= */}

            <nav className="navbar">

                <div className="brand">

                    <div className="brand-icon">
                        ₹
                    </div>

                    <span>
                        expensify
                    </span>

                </div>


                <div className="nav-right">

                    <span className="nav-link active">
                        Dashboard
                    </span>


                    <button
                        className="nav-add"
                        onClick={() => {

                            setEditingExpense(null);

                            document
                                .getElementById("expense-form")
                                ?.scrollIntoView({
                                    behavior: "smooth"
                                });

                        }}
                    >

                        <span>+</span>

                        Add transaction

                    </button>

                </div>

            </nav>


            {/* ================================
                MAIN
            ================================= */}

            <main className="container">


                {/* HERO */}

                <section className="hero">

                    <div>

                        <p className="eyebrow">
                            FINANCIAL OVERVIEW
                        </p>

                        <h1>
                            Good afternoon<span>.</span>
                        </h1>

                        <p className="hero-text">
                            Keep track of your money without
                            the spreadsheet headache.
                        </p>

                    </div>


                    <div className="month-selector">

                        <span>
                            October 2026
                        </span>

                        <span>
                            ⌄
                        </span>

                    </div>

                </section>


                {/* ERROR */}

                {error && (

                    <div className="error-message">

                        {error}

                        <button
                            onClick={loadDashboard}
                        >
                            Retry
                        </button>

                    </div>

                )}


                {/* ================================
                    SUMMARY
                ================================= */}

                <section className="stats-grid">


                    {/* INCOME */}

                    <div className="stat-card">

                        <div className="stat-top">

                            <div className="stat-icon income-icon">
                                ↙
                            </div>

                            <span className="trend positive">
                                Income
                            </span>

                        </div>


                        <div className="stat-label">
                            Total income
                        </div>


                        <div className="stat-value">

                            ₹
                            {Number(
                                summary.totalIncome
                            ).toLocaleString("en-IN")}

                        </div>


                        <div className="stat-footer">
                            This month
                        </div>

                    </div>


                    {/* EXPENSE */}

                    <div className="stat-card">

                        <div className="stat-top">

                            <div className="stat-icon expense-icon">
                                ↗
                            </div>

                            <span className="trend negative">
                                Expense
                            </span>

                        </div>


                        <div className="stat-label">
                            Total expenses
                        </div>


                        <div className="stat-value">

                            ₹
                            {Number(
                                summary.totalExpense
                            ).toLocaleString("en-IN")}

                        </div>


                        <div className="stat-footer">
                            This month
                        </div>

                    </div>


                    {/* BALANCE */}

                    <div className="stat-card">

                        <div className="stat-top">

                            <div className="stat-icon balance-icon">
                                ✦
                            </div>

                            <span className="balance-status">
                                Healthy
                            </span>

                        </div>


                        <div className="stat-label">
                            Available balance
                        </div>


                        <div className="stat-value">

                            ₹
                            {Number(
                                summary.balance
                            ).toLocaleString("en-IN")}

                        </div>


                        <div className="stat-footer">
                            After expenses
                        </div>

                    </div>

                </section>


                {/* ================================
                    CONTENT
                ================================= */}

                <section className="content-grid">


                    {/* TRANSACTIONS */}

                    <ExpenseList

                        expenses={expenses}

                        loading={loading}

                        filter={filter}

                        onFilterChange={
                            handleFilterChange
                        }

                        onDelete={
                            handleDeleteExpense
                        }

                        onEdit={
                            handleEditExpense
                        }

                    />


                    {/* FORM */}

                    <ExpenseForm

                        editingExpense={
                            editingExpense
                        }

                        onAddExpense={
                            handleAddExpense
                        }

                        onUpdateExpense={
                            handleUpdateExpense
                        }

                        onCancelEdit={
                            handleCancelEdit
                        }

                    />

                </section>

            </main>

        </div>

    );
}


export default Dashboard;