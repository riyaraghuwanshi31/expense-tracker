package com.expensetracker.expense_tracker.repository;

import com.expensetracker.expense_tracker.entity.Expense;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    
    List<Expense> findByCategory(String category);

    List<Expense> findByType(String type);
} 