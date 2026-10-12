//this function calculates prices of coffee based on size, quantity, membership status, and time of day
// and is validated using if statements and switch statements 

function calculatePrice(size, quantity, isMember, hour){


if (size !== "small" && size !== "medium" && size !== "large") {
    return "Invalid size"; 
 }

if (!Number.isInteger(quantity) || quantity <= 0) {
    return "Invalid quantity";
}

if (!Number.isInteger(hour) || hour < 0 || hour > 23) {
    return "Invalid hour";
}

let basePrice = 0;

switch (size) {
  case "small":
    basePrice = 2.5; 
    break;
  case "medium":
    basePrice = 3.5;
    break;
  case "large":
    basePrice = 4.5;
    break;
}

let total = basePrice * quantity;

if(quantity >= 5) {
    total *= 0.9;
}

if(isMember) {
    total *= 0.95;
}

if (hour >= 15 && hour <= 17) {
    total = total - 1;
  }


  if (total < 0) {
    return 0;
  }
  return Math.round(total * 100) / 100;

}



function printPriceTable(size, isMember, hour){

    let quantity = 1;
    for(quantity;quantity <= 10; quantity++){
        let price = calculatePrice(size, quantity, isMember, hour);
        console.log("Qty " + quantity + " -> $" + price.toFixed(2));
    }

}

function cheapestHour(size, quantity, isMember) {

    let cheapestPrice = calculatePrice(size, quantity, isMember, 0);
    let cheapestHour = 0;
    let hour = 0;

    for(hour; hour < 24; hour++){

        let price = calculatePrice(size, quantity, isMember, hour);
            if(price < cheapestPrice){
                cheapestPrice = price;
                cheapestHour = hour;
            }   

    }
    let formattedHour = cheapestHour < 10 ? "0" + cheapestHour : cheapestHour;

    console.log("The best time to order " + quantity + " " + size + " coffees is at " + formattedHour + ":00 for $" + cheapestPrice.toFixed(2));

    return cheapestHour;
}
console.log(calculatePrice("large", 2, false, 10));
console.log(calculatePrice("medium", 5, true, 16));  
console.log(calculatePrice("small", 4, true, 9));  
console.log(calculatePrice("small", 1, false, 15));  
console.log(calculatePrice("x1", 1, false, 9));      
console.log(calculatePrice("large", 0, false, 9));   
console.log(calculatePrice("large", 2.5, true, 9));  
console.log(calculatePrice("medium", 2, true, 25));
console.log(calculatePrice("large", 5, true, 16));
console.log(calculatePrice("small", 1, false, 16));
