function User(name) {
   this.name = name;
   this.orderTotalPrice = 0;
   this.weekendDiscount = 0;
   this.nightDiscount = 0;
   this.bonus = 0;

   this.makeOrder = function () {
      return `Price after discount and including bonuses is ${this.orderTotalPrice - this.bonus}`;
   };
}

function getDiscount(user) {
   let date = new Date();
   let discount = 0;
   if (date.getHours() === 23 || date.getHours() <= 6) {
      discount += (user.orderTotalPrice * user.nightDiscount) / 100;
   }
   if (date.getDay() === 6 || date.getDay() === 0) {
      discount += (user.orderTotalPrice * user.weekendDiscount) / 100;
   }
   user.orderTotalPrice -= discount;
   return user.orderTotalPrice;
}

function setBonus(user) {
   if (user.orderTotalPrice >= 100) {
      user.bonus= Math.floor(user.orderTotalPrice / 100) * 5;
   }
}
let tom = new User('Tom');
tom.orderTotalPrice = 300;
tom.weekendDiscount = 5;
tom.nightDiscount = 10;
getDiscount(tom);
setBonus(tom);
console.log(tom.makeOrder());

