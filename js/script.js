const selectRoute = document.getElementById("route");
const selectTime = document.getElementById("time");
const inputQuantity = document.getElementById("num");
const block = document.querySelector(".message");
const btn = document.querySelector(".button");

const oneWayTravelTime = 50;
const costOneWayTicket = 700;
const costRoundTripticket = 1500;
const keyWordForSearch = "обратно";
const arrTimeBfromA = ["18:45", "19:00", "19:15", "19:35", "21:50", "21:55"];
const arrTimeAfromB = ["18:00", "18:30", "18:45", "19:00", "19:15", "21:00"];

let selectedRoute = selectRoute.value;
let arrivalTimeRoundTrip = 0;
let selectedTime = selectTime.value.match(/[0-9:]/gm);
let arrivalTime = "18:50";
let price = costOneWayTicket;
let time = oneWayTravelTime;
let quantity = 0;

selectRoute.addEventListener("change", (event) => {
  selectedRoute = event.target.value;
  if (selectedRoute.includes(keyWordForSearch)) {
    removeOption(selectTime);
    optionAfromB(arrTimeAfromB, selectTime);
    price = costRoundTripticket;
    time = oneWayTravelTime * 2;
    const select = document.createElement("select");
    select.classList.add("select", "select-additional");
    selectTime.after(select);

    select.addEventListener("change", (e) => {
      arrivalTimeRoundTrip = e.target.value;
      arrivalTime = getHourse(
        getSecond(e.target.value.match(/[0-9:]/gm)) + oneWayTravelTime * 60
      );
    });
  } else {
    price = costOneWayTicket;
    time = oneWayTravelTime;
  }
});

selectTime.addEventListener("change", (event) => {
  selectedTime = event.target.value.match(/[0-9:]/gm);

  if (selectedRoute.includes(keyWordForSearch)) {
    removeOption(document.querySelector(".select-additional"));
    addAdditionalOption(
      arrTimeBfromA,
      document.querySelector(".select-additional")
    );
  } else {
    arrivalTime = getHourse(
      getSecond(event.target.value.match(/[0-9:]/gm)) + oneWayTravelTime * 60
    );
  }
});

inputQuantity.addEventListener("input", () => {
  quantity = inputQuantity.value;
});

btn.addEventListener("click", () => {
  block.textContent = `Вы выбрали ${quantity} билета по маршруту ${selectedRoute} стоимостью ${
    price * quantity
  }р.
  Это путешествие займет у вас ${time} минут. 
  Теплоход отправляется в ${selectedTime.join(
    ""
  )}, а прибудет в ${arrivalTime}.`;
});

function getHourse(seconds) {
  let minutes = Math.floor(seconds / 60);
  let hours = "";
  if (minutes > 59) {
    hours = Math.floor(minutes / 60);
    hours = hours >= 10 ? hours : "0" + hours;
    minutes = minutes - hours * 60;
    minutes = minutes >= 10 ? minutes : "0" + minutes;
  }

  if (hours != "") {
    return hours + ":" + minutes;
  }
  return minutes;
}

function getSecond(time) {
  let hours = "";
  let minutes = 0;
  let temp = [...time];

  for (let i = 0; i < temp.length; i++) {
    if (temp[i] !== ":") {
      hours += temp[i];
      temp.splice(i, 1);
      i--;
    } else if (temp[i] === ":") {
      temp.splice(i, 1);
      minutes = temp.join("");
      break;
    }
  }

  hours = +hours * 3600;
  minutes = +minutes * 60;

  return hours + minutes;
}

function addAdditionalOption(arr, element) {
  const seconds = getSecond(selectedTime) + oneWayTravelTime * 60;

  for (let i = 0; i < arr.length; i++) {
    if (getSecond(arr[i].split("")) > seconds) {
      element.innerHTML += `<option value=${arr[i]} selected>${arr[i]}(обратно из B в A)</option>`;
    }
  }
}

function removeOption(element) {
  element.innerHTML = "";
}

function optionAfromB(arr, element) {
  for (let i = 0; i < arr.length; i++) {
    element.innerHTML += `<option value=${arr[i]} selected>${arr[i]}(из A в B)</option>`;
  }
}
