import { useEffect, useState } from "react";


const emptyForm = {

    title: "",
    amount: "",
    category: "Food",
    type: "EXPENSE",
    date: "",
    description: ""

};


function ExpenseForm({
    editingExpense,
    onAddExpense,
    onUpdateExpense,
    onCancelEdit
}) {


    const [formData, setFormData] =
        useState(emptyForm);


    const [submitting, setSubmitting] =
        useState(false);


    // --------------------------------
    // Load editing data into form
    // --------------------------------

    useEffect(() => {

        if (editingExpense) {

            setFormData({

                title:
                    editingExpense.title || "",

                amount:
                    editingExpense.amount || "",

                category:
                    editingExpense.category || "Food",

                type:
                    editingExpense.type || "EXPENSE",

                date:
                    editingExpense.date || "",

                description:
                    editingExpense.description || ""

            });

        } else {

            setFormData(emptyForm);

        }

    }, [editingExpense]);


    // --------------------------------
    // Input change
    // --------------------------------

    const handleChange = (event) => {

        const {
            name,
            value
        } = event.target;


        setFormData((previous) => ({

            ...previous,

            [name]: value

        }));

    };


    // --------------------------------
    // Submit
    // --------------------------------

    const handleSubmit = async (event) => {

        event.preventDefault();


        if (
            !formData.title.trim() ||
            !formData.amount ||
            !formData.date
        ) {

            alert(
                "Please fill in title, amount and date."
            );

            return;
        }


        try {

            setSubmitting(true);


            const expenseData = {

                ...formData,

                amount: Number(
                    formData.amount
                )

            };


            // EDIT
            if (editingExpense) {

                await onUpdateExpense({

                    ...expenseData,

                    id: editingExpense.id

                });

            }

            // ADD
            else {

                await onAddExpense(
                    expenseData
                );

            }


            setFormData(emptyForm);

        } catch (error) {

            console.error(error);

        } finally {

            setSubmitting(false);

        }

    };


    // --------------------------------
    // Cancel edit
    // --------------------------------

    const handleCancel = () => {

        setFormData(emptyForm);

        onCancelEdit();

    };


    const isEditing =
        Boolean(editingExpense);


    return (

        <div
            className="form-section"
            id="expense-form"
        >


            {/* ================================
                HEADER
            ================================= */}

            <div className="section-header">

                <div>

                    <p className="section-eyebrow">

                        {isEditing
                            ? "EDIT TRANSACTION"
                            : "QUICK ACTION"
                        }

                    </p>


                    <h2>

                        {isEditing
                            ? "Edit transaction"
                            : "Add transaction"
                        }

                    </h2>

                </div>


                <div className="plus-circle">

                    {isEditing
                        ? "✎"
                        : "+"
                    }

                </div>

            </div>


            {/* ================================
                FORM
            ================================= */}

            <form
                className="expense-form"
                onSubmit={handleSubmit}
            >


                {/* TITLE */}

                <div className="input-group">

                    <label>
                        Transaction title
                    </label>

                    <input
                        type="text"
                        name="title"
                        placeholder="e.g. Grocery shopping"
                        value={formData.title}
                        onChange={handleChange}
                    />

                </div>


                {/* AMOUNT */}

                <div className="input-group">

                    <label>
                        Amount
                    </label>


                    <div className="amount-input">

                        <span>
                            ₹
                        </span>


                        <input
                            type="number"
                            name="amount"
                            placeholder="0"
                            min="0"
                            value={formData.amount}
                            onChange={handleChange}
                        />

                    </div>

                </div>


                {/* CATEGORY + TYPE */}

                <div className="form-row">


                    <div className="input-group">

                        <label>
                            Category
                        </label>


                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                        >

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


                    <div className="input-group">

                        <label>
                            Type
                        </label>


                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                        >

                            <option value="EXPENSE">
                                Expense
                            </option>

                            <option value="INCOME">
                                Income
                            </option>

                        </select>

                    </div>

                </div>


                {/* DATE */}

                <div className="input-group">

                    <label>
                        Date
                    </label>


                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                    />

                </div>


                {/* DESCRIPTION */}

                <div className="input-group">

                    <label>

                        Description

                        <span>
                            {" "} (optional)
                        </span>

                    </label>


                    <textarea
                        name="description"
                        placeholder="Add a note..."
                        rows="3"
                        value={
                            formData.description
                        }
                        onChange={
                            handleChange
                        }
                    />

                </div>


                {/* BUTTONS */}

                <div className="form-buttons">


                    <button
                        type="submit"
                        className="submit-button"
                        disabled={submitting}
                    >

                        <span>

                            {submitting
                                ? "..."
                                : isEditing
                                    ? "✓"
                                    : "+"
                            }

                        </span>


                        {submitting

                            ? "Saving..."

                            : isEditing
                                ? "Update transaction"
                                : "Add transaction"

                        }


                        {!submitting && (

                            <span className="button-arrow">
                                →
                            </span>

                        )}

                    </button>


                    {/* CANCEL */}

                    {isEditing && (

                        <button
                            type="button"
                            className="cancel-button"
                            onClick={handleCancel}
                        >

                            Cancel

                        </button>

                    )}

                </div>

            </form>

        </div>

    );
}


export default ExpenseForm;