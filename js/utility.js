var utility = (function() {

  var data = [];

  var getDictionary = function() {

    var url = "http://api.wordnik.com:80/v4/words.json/randomWords?hasDictionaryDef=false&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&limit=100&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5";

    var request = new XMLHttpRequest();
    request.open('GET', url, true);

    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        var results = JSON.parse(request.responseText);
        for (var i = 0; i < results.length; i++) {
          data.push(results[i]["word"]);
        }
      }
    };

    request.send();

  };

  var autocomplete = function (text, textIndex, results) {
    
    // base case: if textIndex > text.length
    if (textIndex > text.length - 1) {
      var returnResults = [];
      for (var prop in results) {
        returnResults.push(prop);
      }
      return returnResults;
    }

    // recursive case
    var newResults = {};
    var char = text[textIndex];

    if (textIndex === 0) {
      for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data[i].length; j++) {
          if (char === data[i][j]) {
            if (!results[data[i]]) {
              results[data[i]] = [];
            }
            results[data[i]].push(j);
          }
        }
      }

    } else {
      var resultsCopy = results;
      results = {};
      for (var key in resultsCopy) {
        for (var k = 0; k < resultsCopy[key].length; k++) {
          if (key[resultsCopy[key][k] + 1] === char) {
            if (!results[key]) {
              results[key] = [];
            }
            results[key].push(++resultsCopy[key][k]);
          }
        }
      }
    }

    return autocomplete(text, textIndex + 1, results);

  };

  var displayWords = function(words) {

    var list = document.getElementById("words-list");
    var input = document.getElementById("input-text");

    if (!list) {
      var ul = document.createElement("ul");
      ul.id = "words-list";
      var div = document.createElement("div");
      
      div.appendChild(ul);
      input.parentNode.appendChild(div);
    }

    for (var i = 0; i < words.length; i++) {
      var li = document.createElement("li");
      li.innerHTML = words[i];
      document.getElementById("words-list").appendChild(li);
    }


  };

  return {

    getDictionary: getDictionary,
    autocomplete: autocomplete,
    displayWords: displayWords

  };

})();
