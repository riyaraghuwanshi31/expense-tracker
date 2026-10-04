package com.expensetracker.expense_tracker.controller;

import com.expensetracker.expense_tracker.dto.ExpenseRequest;
import com.expensetracker.expense_tracker.entity.Expense;
import com.expensetracker.expense_tracker.service.ExpenseService;

import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;


import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;


@RestController 
@RequestMapping("/api/expenses")
@CrossOrigin(origins = "http://localhost:5173")
public class ExpenseController {
    private final ExpenseService expenseService;

    public ExpenseController(ExpenseService expenseService){
        this.expenseService = expenseService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Expense createExpense(
        @Valid @RequestBody ExpenseRequest request) {

        return expenseService.createExpense(request);
    }
    

    @GetMapping
    public List<Expense> getAllExpense() {
        return expenseService.getAllExpense();
    }
    
    @GetMapping("/{id}")
    public Expense getExpenseById(@PathVariable Long id){
        return expenseService.getExpenseById(id);
    }

    @PutMapping("/{id}")
    public Expense updateExpense(@PathVariable Long id,
                            @Valid @RequestBody ExpenseRequest request){
        return expenseService.updateExpense(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteExpense(@PathVariable Long id){
        expenseService.deleteExpense(id);
    }

    @GetMapping("/category/{category}")
    public List<Expense> getByCategory(
        @PathVariable String category){
        return expenseService.getByCategory(category);
    }

    @GetMapping("/type/{type}")
    public List<Expense> getByType(
        @PathVariable String type){
        return expenseService.getByType(type);
    }

    @GetMapping("/summary")
    public Map<String, Double> getSummary(){
        return Map.of(
            "totalIncome", expenseService.getTotalIncome(),
            "totalExpense", expenseService.getTotalExpense(),
            "balance", expenseService.getBalance()
        );
    }

}
