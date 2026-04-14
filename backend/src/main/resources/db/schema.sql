-- ============================================================
-- Employee Management System - Database Schema
-- MySQL 8.x | Database: employee_db
-- ============================================================

CREATE DATABASE IF NOT EXISTS employee_db
    DEFAULT CHARACTER SET utf8mb4
    DEFAULT COLLATE utf8mb4_unicode_ci;

USE employee_db;

-- ------------------------------------------------------------
-- Table: employees
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS employees (
    id          BIGINT          NOT NULL AUTO_INCREMENT,
    first_name  VARCHAR(50)     NOT NULL,
    last_name   VARCHAR(50)     NOT NULL,
    email       VARCHAR(100)    NOT NULL,
    phone       VARCHAR(20)     NULL,
    department  VARCHAR(100)    NOT NULL,
    position    VARCHAR(100)    NOT NULL,
    salary      DOUBLE          NOT NULL,
    hire_date   DATE            NOT NULL,
    status      VARCHAR(20)     NOT NULL DEFAULT 'ACTIVE',
    created_at  DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT pk_employees         PRIMARY KEY (id),
    CONSTRAINT uq_employees_email   UNIQUE (email),
    CONSTRAINT chk_employees_status CHECK (status IN ('ACTIVE', 'INACTIVE')),
    CONSTRAINT chk_employees_salary CHECK (salary >= 0)
);

-- ------------------------------------------------------------
-- Indexes for frequent filter/search columns
-- ------------------------------------------------------------
CREATE INDEX idx_employees_department ON employees (department);
CREATE INDEX idx_employees_status     ON employees (status);
CREATE INDEX idx_employees_hire_date  ON employees (hire_date);

-- ------------------------------------------------------------
-- Sample data (optional — remove in production)
-- ------------------------------------------------------------
INSERT INTO employees (first_name, last_name, email, phone, department, position, salary, hire_date, status) VALUES
('Alice',   'Johnson',  'alice.johnson@company.com',  '+1-555-0101', 'Engineering', 'Senior Software Engineer', 95000, '2021-03-15', 'ACTIVE'),
('Bob',     'Smith',    'bob.smith@company.com',      '+1-555-0102', 'Engineering', 'DevOps Engineer',          88000, '2020-07-01', 'ACTIVE'),
('Carol',   'Williams', 'carol.williams@company.com', '+1-555-0103', 'HR',          'HR Manager',               72000, '2019-11-20', 'ACTIVE'),
('David',   'Brown',    'david.brown@company.com',    '+1-555-0104', 'Finance',     'Financial Analyst',        78000, '2022-01-10', 'ACTIVE'),
('Eva',     'Davis',    'eva.davis@company.com',      '+1-555-0105', 'Marketing',   'Marketing Lead',           81000, '2021-06-30', 'ACTIVE'),
('Frank',   'Miller',   'frank.miller@company.com',   '+1-555-0106', 'Sales',       'Sales Executive',          65000, '2023-02-14', 'ACTIVE'),
('Grace',   'Wilson',   'grace.wilson@company.com',   '+1-555-0107', 'IT',          'IT Support Specialist',    60000, '2022-09-05', 'ACTIVE'),
('Henry',   'Moore',    'henry.moore@company.com',    NULL,          'Operations',  'Operations Manager',       90000, '2018-04-22', 'ACTIVE'),
('Iris',    'Taylor',   'iris.taylor@company.com',    '+1-555-0109', 'Legal',       'Legal Counsel',            105000,'2020-12-01', 'INACTIVE'),
('Jack',    'Anderson', 'jack.anderson@company.com',  '+1-555-0110', 'Engineering', 'Junior Developer',         62000, '2024-01-08', 'ACTIVE');
