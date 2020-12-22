export function getQueryStringParameterByName(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }


export function selectByLabel (checkLabel, dataList) {
  // goes through an options array used for select lists and returns the value corresponding to the passed in label
  // Assumes format:    {val: myVal, label: 'my label'}

  for (var i=0; i < dataList.length; i++) {
    if (dataList[i].label == checkLabel) {
      return dataList[i].val;
    }
  }

  return null;
}


export function getRandomInt(min, max) {
  // Returns a random integer between min (inclusive) and max (inclusive)
  // Using Math.round() will give you a non-uniform distribution!
  
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
