package com.example.employeemanagement.service;

import com.example.employeemanagement.entity.Employee;

import java.util.List;

public interface EmployeeService {
    List<Employee> getAllEmployees();
    List<Employee> searchEmployees(String search, String department, String status);
    Employee getEmployeeById(Long id);
    Employee createEmployee(Employee employee);
    Employee updateEmployee(Long id, Employee employee);
    void deleteEmployee(Long id);
    List<String> getAllDepartments();
}
