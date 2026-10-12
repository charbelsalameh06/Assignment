const orders = [ 
  { id: 1, customer: "Rami",  items: ["latte", "croissant"],          total: 7.5 }, 
  { id: 2, customer: "Lea",   items: ["espresso"],                    total: 3.0 }, 
  { id: 3, customer: "Rami",  items: ["latte", "muffin"],             total: 8.0 }, 
  { id: 4, customer: "Karim", items: ["mocha", "croissant"],          total: 9.0 }, 
  { id: 5, customer: "Lea",   items: ["latte"],                       total: 4.5 }, 
  { id: 6, customer: "Nour",  items: ["espresso", "latte", "muffin"], total: 10.5 }, 
]; 
 
const mondayCustomers  = ["Rami", "Lea", "Karim", "Nour"]; 
const tuesdayCustomers = ["Lea", "Nour", "Tony", "Rami", "Lea"];

//returns the sum of the totals 
function getTotalRevenue(orders){
   return orders.reduce((sum, orders) => sum  + orders.total, 0);
}
console.log("Total Revenue:",getTotalRevenue(orders));


//returns the orders whose total that are greater or equal to a minimum given
function getBigOrders(orders, min){
    return orders.filter(order => order.total >= min);
}
console.log("Totals who are greater or equal then 8 (minimum):",getBigOrders(orders,8));
console.log("Totals who are greater or equal then 5 (minimum):",getBigOrders(orders,5));
console.log("Totals who are greater or equal then 10 (minimum):",getBigOrders(orders,10));


//returns an array summarizing the strings per order in a given format
function getOrderSummaries(orders){
    return orders.map(order => `#${order.id} ${order.customer} - ${order.items.length} item(s) - $${order.total.toFixed(2)}`);
}
console.log("Order Summaries:",getOrderSummaries(orders));


//returns a new array sorted highest to lowest according to their total, without altering the original array
function getSortedByTotal(orders){
    return [...orders].sort((a,b) => b.total - a.total);
}
console.log("Orders Sorted By Total (ids):",getSortedByTotal(orders).map(order => order.id));
console.log("Original Order (ids):",orders.map(order => order.id));


//returns the ids of all orders if it contains a given item
function findOrdersByItem(orders, item){
    return orders.filter(order => order.items.includes(item)).map(order => order.id);
}
console.log("Order With Specific Item (muffin):",findOrdersByItem(orders, "muffin"));
console.log("Order With Specific Item (latte):",findOrdersByItem(orders, "latte"));
console.log("Order With Specific Item (croissant):",findOrdersByItem(orders, "croissant"));


//returns how many items each item was ordered in an object
function countItems(orders){
   return orders.flatMap(order => order.items).reduce((counts,item) => {
    counts[item] = (counts[item] || 0) + 1;
    return counts;
   }, {});
}
console.log("Item Counts:",countItems(orders));

//returns the most ordered item
function getMostPopularItem(orders){
    const counts = countItems(orders);
    let most = null;
    for(const item in counts){
        if(most == null || counts[item] > counts[most]){
            most = item;
        }
    }
    return most;
}
console.log("Most Popular Item:",getMostPopularItem(orders));

//returns the spending of each customer
function getSpendingPerCustomer(orders){
    return orders.reduce((spending,order) => {
        spending[order.customer] = (spending[order.customer] || 0) + order.total;
        return spending;
    }, {});
}
console.log("Spending Per Customer:",getSpendingPerCustomer(orders));

//returns a new unique array with customer names
function getUniqueCustomers(orders){
    return  [... new Set(orders.map(order => order.customer))];
}
console.log("Unique Customer:",getUniqueCustomers(orders));

//returns a new unique array with the item names
function getAllItems(orders){
    return [... new Set(orders.flatMap(order => order.items))];
}
console.log("All Distinct Items:",getAllItems(orders));

const mondaySet = new Set(mondayCustomers);
const tuesdaySet = new Set(tuesdayCustomers);

//returns customers who came on both days
function bothDays(setA, setB){
    return [... setA].filter(name => setB.has(name));
}

//returns customers who came on the first day only
function onlyFirstDay(setA, setB){
    return [... setA].filter(name => !setB.has(name));
}

//returns customers who came on either day
function allCustomers(setA, setB){
    return [... new Set ([...setA, ...setB])];
}

console.log("Customers Who Came Both Days:",bothDays(mondaySet, tuesdaySet));
console.log("Customers Who Came Only On Monday:",onlyFirstDay(mondaySet, tuesdaySet));
console.log("Customers Who Came Either Monday Or Tuesday:",allCustomers(mondaySet, tuesdaySet));

//the size of tuesdayCustomers is 5 
//but the name "Lea" appears twice 
// and because Set does not take into account duplicates
// the duplicate "Lea" is dropped, and the size will be 4 not 5
console.log("Distinct Tuesday Customers:",tuesdaySet.size);