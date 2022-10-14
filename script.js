"use strict";

const billInput = document.getElementById("bill");
const tipInput = document.querySelectorAll(".tip-btn");
const customTip = document.getElementById("custom-tip");
const nrOfPeopleInput = document.getElementById("nrPeople");
const displayTip = document.querySelector(".tip-value");
const displayTotal = document.querySelector(".total-value");
const reset = document.querySelector(".reset-btn");
const errorMsg = document.querySelector(".error-msg");

billInput.addEventListener("input", handleBillInput);
nrOfPeopleInput.addEventListener("input", handlePeopleInput);
customTip.addEventListener("input", handleCustomTip);

billInput.value = "0.0";
nrOfPeopleInput.value = "1";

let billValue = 0.0;
let nrPeople = 1;
let tipValue = 0.0;

function handleBillInput() {
  billValue = parseFloat(billInput.value);
  calcTip();
}

function handlePeopleInput() {
  nrPeople = parseFloat(nrOfPeopleInput.value);
  if (nrPeople < 1) {
    nrOfPeopleInput.style.border = "2px solid red";
    errorMsg.style.display = "inline-block";
  } else {
    nrOfPeopleInput.style.border = "2px solid hsl(172, 67%, 45%)";
    errorMsg.style.display = "none";
  }
  calcTip();
}

function handleCustomTip() {
  tipValue = parseFloat(customTip.value / 100);
  tipInput.forEach((tip) => tip.classList.remove("active-tip"));
  calcTip();
}

//CALCULATING TIP
function calcTip() {
  if (nrPeople >= 1) {
    let tipAmount = (billValue * tipValue) / nrPeople;
    let totalAmount = (billValue + tipAmount * nrPeople) / nrPeople;
    displayTip.innerHTML = "$" + tipAmount.toFixed(2);
    displayTotal.innerHTML = "$" + totalAmount.toFixed(2);
  }
}

//HANDLING TIP BUTTONS ON CLICK
tipInput.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    tipInput.forEach((tipBtn) => {
      tipBtn.classList.remove("active-tip");
    });
    e.target.classList.add("active-tip");
    tipValue = parseFloat(e.target.dataset.percentage);
    calcTip();
  });
});

//HANDLING RESET BUTTON
reset.addEventListener("click", function (e) {
  billInput.value = "";
  customTip.value = "";
  nrOfPeopleInput.value = 1;
  displayTip.innerHTML = "$0.00";
  displayTotal.innerHTML = "$0.00";

  tipInput.forEach((tip) => {
    tip.classList.remove("active-tip");
  });
});
