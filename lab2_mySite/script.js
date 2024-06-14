
// Функция для удаления подсветки поля
function removeHighlight(event) {
  event.target.classList.remove('input-error-border');
}
// Функция для подсветки пустых полей
function highlightEmptyFields() {
  // Получаем все поля ввода
  var fields = [document.getElementById('base1'), document.getElementById('base2'), document.getElementById('side'), document.getElementById('angle')];

  // Перебираем поля и добавляем класс 'input-error-border', если поле пустое
  fields.forEach(function(field) {
    if (field && !field.value) {
      field.classList.add('input-error-border');
    }
  });
}

// Функция для подсветки пустых полей
function removehighlightEmptyFields() {
  // Получаем все поля ввода
  var fields = [document.getElementById('base1'), document.getElementById('base2'), document.getElementById('side'), document.getElementById('angle')];

  // Перебираем поля и добавляем класс 'input-error-border', если поле пустое
  fields.forEach(function(field) {
    if (field && field.value) {
      field.classList.add('input-norm-border');
    }
  });
}
// Добавляем обработчик события 'click' ко всем полям ввода

   // Функция для отображения полей ввода в зависимости от выбранного типа данных
 window.showInputFields = function(){
    var inputType = document.getElementById('inputType').value;
    var inputFields = document.getElementById('inputFields');
	 var checkboxes = document.getElementById('checkboxes');
	 var image = document.getElementById('trapezoidImage');
    inputFields.innerHTML = ''; // Очистка предыдущих полей
	  checkboxes.innerHTML = ''; // Очистка предыдущих чекбоксов
	   var fields = [document.getElementById('base1'), document.getElementById('base2'), document.getElementById('side'), document.getElementById('angle')];



    if (inputType === 'sides') {
      inputFields.innerHTML = `
        <label for="base1">Основание 1:</label>
        <input type="number" id="base1" name="base1" required><br>
        <label for="base2">Основание 2:</label>
        <input type="number" id="base2" name="base2" required><br>
        <label for="side">Боковая сторона:</label>
        <input type="number" id="side" name="side" required><br>
		<img id="trapezoidImage" alt="Равнобедренная трапеция" width = 500px src = "Безымянный1.png">
      `
	  //image.src = 'Безымянный1.png';;
    } else if (inputType === 'angle') {
      inputFields.innerHTML = `
        <label for="base1">Основание 1:</label>
        <input type="number" id="base1" name="base1" required><br>
        <label for="base2">Основание 2:</label>
        <input type="number" id="base2" name="base2" required><br>
        <label for="angle">Угол (в градусах):</label>
		
        <input type="number" id="angle" name="angle" required><br>
		<img id="trapezoidImage" alt="Равнобедренная трапеция" width = 500px src = "Безымянный2.png">
      `
	  	//image.src = 'Безымянный2.png'; ;
    }
	 checkboxes.innerHTML = `
      <label><input type="checkbox" id="heightCheckbox"> Высота</label><br>
      <label><input type="checkbox" id="perimeterCheckbox"> Периметр</label><br>
      <label><input type="checkbox" id="diagonalsCheckbox"> Диагонали</label><br>
      <label><input type="checkbox" id="angleCheckbox"> Угол между диагоналями</label><br>
    `;
  }
document.addEventListener('DOMContentLoaded', function() {

  // Функция для вычисления характеристик трапеции
  window.calculate = function() {
  var base1Element = document.getElementById('base1');
  var base2Element = document.getElementById('base2');
  var sideElement = document.getElementById('side');
  var angleElement = document.getElementById('angle');
  var results = document.getElementById('results');
  results.innerHTML = ''; // Очистка предыдущих результатов
	  var fields = [document.getElementById('base1'), document.getElementById('base2'), document.getElementById('side'), document.getElementById('angle')];
  var base1 = parseFloat(base1Element.value);
  var base2 = parseFloat(base2Element.value);
  var side = sideElement ? parseFloat(sideElement.value) : null;
  var angle = angleElement ? parseFloat(angleElement.value) : null;
  
	// Получение состояния чекбоксов
    var heightChecked = document.getElementById('heightCheckbox').checked;
    var perimeterChecked = document.getElementById('perimeterCheckbox').checked;
    var diagonalsChecked = document.getElementById('diagonalsCheckbox').checked;
    var angleChecked = document.getElementById('angleCheckbox').checked;
	
  // Проверка на корректность введенных данных
  if (isNaN(base1) || isNaN(base2) || (isNaN(side) && isNaN(angle)) || base1 <= 0|| base2 <= 0 ||(side <= 0&& angle <= 0)) {
/*     if (base1Element && !base1Element.value) {
      // Если поле пустое, добавляем класс с красной рамкой
      base1Element.classList.add('input-error-border');
	}
	else base1Element.classList.remove('input-error-border');
	
	if (base2Element && !base2Element.value) {
      // Если поле пустое, добавляем класс с красной рамкой
      base2Element.classList.add('input-error-border');
	}
	else base2Element.classList.remove('input-error-border');
	
	if (sideElement && !sideElement.value) {
      // Если поле пустое, добавляем класс с красной рамкой
      sideElement.classList.add('input-error-border');
	}
	else sideElement.classList.remove('input-error-border');
	
	//if (angleElement && !angleElement.value) {
      // Если поле пустое, добавляем класс с красной рамкой
   //   angleElement.classList.add('input-error-border');
	//}
	//else angleElement.classList.remove('input-error-border'); */
  
    results.innerHTML = '<p class="input-error">поля ввода либо не заполнены, либо введено число меньшее либо равное нулю.</p>';
    return;
  }
	
  // Инициализация переменных
  var height, perimeter, angleBetweenDiagonals, diagonals;

  // Расчеты, если известны основания и боковая сторона
  if (side !== null) {
    height = Math.sqrt(side**2 - ((base1 - base2) / 2)**2);
    diagonals = Math.sqrt(height**2 + ((base1 + base2) / 2)**2);
    angleBetweenDiagonals = 2 * Math.asin(height / diagonals) * (180 / Math.PI);
    perimeter = base1 + base2 + 2 * side;
	 
  }
  // Расчеты, если известны основания и угол
  else if (angle !== null) {
    var angleRadians = angle * Math.PI / 180; // Конвертация угла в радианы
    height = (base2 - base1) * Math.tan(angleRadians / 2);
    diagonals = Math.sqrt(height**2 + ((base1 + base2) / 2)**2);
    angleBetweenDiagonals = 180 - 2 * angle;
    side = height / Math.sin(angleRadians); // Вычисление боковой стороны
    perimeter = base1 + base2 + 2 * side;

  }

  // Вывод результатов в зависимости от выбранных чекбоксов
  if (heightChecked) {
      results.innerHTML += `<p>Высота: ${height.toFixed(2)}</p>`;
	  if (height<0 || isNaN(height)) {
		
		  results.innerHTML = '<p class="input-error">получено значение меньше нуля, возможно введенные данные неверны.</p>';
    return;
	  }
    }
    if (perimeterChecked) {
      results.innerHTML += `<p>Периметр: ${perimeter.toFixed(2)}</p>`;
	  if (perimeter<0|| isNaN(perimeter)) {
		  results.innerHTML = '<p class="input-error">получено значение меньше нуля, возможно введенные данные неверны.</p>';
    return;
    }}
    if (diagonalsChecked) {
      results.innerHTML += `<p>Диагонали: ${diagonals.toFixed(2)}</p>`;
	  if (diagonals<0|| isNaN(diagonals)) {
		  results.innerHTML = '<p class="input-error">получено значение меньше нуля, возможно введенные данные неверны.</p>';
    return;
    }}
    if (angleChecked) {
      results.innerHTML += `<p>Угол между диагоналями: ${angleBetweenDiagonals.toFixed(2)}&deg;</p>`;
	  if (angleBetweenDiagonals<0|| isNaN(angleBetweenDiagonals)) {
		  results.innerHTML = '<p class="input-error">получено значение меньше нуля, возможно введенные данные неверны.</p>';
    return;
    }}
	if (!heightChecked && !perimeterChecked && !diagonalsChecked && !angleChecked){
		document.getElementById('heightCheckbox').classList.add('input-error');
		document.getElementById('perimeterCheckbox').classList.add('input-error');
		document.getElementById('diagonalsCheckbox').classList.add('input-error');
		document.getElementById('angleCheckbox').classList.add('input-error');
	}
}


 

	document.getElementById('showButton').addEventListener('click', showInputFields);
	
});
 // Привязка функций к кнопкам
  document.getElementById('trapezoidCalculator').addEventListener('change', function() {
	   var fields = [document.getElementById('base1'), document.getElementById('base2'), document.getElementById('side'), document.getElementById('angle')];
	  
	   //highlightEmptyFields();
	   
    calculate();
  });
  
  // Добавляем обработчик события 'click' ко всем полям ввода
document.addEventListener('DOMContentLoaded', function() {
  var fields = [document.getElementById('base1'), document.getElementById('base2'), document.getElementById('side'), document.getElementById('angle')];

  fields.forEach(function(field) {
    if (field) {
      field.addEventListener('click', removeHighlight);
    }
  });
});

// Добавляем обработчик события 'click' к кнопке 'Вычислить'
document.getElementById('calculateButton').addEventListener('click', function() {
  highlightEmptyFields();
  removehighlightEmptyFields();
  // Здесь должен быть ваш код для вычисления значений...
});