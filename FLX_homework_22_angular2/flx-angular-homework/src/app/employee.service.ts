import { Injectable } from '@angular/core';
import {Employee} from './models/employee';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employeesUrl = 'api/employees';
  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.employeesUrl)
      .pipe(
        catchError(this.handleError<Employee[]>('getEmployees', []))
      );
  }
  getEmployee(id: number): Observable<Employee> {
    const url = `${this.employeesUrl}/${id}`;
    return this.http.get<Employee>(url).pipe(
      catchError(this.handleError<Employee>(`getEmployee id=${id}`))
    );
  }

  updateEmployee (employee: Employee): Observable<any> {
    return this.http.put(this.employeesUrl, employee, httpOptions).pipe(
      catchError(this.handleError<any>('updateEmployee'))
    );
  }

  deleteEmployee (employee: Employee| number): Observable<Employee> {
    const id = typeof employee === 'number' ? employee :employee.id;
    const url = `${this.employeesUrl}/${id}`;

    return this.http.delete<Employee>(url, httpOptions).pipe(
      catchError(this.handleError<Employee>('deleteEmployee'))
    );
  }
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      console.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

}
