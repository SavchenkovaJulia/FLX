import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EmployeesComponent} from './employees/employees.component'
import { EmployeeDetailsComponent }  from './employee-details/employee-details.component';
import {EmployeeEditComponent} from './employee-edit/employee-edit.component';

const routes: Routes = [
  { path: 'employees', component: EmployeesComponent },
  { path: 'employee/:id', component:  EmployeeDetailsComponent},
  { path: '', redirectTo: '/employees', pathMatch: 'full' },
  { path: 'edit/:id', component:  EmployeeEditComponent},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}