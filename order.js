// The NodeList returned from the querySelectorAll and make it an Array, then map the innerText into an array
var strItemNames = Array.from(document.querySelectorAll(".itemName")).map(x => x.innerText);
// var basketOverview = document.querySelector(".basketOverview");
// strItemNames = list.push(function(e) { return e.innerText; });
// console.log(strItemNames);
// console.log(list);

var numberOfitems = document.querySelectorAll(".card-item").length;
var strItemCount = document.querySelectorAll(".itemCount");
var numItemCount = [];


for (var j = 0; j < numberOfitems; j++) {
    // strItemNames.push(strItemNames[j].innerText);
    numItemCount.push(parseInt(strItemCount[j].textContent));
    document.querySelectorAll(".btn-add")[j].addEventListener("click",addItem.bind(this, j));
    document.querySelectorAll(".btn-remove")[j].addEventListener("click",removeItem.bind(this, j));
}

console.log(strItemNames);
function addItem(j, e){
    numItemCount[j] = numItemCount[j] + 1;
    strItemCount[j].textContent = '' + numItemCount[j];
}

function removeItem(j, e){
    if (numItemCount[j] > 0) {
        numItemCount[j] = numItemCount[j] - 1;
        strItemCount[j].textContent = '' + numItemCount[j];
    }
}

//filter
filterSelection("all")
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("filterDiv");
  if (c == "all") c = "";
  // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
  }
}

// Show filtered elements
function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

// Hide elements that are not selected
function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
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

function validateForm() {
  let x = document.forms["requestForm"]["firstName"].value;
  if (x == "") {
    alert("Name must be filled out");
    return false;
  }
}

// Send the order
function submitForm() {
    const form = document.getElementById('requestForm');
    var basket = [];
    var requestor = "";
    for (var i = 0; i < numberOfitems; i++){
        if (numItemCount[i]>0){
        // basket = basket + strItemNames[i]+": "+numItemCount[i]+ ", ";
        basket.push(strItemNames[i]+":"+numItemCount[i]);
        // numItemCount.push(parseInt(strItemCount[j].textContent))
        }
    }
    validateForm();
    form.submit();
    form.style.display = 'none';
    var processing = document.createElement('span');
    processing.appendChild(document.createTextNode('processing ...'));
    form.parentNode.insertBefore(processing, form);
    alert("You have ordered: " + basket);
}