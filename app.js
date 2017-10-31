'use strict';

// Generate variables to feed into the Constructor and put them in an array
var firstAndPike = new Store('1st and Pike', 23, 65, 6.3);
var seaTac = new Store('SeaTac Airport', 3, 24, 1.2);
var seattleCenter = new Store('Seattle Center', 11, 38, 3.7);
var capitolHill = new Store('Capitol Hill', 20, 38, 2.3);
var alki = new Store('Alki', 2, 16, 4.6);
var stores = [firstAndPike, seaTac, seattleCenter, capitolHill, alki];

// Generate store hours
var hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];

// Constructor function to create objects
function Store(name, minCust, maxCust, avgCookCust) {
  this.name = name;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgCookCust = avgCookCust;
  this.customersHour = [];
  this.totalSalesByHour = [];
  this.totalSalesDay = 0;
};

// Generate a random number of customers
Store.prototype.randomCookie = function() {
  return Math.floor((Math.random() * (this.maxCust - this.minCust)) + this.minCust);
};

// Take the random number of customers to determine number of cookies sold per hour and per day
Store.prototype.hourlySales = function() {
  var custHour;
  var cookiesHour;
  var cookiesDay = 0;
  for (var i = 0; i < hours.length; i++) {
    custHour = this.randomCookie();
    this.customersHour.push(custHour);
    cookiesHour = Math.floor(custHour * this.avgCookCust);
    this.totalSalesByHour.push(cookiesHour);
    cookiesDay += cookiesHour;
  };
  this.totalSalesDay = cookiesDay;
};

// Run the hourly sales function for each store object
function generateHourlySales() {
  for(var h = 0; h < stores.length; h++) {
    stores[h].hourlySales();
  }
}

// Draw the cookie sales table
function drawSalesTable() {
  var j = 0;
  var store = stores[j];
  var tHeader = document.getElementById('table_cookie_header');
  var tHeaderRow = document.createElement('tr');
  var tHeaderData = document.createElement('td');
  tHeaderRow.appendChild(tHeaderData);
  for (var i = 0; i < hours.length; i++) {
    tHeaderData = document.createElement('td');
    // var newText = document.createTextNode(hours[i]);
    tHeaderData.innerHTML = hours[i];
    tHeaderRow.appendChild(tHeaderData);
  }
  tHeaderData = document.createElement('td');
  tHeaderData.innerHTML = 'Daily Location Total';
  tHeaderRow.appendChild(tHeaderData);
  tHeader.appendChild(tHeaderRow);
  var tBody = document.getElementById('table_cookie_content');
  var tRow;
  var tData;
  for (j = 0; j < stores.length; j++) {
    store = stores[j];
    tRow = document.createElement('tr');
    tData = document.createElement('td');
    tData.innerHTML = store.name;
    tRow.appendChild(tData);
    for (var k = 0; k < hours.length; k++) {
      tData = document.createElement('td');
      tData.innerHTML = store.totalSalesByHour[k];
      tRow.appendChild(tData);
    }
    tData = document.createElement('td');
    tData.innerHTML = store.totalSalesDay;
    tRow.appendChild(tData);
    tBody.appendChild(tRow);
  }
  var allStoresHour = 0;
  var tFooter = document.getElementById('table_cookie_footer');
  var tFooterRow = document.createElement('tr');
  var tFooterData = document.createElement('td');
  tFooterData.innerHTML = 'Totals:';
  tFooterRow.appendChild(tFooterData);
  for (var l = 0; l < hours.length; l++) {
    tFooterData = document.createElement('td');
    for (var m = 0; m < stores.length; m++) {
      allStoresHour += stores[m].totalSalesByHour[l];
    }
    tFooterData.innerHTML = allStoresHour;
    allStoresHour = 0;
    tFooterRow.appendChild(tFooterData);
  }
  tFooterData = document.createElement('td');
  tFooterRow.appendChild(tFooterData);
  tFooter.appendChild(tFooterRow);
}

// Draw the staffing table
function drawStaffTable() {
  var j = 0;
  var store = stores[j];
  var tHeader = document.getElementById('table_staff_header');
  var tHeaderRow = document.createElement('tr');
  var tHeaderData = document.createElement('td');
  tHeaderRow.appendChild(tHeaderData);
  for (var i = 0; i < hours.length; i++) {
    tHeaderData = document.createElement('td');
    tHeaderData.innerHTML = hours[i];
    tHeaderRow.appendChild(tHeaderData);
  }
  tHeader.appendChild(tHeaderRow);
  var tBody = document.getElementById('table_staff_content');
  var tRow;
  var tData;
  var staffNeeded = 0;
  for (j = 0; j < stores.length; j++) {
    store = stores[j];
    tRow = document.createElement('tr');
    tData = document.createElement('td');
    tData.innerHTML = store.name;
    tRow.appendChild(tData);
    for (var k = 0; k < hours.length; k++) {
      staffNeeded = Math.ceil(store.customersHour[k] / 20);
      if (staffNeeded < 2) {
        staffNeeded = 2;
      }
      tData = document.createElement('td');
      tData.innerHTML = staffNeeded;
      tRow.appendChild(tData);
    }
    tBody.appendChild(tRow);
  }
}

// Look for form data
var form = document.getElementById('store_form');
form.addEventListener('submit', formData);

// Add the form data to both tables
function formData(event) {
  event.preventDefault();
  var name = event.target.name.value;
  var minCust = event.target.min_cust.value;
  var maxCust = event.target.max_cust.value;
  var avgCust = event.target.avg_cook_cust.value;
  var newStore = new Store(name, minCust, maxCust, avgCust);
  newStore.hourlySales();
  stores.push(newStore);
  document.getElementById('table_cookie_header').innerHTML = '';
  document.getElementById('table_cookie_content').innerHTML = '';
  document.getElementById('table_cookie_footer').innerHTML = '';
  drawSalesTable();
  document.getElementById('table_staff_header').innerHTML = '';
  document.getElementById('table_staff_content').innerHTML = '';
  document.getElementById('table_staff_footer').innerHTML = '';
  drawStaffTable();
  form.reset();
}

generateHourlySales();
drawSalesTable();
drawStaffTable();

// Auto-expand text area for forms
function adjust_textarea(h) {
  h.style.height = "20px";
  h.style.height = (h.scrollHeight)+"px";
}
