// Default filter is set to "all"
filterSelection("all");
resetBasket();

// Filter selection
function filterSelection(chosenFilter) {
  var x, i;
  itemCard = $(".filterDiv");
  if (chosenFilter == "all") chosenFilter = "";
  
  for (i = 0; i < itemCard.length; i++) {
    // Remove the "show" class from elements that are not selected
    removeClass(itemCard[i], "show");
    // Add the "show" class (display:block) to the filtered elements
    if (itemCard[i].className.indexOf(chosenFilter) > -1) addClass(itemCard[i], "show");
  }
}

// Function to add class from an element
function addClass(element, name) {
  var i, existingClass, updatedClass;

  // Split the existing classes and new classes into arrays
  existingClass = element.className.split(" ");
  updatedClass = name.split(" ");

  // Loop through the new classes
  for (i = 0; i < updatedClass.length; i++) {

    // Check if the element doesn't already have the class
    if (existingClass.indexOf(updatedClass[i]) == -1) {

      // Add the class to the element
      element.className += " " + updatedClass[i];
    }
  }
}

// Function to remove class from an element
function removeClass(element, name) {
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


// Add active class to the current control button (highlight it)
var btnContainer = document.getElementById("myBtnContainer");
var btns = btnContainer.getElementsByClassName("mybtn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}

// Product assortments
var productAssortments = Array.from($(".itemName")).map(x => x.innerText);
var numberOfAssortments = productAssortments.length;
var itemCount = $(".itemCount").map(function(){ return parseInt(this.innerText); });
var strItemCount = $(".itemCount");

function resetBasket() {
  
}
// var itemCount = $(".itemCount").map(function(){ return parseInt(this.innerText); });
// var strItemCount = $(".itemCount");

// Add event listener for add item function
$(".btn-add").click(function() {
  addItem($(".btn-add").index(this));
});

// Add event listener for remove item function
$(".btn-remove").click(function() {
  removeItem($(".btn-remove").index(this));
});

// $(".btn-remove")[j].addEventListener("click",removeItem.bind(this, j));

// console.log(strItemNames);
function addItem(j){
  itemCount[j] = itemCount[j] + 1;
  strItemCount[j].textContent = '' + itemCount[j];
  console.log(itemCount);
  // $(".itemCount").index(j).text(itemCount[j]);
  // $(".itemCount").index(j).text(itemCount[j]);
  // var newRequest = new Request(1,1,1,1,1,1,1,itemCount);
  // console.log(newRequest);
}

function removeItem(j){
  if (itemCount[j] > 0) {
    itemCount[j] = itemCount[j] - 1;
      strItemCount[j].textContent = '' + itemCount[j];
  }
  console.log(itemCount);
}

function validateForm() {
  let x = document.forms["requestForm"]["firstName"].value;
  if (x == "") {
    alert("Name must be filled out");
    return false;
  }
}

// Send the order
// function submitForm() {
//     const form = document.getElementById('requestForm');
//     var newRequest = new Request(firstName,lastName,email,phoneNumber,employeeID,costCentre,dueDate,itemCount)
//     console.log(newRequest);
//     var requestor = "";
//     for (var i = 0; i < numberOfitems; i++){
//         if (numItemCount[i]>0){
//         // basket = basket + strItemNames[i]+": "+numItemCount[i]+ ", ";
//         basket.push(strItemNames[i]+":"+numItemCount[i]);
//         // numItemCount.push(parseInt(strItemCount[j].textContent))
//         }
//     }
//     validateForm();
//     form.submit();
//     form.style.display = 'none';
//     var processing = document.createElement('span');
//     processing.appendChild(document.createTextNode('processing ...'));
//     form.parentNode.insertBefore(processing, form);
//     alert("You have ordered: " + basket);
// }


// Create basket object
// function Basket(){
//   var ItemCount = [];
//   for (var j = 0; j < numberOfitems; j++) {
//   // strItemNames.push(strItemNames[j].innerText);
//   numItemCount.push(parseInt(strItemCount[j].textContent));
//   }
//   return ItemCount;
  
// }

// Create request object
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

  
function submitForm(){
//   var submitButton = $(".btnSendForm");
//   submitButton.onclick = Request;
//   const form = $('#requestForm');
  // var newOrder = new Order($('#firstName').val(), $('#lastName').val(), $('#email').val(),
  //   $('#phoneNumber').val(),$('#employeeID').val(),$('#costCentre').val(), $('#dueDate').val(),
  //   itemCount
  // );
  // ,lastName,email,phoneNumber,employeeID,costCentre,dueDate,itemCount)
  // console.log($('#firstName').val());

  // var objects = [];
  const form = $('#requestForm');
$('#requestForm').on('submit', function(e){
  var newOrder = new Order($('#firstName').val(), $('#lastName').val(), $('#email').val(),
    $('#phoneNumber').val(),$('#employeeID').val(),$('#costCentre').val(), $('#expectDate').val(),
    itemCount
  );
    // objects.push({item:{'category':category, 'price':parseFloat(price)}});
    console.log(newOrder);
    // alert("You have ordered: " + newOrder );

    // JSON.stringify(newOrder,null, 4));
    e.preventDefault();

});

//     validateForm();
    form.submit();
    form.css("display","none");
    // alert(`Thank you for your order, ${$('#firstName').val()}!`); 
    resetBasket();
    // form.style.display = 'none';
    // var processing = document.createElement('span');
    // processing.appendChild(document.createTextNode('processing ...'));
    // form.parentNode.insertBefore(processing, form);
    // alert("You have ordered: " + newOrder);
}

// Add event listener for remove item function
// $(".btnSendForm").click(function() {
//   var newRequest = new Request(1,1,1,1,1,1,1,itemCount);
//   console.log(newRequest);
// });

// $(document).ready(function () {
//   $(function () {
//     $("#my_date_picker").datepicker;
//   });
// }) 










