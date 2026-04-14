import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatBadgeModule } from '@angular/material/badge';

import { EmployeeService } from '../../services/employee.service';
import { Employee, DEPARTMENTS } from '../../models/employee.model';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatTooltipModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatBadgeModule
  ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss'
})
export class EmployeeListComponent implements OnInit {
  displayedColumns: string[] = [
    'id', 'firstName', 'lastName', 'email', 'phone',
    'department', 'position', 'salary', 'hireDate', 'status', 'actions'
  ];

  dataSource = new MatTableDataSource<Employee>([]);
  loading = false;
  totalEmployees = 0;

  searchControl = new FormControl('');
  departmentControl = new FormControl('');
  statusControl = new FormControl('');

  departments = DEPARTMENTS;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadEmployees();

    this.searchControl.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(() => this.loadEmployees());

    this.departmentControl.valueChanges.subscribe(() => this.loadEmployees());
    this.statusControl.valueChanges.subscribe(() => this.loadEmployees());
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadEmployees(): void {
    this.loading = true;
    const search = this.searchControl.value ?? '';
    const department = this.departmentControl.value ?? '';
    const status = this.statusControl.value ?? '';

    this.employeeService.getEmployees(search, department, status).subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.totalEmployees = data.length;
        this.loading = false;
      },
      error: () => {
        this.snackBar.open('Failed to load employees', 'Close', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  clearFilters(): void {
    this.searchControl.setValue('');
    this.departmentControl.setValue('');
    this.statusControl.setValue('');
  }

  get hasActiveFilters(): boolean {
    return !!(this.searchControl.value || this.departmentControl.value || this.statusControl.value);
  }

  addEmployee(): void {
    this.router.navigate(['/employees/new']);
  }

  editEmployee(id: number): void {
    this.router.navigate(['/employees/edit', id]);
  }

  deleteEmployee(employee: Employee): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete Employee',
        message: `Are you sure you want to delete ${employee.firstName} ${employee.lastName}?`
      }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.employeeService.deleteEmployee(employee.id!).subscribe({
          next: () => {
            this.snackBar.open('Employee deleted successfully', 'Close', { duration: 3000 });
            this.loadEmployees();
          },
          error: () => {
            this.snackBar.open('Failed to delete employee', 'Close', { duration: 3000 });
          }
        });
      }
    });
  }

  formatSalary(salary: number): string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(salary);
  }
}
