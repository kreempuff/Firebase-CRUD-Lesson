//gets the DOM node that is the div to hold all cartoons
//assigns to the variable to cartoonDiv
var cartoonDiv = document.getElementById('cartoons');
var firebaseUrl; //insert your firebase url here with trailing slash

//C of the CRUD
function createCartoon() {
  var cartoonName = document.getElementById('cartoonName');

  var cartoonImage = document.getElementById('cartoonImage');

  var cartoonObj = {
    cartoonName: cartoonName.value,
    cartoonImage: cartoonImage.value
  }

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    getCartoons()
  }
  xhr.open("POST", firebaseUrl + '.json', true);
  xhr.setRequestHeader("Content-type", "json");
  xhr.send(JSON.stringify(cartoonObj));

}
//R of the CRUD
function getCartoons() {
  var xhr = new XMLHttpRequest();
  var height = document.body.scrollTop;
  //Setup callback to handle the response
  xhr.onreadystatechange = function() {
    var display = "";
    cartoonDiv.innerHTML = "";
    console.log(xhr.readyState, xhr.status);
    if (xhr.readyState == 4 && xhr.status == 200) {
      var response = JSON.parse(xhr.responseText);
      for (var variable in response) {

        cartoon = response[variable];
        display += "<h3>" + cartoon.cartoonName + "</h3><br>" + "<img src='" + cartoon.cartoonImage + "'/><br><button onclick='editCartoon(\"" + variable + "\")'> Edit Cartoon</button>&nbsp;<button onclick='deleteCartoon(\"" + variable + "\")'> Delete Cartoon</button>";
        cartoonDiv.innerHTML = display;
        document.body.scrollTop = height;
      }
    }
  };

  xhr.open("GET", firebaseUrl + '.json', true);
  xhr.send();


}

//U of CRUD
function editCartoon(guid) {

  var cartoonName = document.getElementById('cartoonName');

  var cartoonImage = document.getElementById('cartoonImage');

  var cartoonObj = {
    cartoonName: cartoonName.value,
    cartoonImage: cartoonImage.value
  }
  console.log(cartoonObj);

  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    getCartoons();
  }
  xhr.open("PUT", firebaseUrl + guid + ' .json', true);
  xhr.setRequestHeader("Content-type", "json");
  xhr.send(JSON.stringify(cartoonObj));



}

//D of CRUD
function deleteCartoon(guid) {
  var cartoonName = document.getElementById('cartoonName');
  var cartoonImage = document.getElementById('cartoonImage');
  var cartoonObj = {
    cartoonName: cartoonName.value,
    cartoonImage: cartoonImage.value
  }
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {

      getCartoons();
    }
  }

  xhr.open("DELETE", firebaseUrl + guid + ".json", true);
  xhr.send();
}

getCartoons();
