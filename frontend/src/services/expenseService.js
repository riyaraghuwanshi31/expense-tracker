const API_URL = "http://localhost:8080/api/expenses";


export const getExpenses = async () => {

    const response = await fetch(API_URL);

    return response.json();
};


export const createExpense = async (expense) => {

    const response = await fetch(API_URL, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(expense)

    });

    return response.json();
};


export const getExpenseById = async (id) => {

    const response = await fetch(
        `${API_URL}/${id}`
    );

    return response.json();
};


export const updateExpense = async (id, expense) => {

    const response = await fetch(
        `${API_URL}/${id}`,
        {
            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(expense)
        }
    );

    return response.json();
};


export const deleteExpense = async (id) => {

    await fetch(
        `${API_URL}/${id}`,
        {
            method: "DELETE"
        }
    );
};


export const getExpensesByCategory = async (category) => {

    const response = await fetch(
        `${API_URL}/category/${category}`
    );

    return response.json();
};


export const getExpensesByType = async (type) => {

    const response = await fetch(
        `${API_URL}/type/${type}`
    );

    return response.json();
};


export const getSummary = async () => {

    const response = await fetch(
        `${API_URL}/summary`
    );

    return response.json();
};