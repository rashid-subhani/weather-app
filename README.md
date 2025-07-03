## 🌦️ Your Daily Drizzle — Weather Forecast App

Welcome to **Your Daily Drizzle**, a sleek and responsive weather web app built using **HTML**, **CSS (Bootstrap)**, and **Vanilla JavaScript**. Enter a city name and get the **current weather** along with a **5-day forecast** powered by the **OpenWeatherMap API**.

---


### 🚀 Features

* 🌍 Search weather by city name
* 🌡️ Current temperature, humidity, wind speed, max/min values
* 📅 Live date display
* 📆 5-Day forecast with icons and daily stats
* ⚠️ Error handling for invalid or empty input
* 🎨 Responsive design with Bootstrap

---

### 🔧 Tech Stack

* **Frontend**: HTML5, Bootstrap 5, Font Awesome
* **JavaScript**: DOM manipulation, `fetch()` API
* **API**: [OpenWeatherMap](https://openweathermap.org/api)

---

### 📁 File Structure

```
your-daily-drizzle/
│
├── index.html         # Main HTML structure
├── css/
│   └── style.css      # (Optional) Custom styles
├── js/
│   └── script.js      # All JavaScript logic
├── README.md          # It's here!

```

---

### 🧠 How It Works

1. **User enters** a city name and clicks the **Submit** button.
2. JavaScript:

   * Fetches **latitude and longitude** using the **Geo API**.
   * Retrieves **current weather** and **5-day forecast** using the **One Call API**.
3. Weather info is displayed in the hidden cards, which are made visible after the data is successfully fetched.

---

### 🗝️ Setup & Usage

#### 1. Clone the repository

```bash
git clone https://github.com/yourusername/your-daily-drizzle.git
cd your-daily-drizzle
```

#### 2. Add your OpenWeatherMap API Key

In `js/script.js`, replace:

```javascript
const API_KEY = '36ff0932ae27ec3091d2bf1247c2ec3e';
```

with your own key from: [https://openweathermap.org/api](https://openweathermap.org/api)

---

### 🌐 Live Demo

>  Deployed to GitHub Pages

---

### 📌 Notes

* Make sure you’re connected to the internet (it uses CDN links for Bootstrap and Font Awesome).
* Forecast is based on **12:00 PM** data for each day.
* Handles most basic errors like invalid cities or API issues.

---

### 🧊 To-Do / Ideas

* [ ] Add unit toggle (°C ↔ °F)
* [ ] Use location auto-detect
* [ ] Add weather icons based on condition
* [ ] Deploy live on GitHub Pages

---
