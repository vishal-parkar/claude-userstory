package com.example.employeemanagement.controller;

import com.example.employeemanagement.entity.Employee;
import com.example.employeemanagement.service.EmployeeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/employees")
@RequiredArgsConstructor
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @GetMapping
    public ResponseEntity<List<Employee>> getEmployees(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String department,
            @RequestParam(required = false) String status) {

        boolean hasFilter = (search != null && !search.isBlank())
                || (department != null && !department.isBlank())
                || (status != null && !status.isBlank());

        List<Employee> employees = hasFilter
                ? employeeService.searchEmployees(search, department, status)
                : employeeService.getAllEmployees();

        return ResponseEntity.ok(employees);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
        return ResponseEntity.ok(employeeService.getEmployeeById(id));
    }

    @PostMapping
    public ResponseEntity<Employee> createEmployee(@Valid @RequestBody Employee employee) {
        return ResponseEntity.status(HttpStatus.CREATED).body(employeeService.createEmployee(employee));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Employee> updateEmployee(
            @PathVariable Long id,
            @Valid @RequestBody Employee employee) {
        return ResponseEntity.ok(employeeService.updateEmployee(id, employee));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteEmployee(@PathVariable Long id) {
        employeeService.deleteEmployee(id);
        return ResponseEntity.ok(Map.of("message", "Employee deleted successfully"));
    }

    @GetMapping("/departments")
    public ResponseEntity<List<String>> getDepartments() {
        return ResponseEntity.ok(employeeService.getAllDepartments());
    }
}
