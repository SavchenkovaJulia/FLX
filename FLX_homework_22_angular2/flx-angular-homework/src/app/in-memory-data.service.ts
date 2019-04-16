import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';
import { Employee } from './models/employee';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const employees = [
      {
        id: 1,
        firstName: 'Bill',
        lastName: 'White',
        age: 23,
        city: 'London',
        gender: 'male',
        description: 'Some description'
      },
      {
        id: 2,
        firstName: 'Tom',
        lastName: 'Freeman',
        age: 53,
        city: 'Chester',
        gender: 'male',
        description: 'Some description'
      },
      {
        id: 3,
        firstName: 'Mary',
        lastName: 'Stark',
        age: 53,
        city: 'Liverpool',
        gender: 'female',
        description: 'Some description'
      },
      {
        id: 4,
        firstName: 'Anna',
        lastName: 'Clark',
        age: 53,
        city: 'Edinburgh',
        gender: 'female',
        description: 'Some description'
      }
    ];
    return {employees};
  }
  genId(employees: Employee[]): number {
    return employees.length > 0 ? Math.max(...employees.map(employee => employee.id)) + 1 : 1;
  }

}