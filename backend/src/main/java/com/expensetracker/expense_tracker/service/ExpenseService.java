package com.expensetracker.expense_tracker.service;

import java.util.List;

import com.expensetracker.expense_tracker.dto.ExpenseRequest;
import com.expensetracker.expense_tracker.entity.Expense;

public interface ExpenseService {
    Expense createExpense(ExpenseRequest request);

    List<Expense> getAllExpense();

    Expense getExpenseById(Long id);

    Expense updateExpense(Long id, ExpenseRequest request);

    void deleteExpense(Long id);

    List<Expense> getByCategory(String category);

    List<Expense> getByType(String type);

    double getTotalIncome();

    double getTotalExpense();

    double getBalance();
    
}
