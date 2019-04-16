import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees: Employee[];
  constructor(private employeeService: EmployeeService) { }

  getEmployees(): void {
    this.employeeService.getEmployees()
        .subscribe(employees=> this.employees = employees);
  }

  delete(employee: Employee): void {
    this.employees = this.employees.filter(e => e !== employee);
    this.employeeService.deleteEmployee(employee).subscribe();
  }

  ngOnInit() {
    this.getEmployees();
  }

}
