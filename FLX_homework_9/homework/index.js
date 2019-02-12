function findTypes() {
  let result = [];
  for (let i = 0; i < arguments.length; i++) {
    result.push(typeof arguments[i]);
  }
  return result;
}

findTypes(null, 5, 'hello');

function executeforEach(array, userFunction) {
  for (let i = 0; i < array.length; i++) {
    userFunction(array[i]);
  }
}

executeforEach([1, 2, 3], function(el) {
  console.log(el);
});

function mapArray(array, userFunction) {
  let newArray = [];
  executeforEach(array, el => {
    newArray.push(userFunction(el));
  });
  return newArray;
}

mapArray([2, 5, 8], function(el) {
  return el + 3;
});

function filterArray(array, userFunction) {
  let newArray = [];
  executeforEach(array, el => {
    if (userFunction(el)) {
      newArray.push(el);
    }
  });
  return newArray;
}

filterArray([2, 5, 8], function(el) {
  return el > 3;
});

function getAmountOfAdultPeople(data) {
  let result = [];
  filterArray(data, el => {
    if (el.age > 18) {
      result.push(el);
    }
  });
  return result.length;
}

getAmountOfAdultPeople([
  {
    _id: '5b5e3168c6bf40f2c1235cd6',
    index: 0,
    age: 39,
    eyeColor: 'green',
    name: 'Stein',
    favoriteFruit: 'apple'
  },
  {
    _id: '5b5e3168e328c0d72e4f27d8',
    index: 1,
    age: 38,
    eyeColor: 'blue',
    name: 'Cortez',
    favoriteFruit: 'strawberry'
  },
  {
    _id: '5b5e3168cc79132b631c666a',
    index: 2,
    age: 2,
    eyeColor: 'blue',
    name: 'Suzette',
    favoriteFruit: 'apple'
  },
  {
    _id: '5b5e31682093adcc6cd0dde5',
    index: 3,
    age: 19,
    eyeColor: 'green',
    name: 'George',
    favoriteFruit: 'banana'
  }
]);

function getGreenAdultBananaLovers(data) {
  let filteredData = filterArray(data, el => {
    if (
      el.age > 18 &&
      el.favoriteFruit === 'banana' &&
      el.eyeColor === 'green'
    ) {
      return el;
    }
  });
  return mapArray(filteredData, el => {
    return el.name;
  });
}

getGreenAdultBananaLovers([
  {
    _id: '5b5e3168c6bf40f2c1235cd6',
    index: 0,
    age: 39,
    eyeColor: 'green',
    name: 'Stein',
    favoriteFruit: 'apple'
  },
  {
    _id: '5b5e3168e328c0d72e4f27d8',
    index: 1,
    age: 38,
    eyeColor: 'blue',
    name: 'Cortez',
    favoriteFruit: 'strawberry'
  },
  {
    _id: '5b5e3168cc79132b631c666a',
    index: 2,
    age: 2,
    eyeColor: 'blue',
    name: 'Suzette',
    favoriteFruit: 'apple'
  },
  {
    _id: '5b5e31682093adcc6cd0dde5',
    index: 3,
    age: 19,
    eyeColor: 'green',
    name: 'George',
    favoriteFruit: 'banana'
  }
]);

function keys(obj) {
  let result = [];
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      result.push(prop);
    }
  }
  return result;
}

keys({ keyOne: 1, keyTwo: 2, keyThree: 3 });

function values(obj) {
  let result = [];
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      result.push(obj[prop]);
    }
  }
  return result;
}

values({ keyOne: 1, keyTwo: 2, keyThree: 3 });

function showFormattedDate(date) {
  let options = { month: 'short' };
  let month = date.toLocaleString('en-GB', options);

  return `Date: ${date.getDate()} of ${month}, ${date.getFullYear()}`;
}

showFormattedDate(new Date('2019-01-27T01:10:00'));

function isEvenYear(date) {
  let year = date.getFullYear();
  return year % 2 === 0;
}

isEvenYear(new Date('2019-01-27T01:10:00'));

function isEvenMonth(date) {
  let month = date.getMonth() + 1;
  return month % 2 === 0;
}

isEvenMonth(new Date('2019-02-27T01:10:00'));