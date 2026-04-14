import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private readonly apiUrl = 'http://localhost:8080/api/employees';

  constructor(private http: HttpClient) {}

  getEmployees(search?: string, department?: string, status?: string): Observable<Employee[]> {
    let params = new HttpParams();
    if (search?.trim()) params = params.set('search', search.trim());
    if (department?.trim()) params = params.set('department', department.trim());
    if (status?.trim()) params = params.set('status', status.trim());
    return this.http.get<Employee[]>(this.apiUrl, { params });
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }

  createEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employee);
  }

  updateEmployee(id: number, employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/${id}`, employee);
  }

  deleteEmployee(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }

  getDepartments(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/departments`);
  }
}
