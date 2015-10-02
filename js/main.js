document.addEventListener("DOMContentLoaded", function(){

  utility.getDictionary();

  document.addEventListener("input", function(){

    var inputText = document.getElementById("input-text").value;
    
    var list = document.getElementById("words-list");
    if (list) {
      list.innerHTML = "";
    }

    var words = utility.autocomplete(inputText, 0, {});
    utility.displayWords(words);

  });

});
