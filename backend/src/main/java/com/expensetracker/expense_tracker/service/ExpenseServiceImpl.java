package com.expensetracker.expense_tracker.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.expensetracker.expense_tracker.dto.ExpenseRequest;
import com.expensetracker.expense_tracker.entity.Expense;
import com.expensetracker.expense_tracker.repository.ExpenseRepository;

import com.expensetracker.expense_tracker.exception.ExpenseNotFoundException;

@Service 
public class ExpenseServiceImpl implements ExpenseService{
    private final ExpenseRepository expenseRepository;

    public ExpenseServiceImpl(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }


    @Override 
    public Expense createExpense(ExpenseRequest request){

        Expense expense = new Expense();

        expense.setTitle(request.getTitle());
        expense.setAmount(request.getAmount());
        expense.setCategory(request.getCategory());
        expense.setType(request.getType());
        expense.setDescription(request.getDescription());
        expense.setDate(request.getDate());

        return expenseRepository.save(expense);
    }

    @Override 
    public List<Expense> getAllExpense(){
        return expenseRepository.findAll();
    }

    @Override
    public Expense getExpenseById(Long id){
        return expenseRepository.findById(id)
            .orElseThrow(()->
                new ExpenseNotFoundException("Expense not found with id: "+ id));
    }

    @Override 
    public Expense updateExpense(Long id, ExpenseRequest request){

        Expense expense = getExpenseById(id);

        expense.setTitle(request.getTitle());
        expense.setAmount(request.getAmount());
        expense.setCategory(request.getCategory());
        expense.setType(request.getType());
        expense.setDescription(request.getDescription());
        expense.setDate(request.getDate());

        return expenseRepository.save(expense);
    }

    @Override 
    public void deleteExpense(Long id){
        Expense expense = getExpenseById(id);

        expenseRepository.delete(expense);
    }

    @Override 
    public List<Expense> getByCategory(String category){
        return expenseRepository.findByCategory(category);
    }


    @Override 
     public List<Expense> getByType(String type){
        return expenseRepository.findByType(type);
    }

    @Override 
    public double getTotalIncome(){
        return expenseRepository.findByType("INCOME")
                .stream()
                .mapToDouble(Expense::getAmount)
                .sum();
    }

    @Override 
    public double getTotalExpense(){
        return expenseRepository.findByType("EXPENSE")
            .stream()
            .mapToDouble(Expense::getAmount)
            .sum();
    }

    @Override 
    public double getBalance(){
        return getTotalIncome() - getTotalExpense();
    }

}
