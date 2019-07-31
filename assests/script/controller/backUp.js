//filter
let listOfHotels = document.getElementById("hotels");
let filteredHotels = [];
let info = [[], [], []]; // appliedFilters
let hotelsClone = hotels.slice();
let filterers = ["rating", "propertyType", "funThings"];

document.addEventListener("click", function amountOfHotels() {
  document.getElementById("amountOfHotels").innerText =
    "Yerevan : " + hotelsClone.length + " properties found";
});


function getInfo(infoArray) {
  chekboxArray();
  localStorage.setItem("checkedCheckboxes", JSON.stringify(isCheckedArr));

  let info = event.target.value;
  if (infoArray.includes(info)) {
    infoArray.splice(infoArray.indexOf(info), 1);
  } else {
    infoArray.push(info);
  }
  getHotels();
}


function getHotels() {
  hotelsClone = hotels.slice()
  listOfHotels.innerHTML = "";
  for (let i of info) {
    filteredHotels = [];
    for (let j of i) {
      for (let k of hotelsClone) {
        if (k[filterers[info.indexOf(i)]] == j && filteredHotels.includes(k) == false) {
          filteredHotels.push(k)
        }
      }
    }
    getHotelsClone();
  }
  listOfHotels.innerHTML = hotelsClone.map(cardForHotel).join("");
  forLocation();
}


function getHotelsClone() {
  if (filteredHotels.length !== 0) {
    hotelsClone = filteredHotels;
  }
}

listOfHotels.innerHTML = hotels.map(cardForHotel).join("");
//filter end





















//location.js
let rat = document.getElementsByClassName("rating").length;
let type = document.getElementsByClassName("propertyType").length;
let things = document.getElementsByClassName("things").length;
let hrefInfo = [[], [], []];

function toSplice(array, item) {
  localStorage.setItem("hrefInfo", JSON.stringify(array))
  array.splice(array.indexOf(item), 1)
}

function toPush(array, item) {
  array.push(item)
}

function forHrefInfo(bool, fun) {
  let i = localStorage.getItem("i")
  if (i < rat && hrefInfo[0].includes(i) == bool) {
    fun(hrefInfo[0], i);
    addOrRemoveFromHash("rating", 0);
  } else if (i >= rat && i < rat + things && hrefInfo[1].includes(i) == bool) {
    fun(hrefInfo[1], i);
    addOrRemoveFromHash("type", 1);
  } else if (i >= rat + things && hrefInfo[2].includes(i) == bool) {
    fun(hrefInfo[2], i)
    addOrRemoveFromHash("things", 2);
  }
}

function forLocation() {
  chekboxArray();
  for (let i = 0; i < isCheckedArr.length; i++) {
    localStorage.setItem("i", i)
    if (isCheckedArr[i]) {
      forHrefInfo(false, toPush)
    } else {
      forHrefInfo(true, toSplice)
    }
  }
}

function hotelsAfterRefresh() {
  let arr = JSON.parse(localStorage.getItem("checkedCheckboxes"));
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == true) {
      qaunt[i].click();
    }
  }
}

if (localStorage.getItem("checkedCheckboxes") !== null) {
  window.onload = hotelsAfterRefresh();
}

function addToHash(filterItem, t) {
  if (location.hash.includes(filterItem) == false) {
    location.hash += filterItem + "[" + hrefInfo[t] + "]/"
  } else {
    let k = hrefInfo[t].slice();
    k.pop()
    let p = filterItem + "[" + k.toString() + "]/";
    location.hash = location.hash.split(p).join("") + filterItem + "[" + hrefInfo[t] + "]/";
  }
}

function removeFromHash(filterItem, t) {
  let k = JSON.parse(localStorage.getItem("hrefInfo"));
  let p = filterItem + "[" + k.toString() + "]/";
  location.hash = location.hash.split(p).join("");
  if (hrefInfo[t].length !== 0) {
    location.hash += filterItem + "[" + hrefInfo[t] + "]/";
  }

}


function addOrRemoveFromHash(filterItem, t) {
  let i = localStorage.getItem("i");
  if (qaunt[i].checked == true) {
    addToHash(filterItem, t)
  } else {
    removeFromHash(filterItem, t)
  }
}
//location end










//is input changed 
let isCheckedArr = []
let qaunt = document.getElementsByClassName("filterer")

function chekboxArray() {
  isCheckedArr = []
  for (let i = 0; i < qaunt.length; i++) {
    isCheckedArr.push(qaunt[i].checked);
  }
}

function notChecked() {
  if (isCheckedArr.includes(true) == false) {
    listOfHotels.innerHTML = hotels.map(cardForHotel).join("");
  }
}

//is input changed end









//view.js

function cardForHotel(item) {
  return `
    <div class="card">
      <div class="d-flex">
        <div class="img-square-wrapper">
          <img class="" src="${item.img}" alt="Card image cap">
        </div>
        <div class="card-body">
          <div class="row card-title">
            <h4 class="col-auto">${item.name}</h4>
            <p class="ml-auto">Rat. <span class="bg-primary p-1">${
    item.rating
    }</span></p>
          </div>          
          <p>${item.propertyType}</p>
          <p class="card-text">${item.funThings}</p>
          <div class="text-right">
            <button class="btn btn-primary">Show prices</button>
        </div>        
        </div>
        
      </div>
      
    </div>
  `;
}
// view end




let hotelTamplets = document.getElementById("hotels");
let hotelsClone = hotels.splice();
let filteredHotels;
let arr = [];

function getFilterers() {
  let k = location.hash.replace(/\D/g, "").split("");
  let t = location.hash.split()
  hotelsClone = hotels.slice();
  hotelTamplets.innerHTML = "";
  for (let i = 0; i < k.length; i++) {
    filteredHotels = [];
    for (let j of hotelsClone) {
      if (Object.values(j).includes(qaunt[k[i]].value)) {
        filteredHotels.push(j)
      }

    }
    getHotelsClone();
  }

  console.log(hotelsClone)
  hotelTamplets.innerHTML = hotelsClone.map(cardForHotel).join("");
}


function getHotelsClone() {
  if (filteredHotels.length !== 0) {
    hotelsClone = filteredHotels;
    console.log("hotels clone", hotelsClone)
  }
}



/* function forHrefInfo(bool, fun) {
  let i = localStorage.getItem("i");
  if (i < rat && hrefInfo[0].includes(i) == bool) {
    fun(hrefInfo[0], i);    
    addOrRemoveFromHash("rating", 0);
  } else if (i >= rat && i < rat + things && hrefInfo[1].includes(i) == bool) {
    fun(hrefInfo[1], i);
    addOrRemoveFromHash("type", 1);
  } else if (i >= rat + things && hrefInfo[2].includes(i) == bool) {
    fun(hrefInfo[2], i);
    addOrRemoveFromHash("things", 2);
  }
} */