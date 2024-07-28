document.addEventListener("DOMContentLoaded", function() {
  const inputValue = document.getElementById("user-input");
  let inputString = '';

  
  function updateDisplay(value) {
      inputValue.innerText = value || '0'; 
  }
  document.querySelectorAll(".numbers").forEach(function(item) {
      item.addEventListener("click", function(e) {
          const number = e.target.innerText.trim();
          if (inputString === '0' && number !== '.') {
              inputString = number; 
          } else if (inputString === 'Error') {
              inputString = number; 
          } else {
              inputString += number;
          }
          updateDisplay(inputString);
      });
  });
  document.querySelectorAll(".operations").forEach(function(item) {
      item.addEventListener("click", function(e) {
          const operation = e.target.innerText.trim();
          const lastChar = inputString[inputString.length - 1];

          if (operation === 'AC') {
              inputString = '';
          } else if (operation === 'DEL') {
              inputString = inputString.slice(0, -1) || '0';
          } else if (operation === '=') {
              if (!isNaN(lastChar) || lastChar === '%') {
                  try {
                      const result = eval(inputString.replace(/[^-()\d/*+.]/g, ''));
                      inputString = (isNaN(result) ? "Error" : result.toString());
                  } catch {
                      inputString = "Error";
                  }
              }
          } else {
            if (!isNaN(lastChar) || lastChar === '.' || (operation === '%' && lastChar !== '%')) {
                  inputString += operation;
              }
          }

          updateDisplay(inputString);
      });
  });
  updateDisplay(inputString);
});
