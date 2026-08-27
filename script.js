const mainDisplay = document.getElementById('mainDisplay');
const historyPreview = document.getElementById('historyPreview');
const modeSelector = document.getElementById('modeSelector');
const themeToggle = document.getElementById('themeToggle');

// Mode Switching Logic
const panels = {
    standard: document.getElementById('standardPanel'),
    scientific: document.getElementById('scientificPanel'),
    tip: document.getElementById('tipPanel'),
    bmi: document.getElementById('bmiPanel')
};

modeSelector.addEventListener('change', (e) => {
    Object.values(panels).forEach(panel => panel.classList.remove('active'));
    panels[e.target.value].classList.add('active');
});

// Theme Toggle Logic
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    themeToggle.textContent = document.body.classList.contains('light-theme') ? '☀️' : '🌙';
});

// Calculator Logic
let currentInput = '0';
let calculationHistory = JSON.parse(localStorage.getItem('calc_history')) || [];

const allCalculatorKeys = document.querySelectorAll('#standardPanel .btn, #scientificPanel .btn');

allCalculatorKeys.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');

        if (value === 'C') {
            currentInput = '0';
            historyPreview.textContent = '';
        } else if (value === 'DEL') {
            currentInput = currentInput.length > 1 ? currentInput.slice(0, -1) : '0';
        } else if (value === '=') {
            try {
                let expression = currentInput
                    .replace(/×/g, '*')
                    .replace(/÷/g, '/')
                    .replace(/pi/g, 'Math.PI');

                // Fixing Scientific functions to work with Degrees correctly
                expression = expression
                    .replace(/sin\(/g, 'Math.sin((Math.PI/180)*')
                    .replace(/cos\(/g, 'Math.cos((Math.PI/180)*')
                    .replace(/tan\(/g, 'Math.tan((Math.PI/180)*')
                    .replace(/sqrt\(/g, 'Math.sqrt(')
                    .replace(/log\(/g, 'Math.log10(');

                let result = eval(expression);
                
                if (typeof result === 'number' && !Number.isInteger(result)) {
                    result = parseFloat(result.toFixed(6));
                }
                
                let record = `${currentInput} = ${result}`;
                calculationHistory.unshift(record);
                if(calculationHistory.length > 10) calculationHistory.pop();
                localStorage.setItem('calc_history', JSON.stringify(calculationHistory));

                historyPreview.textContent = currentInput;
                currentInput = result.toString();
            } catch (error) {
                currentInput = 'Error';
            }
        } else {
            if (currentInput === '0' && value !== '.' && value !== 'sin(' && value !== 'cos(' && value !== 'tan(' && value !== 'sqrt(' && value !== 'log(') {
                currentInput = value;
            } else if (currentInput === '0' && (value === 'sin(' || value === 'cos(' || value === 'tan(' || value === 'sqrt(' || value === 'log(')) {
                currentInput = value;
            } else {
                currentInput += value;
            }
        }
        mainDisplay.value = currentInput;
    });
});

// Tip Calculator Logic
const billInput = document.getElementById('billAmount');
const tipInput = document.getElementById('tipPercent');
const splitInput = document.getElementById('splitCount');
const tipResult = document.getElementById('tipResult');
const totalPerPerson = document.getElementById('totalPerPerson');

function calculateTip() {
    let bill = parseFloat(billInput.value) || 0;
    let tipPercent = parseFloat(tipInput.value) || 0;
    let split = parseInt(splitInput.value) || 1;

    let tipAmount = (bill * tipPercent) / 100;
    let totalBill = bill + tipAmount;
    let perPerson = totalBill / split;

    tipResult.textContent = `₹${tipAmount.toFixed(2)}`;
    totalPerPerson.textContent = `₹${perPerson.toFixed(2)}`;
}

[billInput, tipInput, splitInput].forEach(input => {
    input.addEventListener('input', calculateTip);
});

// BMI Calculator Logic
document.getElementById('calcBmiBtn').addEventListener('click', () => {
    let weight = parseFloat(document.getElementById('bmiWeight').value);
    let height = parseFloat(document.getElementById('bmiHeight').value) / 100;
    
    if(!weight || !height) {
        document.getElementById('bmiStatus').textContent = "Enter valid values";
        return;
    }

    let bmi = (weight / (height * height)).toFixed(1);
    let status = '';

    if (bmi < 18.5) status = 'Underweight 🍏';
    else if (bmi < 24.9) status = 'Normal Weight 💚';
    else if (bmi < 29.9) status = 'Overweight ⚠️';
    else status = 'Obese ❌';

    document.getElementById('bmiResult').textContent = bmi;
    document.getElementById('bmiStatus').textContent = status;
});

// History Modal Logic
const historyModal = document.getElementById('historyModal');
document.getElementById('toggleHistoryBtn').addEventListener('click', () => {
    const list = document.getElementById('historyList');
    list.innerHTML = '';
    calculationHistory.forEach(item => {
        let li = document.createElement('li');
        li.textContent = item;
        list.appendChild(li);
    });
    historyModal.style.display = 'flex';
});

document.getElementById('closeHistory').addEventListener('click', () => {
    historyModal.style.display = 'none';
});

document.getElementById('clearHistory').addEventListener('click', () => {
    calculationHistory = [];
    localStorage.removeItem('calc_history');
    document.getElementById('historyList').innerHTML = '';
});
