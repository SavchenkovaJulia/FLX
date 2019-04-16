import { Component, OnInit, Input } from '@angular/core';
import { Employee } from '../models/employee';
import { EmployeeService }  from '../employee.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {
  @Input() employee: Employee;
  employees: Employee[] = [];
  constructor(private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    this.getEmployee();
  }
  getEmployee(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.employeeService.getEmployee(id)
      .subscribe(employee => this.employee = employee);
  }
  goBack(): void {
    this.location.back();
  }
  save(): void {
    this.employeeService.updateEmployee(this.employee)
      .subscribe(() => this.goBack());
  }

}
