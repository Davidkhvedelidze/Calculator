// const screen = document.querySelector(".screen");
// const clearAll = document.querySelector("#clearAll");
// const clear = document.querySelector("#clear");
// const equal = document.querySelector("#equal");
// const operators = document.querySelectorAll(".operator");
// const

// console.log(screen);

// clear.addEventListener("click", function () {
//   screen.value = screen.value?.slice(0, -1);
// });
// clearAll.addEventListener("click", () => {
//   screen.value = "";
// });

// let numsToOperate = [];
// let operator = "";
// let num1;

// number.forEach((num) => {
//   num.addEventListener("click", function () {
//     display.value += this.textContent;
//     if (numsToOperate.length <= 1) {
//       numsToOperate.push(display.value);
//     } else {
//       return;
//     }
//   });
// });

// operators.forEach((op) => {
//   op.addEventListener("click", function () {
//     if (op.innerHTML !== "=") {
//       operator = op.innerHTML;
//     }

//     screen.value = " ";
//   });
// });

// equal.addEventListener("click", function () {
//   let num1 = Number(numsToOperate[0]);
//   let num2 = Number(numsToOperate[1]);
//   let result;
//   switch (operator) {
//     case "+":
//       result = num1 + num2;
//       break;
//     case "-":
//       result = num1 - num2;
//       break;
//     case "*":
//       result = num1 * num2;
//       break;
//     case "/":
//       result = num1 / num2;
//       break;
//   }

//   screen.value = result;
//   numsToOperate = [];
// });

const display = document.querySelector("#input-field");
const button = document.querySelectorAll("button");

button.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.id === "equal") {
      display.value = eval(display.value.replace(",", ".")).toLocaleString();
    } else if (btn.id === "AC") {
      display.value = "";
    } else if (btn.id == "C") {
      display.value = display.value.slice(0, -1);
    } else {
      if (btn.id === ".") {
        if (!display.value.includes(".")) {
          display.value += ".";
        }
      } else {
        display.value += btn.id;
      }
    }
  });
});
