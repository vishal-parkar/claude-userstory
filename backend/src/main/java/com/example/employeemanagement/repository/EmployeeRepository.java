package com.example.employeemanagement.repository;

import com.example.employeemanagement.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    Optional<Employee> findByEmail(String email);

    boolean existsByEmail(String email);

    boolean existsByEmailAndIdNot(String email, Long id);

    @Query("SELECT e FROM Employee e WHERE " +
           "(:search IS NULL OR :search = '' OR " +
           " LOWER(e.firstName) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           " LOWER(e.lastName) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           " LOWER(e.email) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           " LOWER(e.position) LIKE LOWER(CONCAT('%', :search, '%'))) AND " +
           "(:department IS NULL OR :department = '' OR e.department = :department) AND " +
           "(:status IS NULL OR :status = '' OR e.status = :status)")
    List<Employee> findEmployees(
            @Param("search") String search,
            @Param("department") String department,
            @Param("status") String status
    );
}
