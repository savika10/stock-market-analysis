# Stock Market Analysis Dashboard 📈

A dynamic, fully responsive, and modular financial dashboard built using **HTML5, Tailwind CSS, Vanilla JavaScript**, and **Chart.js**. The application fetches historical stock records dynamically from a third-party REST API and presents analytical data via interactive line graphs, tabular portfolio lists, and deep-dive stock summaries.

## 🌟 Features

* **Dynamic Interactive Graphing:** Powered by `Chart.js`, rendering historical trends across 4 custom timescales (**1 Month, 3 Months, 1 Year, and 5 Years**).
* **Real-time Analytics Display:** Instantly computes and showcases the **Peak Value** and **Low Value** achieved over the chosen timeframe.
* **Intelligent Synchronization:** Selecting an asset from the portfolio table updates the chart, analytics markers, and description panels globally while maintaining state.
* **Responsive Theme Engine:** Includes a unified Light/Dark mode toggler managed completely via utility classes and native local hooks.
* **Clean Modular Architecture:** Structured strictly into individual domain scripts and dedicated style modules (`Graph`, `Description`, `Stock Price`) to maximize maintainability.
* **Smart Conditional UI:** Evaluates profit margins in real-time, instantly shifting content color markers to **Green** for positive gains or **Red** for losses.

---

## 🛠️ Tech Stack & Dependencies

* **Markup:** HTML5 (Semantic Structure)
* **Styling:** Tailwind CSS (via CDN utility injection) & Custom Vanilla CSS
* **Scripting:** Vanilla ECMAScript 6+ (Asynchronous Event-driven architecture)
* **Data Visualization:** Chart.js (v4.x via CDN link)
* **Icons:** Font Awesome (v6 Webkit Integration)

---

## 📁 Project Structure

```text
├── Description/
│   └── description.js      # Logic for updating stock summary & profit metrics
├── Graph/
│   └── graph.js            # Main visual rendering engine mapping Chart.js arrays
├── Stock Price/
│   └── stockPrice.js       # List controller dispatching selection events
├── index.html                # Project entry point / UI Blueprint
└── theme.js                # Global light/dark mode event toggle controller