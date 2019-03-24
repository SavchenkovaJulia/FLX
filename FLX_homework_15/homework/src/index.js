function Employee(employee) {
  checkType(employee.name, 'string');
  checkType(employee.primarySkill, 'string');
  checkType(employee.age, 'number');
  checkType(employee.salary, 'number');

  this.name = employee.name;
  this.primarySkill = employee.primarySkill;
  this.age = employee.age;
  this.salary = employee.salary;
  let _logs = [];
  let _startOfWorkTime;

  function checkType(data, expectedType) {
    if (typeof data !== expectedType) {
      throw new TypeError(`${data} is an invalid type`);
    } else if (typeof data === 'number') {
      let zero = 0;
      if (!isFinite(data) || data < zero) {
        throw new RangeError(`${data} is out of range`);
      }
    }
  }

  this.getSalary = function () {
    return this.salary;
  };

  this.setSalary = function (newSalary) {
    checkType(newSalary, 'number');
    if (newSalary < this.salary) {
      _logs.push(`try to change salary from ${this.salary} to ${newSalary}`);
      throw new Error(`Cannot set smaller salary than employee has now`);
    }
    _logs.push(`change salary from ${this.salary} to ${newSalary}`);
    this.salary = newSalary;
  };

  this.hire = function (company) {
    _startOfWorkTime = new Date();
    this.company = company;
    _logs.push(
      `${this.name} starts working at ${this.company} in ${new Date()} `
    );
  };

  this.fire = function () {
    _logs.push(`${this.name} is fired from ${this.company} in ${new Date()}`);
    delete this.company;
  };

  this.getWorkTimeInSeconds = function () {
    let milliseconds = 1000;
    return Math.abs(new Date() - _startOfWorkTime) / milliseconds;
  };

  this.getHistory = function () {
    return _logs;
  };
}

function Company(company) {
  checkType(company.name, 'string');
  checkType(company.owner, 'string');
  checkType(company.maxCompanySize, 'number');

  this.name = company.name;
  this.owner = company.owner;
  this.maxCount = company.maxCompanySize;
  let _companyList = [];
  let _logs = [];

  _logs.push(`${this.name} was created in ${new Date()}`);
  console.log(_logs);
  console.log(_companyList);

  function checkType(data, expectedType) {
    if (typeof data !== expectedType) {
      throw new TypeError(`${data} is an invalid type`);
    } else if (typeof data === 'number') {
      let zero = 0;
      if (!isFinite(data) || data < zero) {
        throw new RangeError(`${data} is out of range`);
      }
    }
  }

  this.addNewEmployee = function (newEmployee) {
    if (!(newEmployee instanceof Employee)) {
      throw new TypeError(`Please try to add Employee instance`);
    }
    if (_companyList.length >= this.maxCount) {
      let employeeToFire = this.findEmployeeToFire();
      this.fire(employeeToFire);
    }
    this.hireEmployee(newEmployee);
  };

  this.hireEmployee = function (newEmployee) {
    _companyList.push(newEmployee);
    newEmployee.hire(this.name);
    _logs.push(
      `${newEmployee.name} starts working at ${this.name} in ${new Date()}`
    );
  };

  this.removeEmployee = function (id) {
    let zero = 0;
    let deleteCount = 1;
    checkType(id, 'number');
    if (id < zero || id >= _companyList.length) {
      throw new RangeError(
        `There is no employee with that id. Id is out of range.`
      );
    } else {
      _logs.push(
        `${_companyList[id].name} ends working at ${this.name} in ${new Date()}`
      );
      _companyList[id].fire();
      _companyList.splice(id, deleteCount);
    }
  };

  this.getSalariesList = function () {
    return _companyList.map(employee => employee.salary);
  };

  this.getLowestSalary = function () {
    return Math.min(...this.getSalariesList());
  };

  this.findEmployeeToFire = function () {
    let minSalary = this.getLowestSalary();
    let employeesWithLowestSalary = [];
    for (let i = 0; i < _companyList.length; i++) {
      if (_companyList[i].salary === minSalary) {
        employeesWithLowestSalary.push(_companyList[i]);
      }
    }
    return this.getLessWorking(employeesWithLowestSalary);
  };
  this.getLessWorking = function (employees) {
    return employees.reduce((a, b) =>
      a.getWorkTimeInSeconds() > b.getWorkTimeInSeconds() ? a : b
    );
  };

  this.fire = function (employee) {
    employee.fire();
    let deleteCount = 1;
    _companyList.splice(
      _companyList.findIndex(e => e.id === employee.id),
      deleteCount
    );
  };

  this.getEmployees = function () {
    _companyList.forEach(employee => console.log(employee));
  };

  this.getFormattedListOfEmployees = function () {
    _companyList.forEach(employee =>
      console.log(
        `${employee.name} works in ${
          this.name
        } ${employee.getWorkTimeInSeconds()} seconds`
      )
    );
  };

  this.getHistory = function () {
    return _logs;
  };

  this.getAverageSalary = function () {
    let sum = 0;
    let numberToFixed = 2;
    _companyList.forEach(employee => {
      sum += employee.salary;
    });
    let average = sum / _companyList.length;
    return average.toFixed(numberToFixed);
  };

  this.getAverageAge = function () {
    let sum = 0;
    let numberToFixed = 2;
    _companyList.forEach(employee => {
      sum += employee.age;
    });
    let average = sum / _companyList.length;
    return average.toFixed(numberToFixed);
  };
}


// let artem = new Employee({
//   name: "Artem",
//   age: 15,
//   salary: 1000,
//   primarySkill: "UX"
// });
// let vova = new Employee({
//   name: "Vova",
//   age: 16,
//   salary: 2000,
//   primarySkill: "BE"
// });
// let vasyl = new Employee({
//   name: "Vasyl",
//   age: 25,
//   salary: 1000,
//   primarySkill: "FE"
// });
// let ivan = new Employee({
//   name: "Ivan",
//   age: 35,
//   salary: 5000,
//   primarySkill: "FE"
// });
// let orest = new Employee({
//   name: "Orest",
//   age: 29,
//   salary: 300,
//   primarySkill: "AT"
// });

// let anton = new Employee({
//   name: "Anton",
//   age: 19,
//   salary: 500,
//   primarySkill: "Manager"
// });

// let epam = new Company({
//   name: "Epam",
//   owner: "Arkadii",
//   maxCompanySize: 5
// });
// epam.addNewEmployee(artem);
// epam.addNewEmployee(vova);
// epam.addNewEmployee(vasyl);
// epam.addNewEmployee(ivan);
// epam.addNewEmployee(orest);
// epam.addNewEmployee(anton);

// console.log(epam.getHistory());
// epam.removeEmployee(2);
// console.log(vasyl.getHistory());

// console.log(epam.getAverageSalary());

// console.log(epam.getAverageAge());
// epam.addNewEmployee(5, 6, 9, 5);
// setTimeout(() => {
//   epam.removeEmployee(1);
//   console.log(artem.getWorkTimeInSeconds()); // -> 5.5744444444444445
// }, 5000);

// vova.setSalary(900);
// vova.setSalary(2200);
// console.log(vova.getHistory());