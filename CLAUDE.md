# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Full-stack Employee Management System:
- **Backend**: Spring Boot 3.3.5 + Java 21 + MySQL
- **Frontend**: Angular 19 + Angular Material

---

## Running the Project

### Prerequisites
- Java 21
- Maven 3.9+
- Node.js 20+
- MySQL running on `localhost:3306`
  - Default credentials: `root` / `root`
  - Database `employee_db` is auto-created on first run

### Backend

```bash
cd backend
mvn spring-boot:run
# Runs on http://localhost:8080
```

Run a single test:
```bash
mvn test -Dtest=EmployeeServiceTest
```

### Frontend

```bash
cd frontend
npm install
npm start          # ng serve — runs on http://localhost:4200
npm run build      # production build
```

---

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/employees` | List all employees (supports `?search=`, `?department=`, `?status=`) |
| GET | `/api/employees/{id}` | Get single employee |
| POST | `/api/employees` | Create employee |
| PUT | `/api/employees/{id}` | Update employee |
| DELETE | `/api/employees/{id}` | Delete employee |
| GET | `/api/employees/departments` | List distinct departments |

---

## Architecture

### Backend (`backend/src/main/java/com/example/employeemanagement/`)

Standard layered architecture:
- `entity/Employee.java` — JPA entity with Lombok (`@Data`, `@Builder`), Bean Validation annotations
- `repository/EmployeeRepository.java` — JPA repository with a custom `@Query` for combined search + department + status filtering
- `service/EmployeeService.java` + `service/impl/EmployeeServiceImpl.java` — business logic, duplicate email detection
- `controller/EmployeeController.java` — REST controller; delegates all search params to the service layer
- `config/CorsConfig.java` — allows `http://localhost:4200`
- `exception/GlobalExceptionHandler.java` — handles `ResourceNotFoundException`, validation errors, and generic exceptions

### Frontend (`frontend/src/app/`)

Standalone Angular 19 application with lazy-loaded routes:

- `app.config.ts` — bootstraps `provideRouter`, `provideHttpClient`, `provideAnimationsAsync`
- `app.routes.ts` — lazy-loads `EmployeeListComponent` (`/employees`) and `EmployeeFormComponent` (`/employees/new`, `/employees/edit/:id`)
- `models/employee.model.ts` — `Employee` interface + `DEPARTMENTS` constant
- `services/employee.service.ts` — all HTTP calls; maps query params for server-side filtering
- `components/employee-list/` — `MatTable` with `MatPaginator` + `MatSort`; search debounced via `debounceTime(400)`; reactive filter controls trigger `loadEmployees()`
- `components/employee-form/` — reactive form for create/edit; date formatted to `YYYY-MM-DD` before POST/PUT
- `components/confirm-dialog/` — reusable `MatDialog` for delete confirmation

### Key Design Decisions
- Filtering is **server-side**: search/department/status params are passed to the backend `@Query`
- `MatTableDataSource` is used for client-side pagination + sorting of the already-filtered result set
- Angular Material `indigo-pink` prebuilt theme is included via `angular.json` styles array
- All components are **standalone** (no NgModule)

---

## Database

MySQL at `localhost:3306`, credentials in `backend/src/main/resources/application.properties`. To use different credentials, update:
```properties
spring.datasource.username=root
spring.datasource.password=root
```
`ddl-auto=update` — Hibernate auto-creates/updates the `employees` table on startup.
