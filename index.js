// Product assortments
// const productAssortments = Array.from($(".itemName")).map(x => x.innerText);
const productNameAssortments = Array.from($(".productName")).map(x => x.innerText);
const numberOfAssortments = productNameAssortments.length;

// Filter buttons
const filterBtn = $(".filterBtn");

// Item count in the order
let itemCount = $(".itemCount").map(function(){ return parseInt(this.innerText); });
let strItemCount = $(".itemCount");

// Filter selection
function filterSelection(chosenFilter) {
  let i;
  itemCard = $(".filterDiv");
  if (chosenFilter === "all") chosenFilter = "";
  
  for (i = 0; i < itemCard.length; i++) {
    // Remove the "show" class from elements that are not selected
    removeFilterClass(itemCard[i], "show");
    // Add the "show" class (display:block) to the filtered elements
    if (itemCard[i].className.indexOf(chosenFilter) > -1) addFilterClass(itemCard[i], "show");
  }
}

// Function to add class from an element
function addFilterClass(element, name) {
  let i, existingClass, updatedClass;

  // Split the existing classes and new classes into arrays
  existingClass = element.className.split(" ");
  updatedClass = name.split(" ");

  // Loop through the new classes
  for (i = 0; i < updatedClass.length; i++) {

    // Check if the element doesn't already have the class
    if (existingClass.indexOf(updatedClass[i]) === -1) {

      // Add the class to the element
      element.className += " " + updatedClass[i];
    }
  }
}

// Function to remove class from an element
function removeFilterClass(element, name) {
  var i, existingClass, updatedClass;

  // Split the existing classes and new classes into arrays
  existingClass = element.className.split(" ");
  updatedClass = name.split(" ");

  // Loop through the new classes
  for (i = 0; i < updatedClass.length; i++) {
    // While the class exists in the element's classes
    while (existingClass.indexOf(updatedClass[i]) > -1) {
      // Remove the class from the array of classes
      existingClass.splice(existingClass.indexOf(updatedClass[i]), 1);
    }
  }
  
  // Reassign the updated classes to the element
  element.className = existingClass.join(" ");
}

// Update itemCount when adding item
function addItem(j){
  itemCount[j] = itemCount[j] + 1;
  strItemCount[j].textContent = '' + itemCount[j];
  console.log(itemCount);
  updateBasket();
}

// Update itemCount when removing item
function removeItem(j){
  if (itemCount[j] > 0) {
    itemCount[j] = itemCount[j] - 1;
    strItemCount[j].textContent = '' + itemCount[j];
  }
  console.log(itemCount);
  updateBasket();
}

// Display the current basket
function updateBasket() {
  let i;
  let basketText = "";
  let totalCount = 0;
  if (Math.max(...itemCount) === 0) {
    $(".currentBasket").html("");
    $("#totalCount").html(0);
  } else {
    for (i = 0; i < numberOfAssortments; i++) {
      if (itemCount[i] != 0) {
        basketText = basketText + "<li class='list-group-item d-flex justify-content-between lh-sm'><h6 class='my-0'>" + productNameAssortments[i] + "</h6><span class='text-body-secondary'>" +  itemCount[i] + "</span></li>";
        totalCount = totalCount + itemCount[i];
        console.log(totalCount);
      }
      $(".currentBasket").html(basketText);
      $("#totalCount").text(totalCount);
    }
  }
 }



// Constructor to create Order object
class Order {
  constructor(firstName, lastName, email, phoneNumber, employeeID, costCentre, dueDate, itemCount) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.employeeID = employeeID;
    this.costCentre = costCentre;
    this.dueDate = dueDate;
    this.itemCount = itemCount;
  }
}

// Add event listener for highlight the active filter
$(".filterBtn").click(function() {
  let i;
  let current = $(".filterBtn").index(this);// position that clicked

  for (i = 0; i < filterBtn.length; i++) {
    if (i === current) {
      addFilterClass(filterBtn[i], "active");
    } else {
      removeFilterClass(filterBtn[i], "active");
    }
  }
});

// Add event listener for adding item 
$(".btn-add").click(function() {
  addItem($(".btn-add").index(this));
});

// Add event listener for removing item 
$(".btn-remove").click(function() {
  removeItem($(".btn-remove").index(this));
});

//Add custom email validation
$('#emailInput').on('input', function(){ 
  const emailInput = this.value;
  const allowedDomain = "toperator.com";
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  console.log(emailInput);

  if (emailInput.includes(allowedDomain)) {
    if (emailRegex.test(this.value)) {
      this.setCustomValidity('');
    } else {
      this.setCustomValidity('Please enter a valid email address');
    }
  } else {
    this.setCustomValidity('Email must be from toperator.com domain');
  }
});

// Add event listener for submiting the order
$('#requestForm').on('submit', function(e){
  const form = $('#requestForm');
  e.preventDefault();
  if (this.checkValidity() === false) {
    e.stopPropagation();
    this.classList.add("was-validated");
  } else if (Math.max(...itemCount) === 0) {
    alert("Please add some item(s) to your order!");
  } else {
    //new Order object is created and ready for further submission
    var newOrder = new Order($('#firstName').val(), $('#lastName').val(), $('#email').val(),
      $('#phoneNumber').val(),$('#employeeID').val(),$('#costCentre').val(), $('#expectDate').val(),
      itemCount);
    console.log(newOrder);

    // After "Successful" submission, hide the item display and form sections
    $(".formDisplay").css("display","none");
    $("#productsDisplay").css("display","none");
    $("h1").html(`Thank you for your order, <strong>${$('#firstName').val()}</strong>!`);
    $(".subtitle").html(`A confirmation email has been sent to ${$('#email').val()}.`); 
  }
});

// Default filter is set to "all"
filterSelection("all");














