import { Component, OnInit, Input } from '@angular/core';
import { Employee } from '../models/employee';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { EmployeeService }  from '../employee.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  @Input() employee: Employee;

  constructor( private route: ActivatedRoute,
    private employeeService:  EmployeeService,
    private location: Location) { }

    ngOnInit(): void {
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

}
