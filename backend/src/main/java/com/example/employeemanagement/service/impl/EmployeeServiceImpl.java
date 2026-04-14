package com.example.employeemanagement.service.impl;

import com.example.employeemanagement.entity.Employee;
import com.example.employeemanagement.exception.ResourceNotFoundException;
import com.example.employeemanagement.repository.EmployeeRepository;
import com.example.employeemanagement.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;

    @Override
    @Transactional(readOnly = true)
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public List<Employee> searchEmployees(String search, String department, String status) {
        return employeeRepository.findEmployees(search, department, status);
    }

    @Override
    @Transactional(readOnly = true)
    public Employee getEmployeeById(Long id) {
        return employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + id));
    }

    @Override
    public Employee createEmployee(Employee employee) {
        if (employeeRepository.existsByEmail(employee.getEmail())) {
            throw new IllegalArgumentException("Email already exists: " + employee.getEmail());
        }
        return employeeRepository.save(employee);
    }

    @Override
    public Employee updateEmployee(Long id, Employee employeeDetails) {
        Employee existing = getEmployeeById(id);

        if (employeeRepository.existsByEmailAndIdNot(employeeDetails.getEmail(), id)) {
            throw new IllegalArgumentException("Email already in use: " + employeeDetails.getEmail());
        }

        existing.setFirstName(employeeDetails.getFirstName());
        existing.setLastName(employeeDetails.getLastName());
        existing.setEmail(employeeDetails.getEmail());
        existing.setPhone(employeeDetails.getPhone());
        existing.setDepartment(employeeDetails.getDepartment());
        existing.setPosition(employeeDetails.getPosition());
        existing.setSalary(employeeDetails.getSalary());
        existing.setHireDate(employeeDetails.getHireDate());
        existing.setStatus(employeeDetails.getStatus());

        return employeeRepository.save(existing);
    }

    @Override
    public void deleteEmployee(Long id) {
        Employee employee = getEmployeeById(id);
        employeeRepository.delete(employee);
    }

    @Override
    @Transactional(readOnly = true)
    public List<String> getAllDepartments() {
        return employeeRepository.findAll()
                .stream()
                .map(Employee::getDepartment)
                .distinct()
                .sorted()
                .toList();
    }
}
