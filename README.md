# 🧮 4-in-1 Modern Glassmorphism Calculator

A sleek, responsive, and multi-functional calculator web application built with **HTML5, CSS3, and JavaScript**. Featuring a modern **Glassmorphism UI**, full **keyboard support**, dark/light mode toggle, and persistent calculation history using **LocalStorage**.


## 🚀 Live Demo
Check out the live web app here: 
👉 [View Live Demo](https://gb376052-cpu.github.io/JS-Calculator/)


## ✨ Features

### 1. 🔢 Standard Calculator
- Performs fundamental arithmetic operations (`+`, `-`, `×`, `÷`).
- Clean visual display with live expression preview and result formatting.

### 2. 🔬 Scientific Calculator
- Support for trigonometry (`sin`, `cos`, `tan` calculated in degrees).
- Logarithmic (`log`) and square root (`sqrt`) calculations.
- Constants like **Pi** ($\pi$) integrated.

### 3. 💵 Tip & Split Calculator
- Real-time calculation of total tip amount and individual split share.
- Customizable bill amount, tip percentage, and person count.

### 4. ⚖️ BMI Calculator
- Body Mass Index calculator based on height (cm) and weight (kg).
- Instant health feedback indicators (Underweight, Normal Weight, Overweight, Obese).
  

## 🚀 Highlights & Extras

- ⌨️ **Full Keyboard Support:** Standard keypad shortcuts (`0-9`, `+`, `-`, `*`, `/`, `Enter`, `Backspace`, `Escape`).
- 🌙 **Theme Switcher:** Seamless switching between Dark Glass and Light Mode aesthetics.
- 📜 **Calculation History:** Automatically saves the last 10 calculations using `localStorage` with a popup review modal.
- 📱 **Fully Responsive:** Smooth layout transitions for mobile, tablet, and desktop viewports.


## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3 (CSS Variables, Flexbox, Grid, Glassmorphism backdrop-filters)
- **Logic:** Vanilla JavaScript (ES6+)
- **Storage:** Browser `localStorage` API


## 📂 Project Structure

```text
├── index.html        # App layout and multi-panel structure
├── style.css         # Glassmorphism styling, themes, & responsive design
└── script.js        # Core calculator logic, keyboard mapping, & state management
