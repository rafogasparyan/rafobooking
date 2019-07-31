let qaunt = document.getElementsByClassName("filterer");
let filters = document.getElementById("filters");
let hrefInfo = [];
let filterers = ["rating", "type", "things"]
let childrenOfFilter = filters.children[1].childElementCount 
let childrenOfFilterer = filters.children[1].querySelectorAll(".filterer").length
let childrenCount =childrenOfFilter / childrenOfFilterer;

for (let i = 1; i < filters.childElementCount; i += 2) {
  let k = (i - 1) / 2;
  hrefInfo[k] = [];
}

function toSplice(array, item) {
  localStorage.setItem("hrefInfo", JSON.stringify(array));
  array.splice(array.indexOf(item), 1);
}

function toPush(array, item) {
  array.push(item);
}

function forLocation() {
  for (let i = 0; i < qaunt.length; i++) {
    localStorage.setItem("i", i);
    if (qaunt[i].checked) {
      forHrefInfo(false, toPush);       
    } else {
      forHrefInfo(true, toSplice);
    }
  }
  amountOfProperties()  
}

function forHrefInfo(bool, fun) {
  let rangeOfFilterer = 0;
  let i = localStorage.getItem("i");
  for (let k = 0; k < hrefInfo.length; k++) {
    let children =
      filters.children[k * 2 + 1].childElementCount / childrenCount;
    rangeOfFilterer += children;
    if (((hrefInfo[k].includes(i)) == bool) && (i < rangeOfFilterer) && (i >= rangeOfFilterer - children)) {    
      fun(hrefInfo[k], i)
      addOrRemoveFromHash(filterers[k], k)
    }
  }
}

function addOrRemoveFromHash(filterItem, t) {
  let i = localStorage.getItem("i");
  if (qaunt[i].checked == true) {
    addToHash(filterItem, t);
  } else {
    removeFromHash(filterItem, t);
  }
}

function addToHash(filterItem, t) {
  if (location.hash.includes(filterItem) == false) {
    location.hash += filterItem + "[" + hrefInfo[t] + "]/";
  } else {
    let k = hrefInfo[t].slice();
    k.pop();
    let p = filterItem + "[" + k.toString() + "]/";  
    location.hash = location.hash.split(p).join("") + filterItem + "[" + hrefInfo[t] + "]/";
  }
  getHotels()  
}

function removeFromHash(filterItem, t) {
  let k = JSON.parse(localStorage.getItem("hrefInfo"));
  let prevLoc = filterItem + "[" + k.toString() + "]/";
  location.hash = location.hash.split(prevLoc).join("");
  if (hrefInfo[t].length !== 0) {    
    location.hash += filterItem + "[" + hrefInfo[t] + "]/";
  }  
  getHotels()
}


addEventListener("click", function(event) {
  if (event.srcElement.classList.contains("filterer")) {    
    forLocation()     
  } 
})

addEventListener("mouseup", function(event) {
  if (event.srcElement.classList.contains("filterer")) {
    setTimeout(() => {
      getFilters()
      getPropertiesCount()
    }, 15);
  }  
})


