(function () {
    "use strict";
    const regexInput = document.getElementById("regex"),
          stringInput = document.getElementById("string"),
          resultInput = document.getElementById("result"),
          flagInput = document.getElementById("flag"),
          copyMessage = document.getElementById("copy-message"),
          toggleCopyMessage = document.getElementsByClassName("toggle-copy-message"),
          copy = document.getElementById("copy"),
          countMatches = document.getElementById("count-matches");
    regexInput.addEventListener("input", detect);
    stringInput.addEventListener("input", detect);
    flagInput.addEventListener("input", detect);
    copy.addEventListener("click", copyToClipboard);
    for(let i = 0; i < toggleCopyMessage.length ; i++) { toggleCopyMessage[i].addEventListener("input", changeCopyMessage)}
    function detect () {
    "use strict";
          try{
            if(regexInput.value){
                const regexp = new RegExp(regexInput.value, flagInput.value),
                      str = stringInput.value,
                      matchArr = [],
                      result = str.match(regexp),
                      test = regexp.test(str);
                      if(result){
                          for(let v of result){
                              if(v) matchArr.push(v);
                          }
                      }
                countMatches.classList.remove("error");
                resultInput.value = matchArr ;
                countMatches.classList.remove("hidden");
                countMatches.textContent =  result ? matchArr.length + " matches" + ", test returns: " + test : "0 matches" + ", test returns: "+ test;
            }else {
                resultInput.value = null;
                countMatches.classList.add("hidden");
            }
          }catch(err){
            countMatches.classList.remove("hidden");
            countMatches.classList.add("error");
            countMatches.textContent = err.message;   
          }
          
    }
    function copyToClipboard() {
        "use strict"
        const ta = document.createElement("textarea"),
              tn = document.createTextNode("/" + regexInput.value + "/" + flagInput.value);
        ta.appendChild(tn);
        ta.classList.add("read-only");
        ta.setAttribute("readonly", "");
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        copyMessage.textContent = "copied"
    }
    function changeCopyMessage () {
        "use strict"
        copyMessage.textContent = "copy this regex"; 
    }
}());
