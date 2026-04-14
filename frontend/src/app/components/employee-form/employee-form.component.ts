import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';

import { EmployeeService } from '../../services/employee.service';
import { Employee, DEPARTMENTS } from '../../models/employee.model';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatDividerModule
  ],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss'
})
export class EmployeeFormComponent implements OnInit {
  form!: FormGroup;
  isEditMode = false;
  employeeId?: number;
  loading = false;
  saving = false;

  departments = DEPARTMENTS;
  maxDate = new Date();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.buildForm();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.employeeId = +id;
      this.loadEmployee(this.employeeId);
    }
  }

  private buildForm(): void {
    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      lastName:  ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email:     ['', [Validators.required, Validators.email]],
      phone:     ['', [Validators.pattern(/^[\d\s\+\-\(\)]{7,20}$/)]],
      department:['', Validators.required],
      position:  ['', [Validators.required, Validators.maxLength(100)]],
      salary:    [null, [Validators.required, Validators.min(0)]],
      hireDate:  [null, Validators.required],
      status:    ['ACTIVE', Validators.required]
    });
  }

  private loadEmployee(id: number): void {
    this.loading = true;
    this.employeeService.getEmployeeById(id).subscribe({
      next: (employee) => {
        this.form.patchValue({
          ...employee,
          hireDate: new Date(employee.hireDate)
        });
        this.loading = false;
      },
      error: () => {
        this.snackBar.open('Failed to load employee data', 'Close', { duration: 3000 });
        this.goBack();
      }
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving = true;
    const rawValue = this.form.getRawValue();
    const employee: Employee = {
      ...rawValue,
      hireDate: this.formatDate(rawValue.hireDate)
    };

    const request$ = this.isEditMode
      ? this.employeeService.updateEmployee(this.employeeId!, employee)
      : this.employeeService.createEmployee(employee);

    request$.subscribe({
      next: () => {
        const msg = this.isEditMode ? 'Employee updated successfully' : 'Employee created successfully';
        this.snackBar.open(msg, 'Close', { duration: 3000 });
        this.router.navigate(['/employees']);
      },
      error: (err) => {
        const msg = err?.error?.message || (this.isEditMode ? 'Failed to update employee' : 'Failed to create employee');
        this.snackBar.open(msg, 'Close', { duration: 4000 });
        this.saving = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/employees']);
  }

  private formatDate(date: Date | string): string {
    if (typeof date === 'string') return date;
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  // Field-level error helpers
  getError(field: string): string {
    const ctrl = this.form.get(field);
    if (!ctrl?.touched || !ctrl.errors) return '';
    if (ctrl.errors['required']) return 'This field is required';
    if (ctrl.errors['email']) return 'Enter a valid email address';
    if (ctrl.errors['minlength']) return `Minimum ${ctrl.errors['minlength'].requiredLength} characters`;
    if (ctrl.errors['maxlength']) return `Maximum ${ctrl.errors['maxlength'].requiredLength} characters`;
    if (ctrl.errors['min']) return 'Must be a positive number';
    if (ctrl.errors['pattern']) return 'Invalid format';
    return 'Invalid value';
  }
}
