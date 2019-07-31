function getItemsToClick() {
  getHash();
  location.hash = "";
  for (let k = 0; k < hash.length - 1; k++) {
    let d = JSON.parse(hash[k]);
    for (let i = 0; i < d.length; i++) {
      itemsToClick.push(d[i]);
    }
  }
}

let j = 0;
function clickAfterRefresh() {
  for (let k = 0; k < qaunt.length; k++) {
    qaunt[k].checked = false;
  }
  getItemsToClick();
  for (let i = 0; i < itemsToClick.length; i++) {
    qaunt[itemsToClick[i]].click(); 
  }  
  getFilters();
  getPropertiesCount();
}

window.onload = clickAfterRefresh();
