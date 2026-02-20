# 🏢 Employee Skills Directory (XML/XSLT)

A modern, interactive web application that transforms a raw XML employee database into a beautiful, searchable, and filterable directory using XSLT and Vanilla JavaScript. 

This project bridges classic enterprise data formats (XML) with modern UI/UX design principles, demonstrating how to handle client-side data transformations without a backend server.

## ✨ Features

* **XML to HTML Transformation:** Dynamically renders employee data using an XSLT stylesheet and the browser's native `XSLTProcessor`.
* **Real-time Search:** Instantly filter the directory by employee name.
* **Smart Filtering:** Filter colleagues by Department (Engineering, Product, Data Science) or toggle to view only available Mentors.
* **In-Memory Data Updates:** Add new employees via a modal form. The app updates the underlying XML DOM in memory and re-triggers the XSLT transformation to update the UI instantly.
* **Premium UI/UX:** Built with modern CSS variables, responsive CSS Grid, glassmorphism modals, and smooth hover state animations.

## 🛠️ Technology Stack

* **Data Structure:** XML (`employees.xml`)
* **Data Transformation:** XSLT (`transform.xsl`)
* **Frontend Logic:** Vanilla JavaScript (ES6)
* **Styling:** Custom CSS3 (CSS Variables, Flexbox, Grid)
* **Structure:** HTML5

## 📂 Project Structure

```text
hr-directory/
├── index.html          # Main application shell and UI controls
├── data/
│   ├── employees.xml   # The raw HR database of employees and skills
│   └── transform.xsl   # The rules engine converting XML to HTML cards
├── css/
│   └── style.css       # Premium styling, variables, and responsive rules
├── js/
│   └── app.js          # Handles fetching, XSLT processing, and filtering logic
└── README.md           # Project documentation
```

## 🚀 How to Run the Project

**⚠️ Important:** Because this project uses JavaScript's `fetch()` API to load local XML and XSLT files, you cannot simply double-click the `index.html` file to run it. Browsers block local file reading (CORS policy) for security reasons. **You must run this through a local web server.**

### Method 1: Using VS Code (Recommended)
1. Open the project folder in **Visual Studio Code**.
2. Install the **Live Server** extension (by Ritwick Dey).
3. Right-click on `index.html` in your file explorer.
4. Select **"Open with Live Server"**.
5. The application will automatically open in your default browser.

### Method 2: Using Node.js / Terminal
1. Ensure you have [Node.js](https://nodejs.org/) installed.
2. Open your terminal and navigate to the project directory:
   \`\`\`bash
   cd path/to/hr-directory
   \`\`\`
3. Run the following command to start a local server:
   \`\`\`bash
   npx serve
   \`\`\`
4. Open your browser and navigate to the `localhost` URL provided in the terminal (usually `http://localhost:3000`).

## 🧠 How It Works (Architecture)

1. **Initialization:** On page load, `app.js` fetches both `employees.xml` and `transform.xsl` using JavaScript Promises.
2. **Parsing:** The raw text is parsed into traversable XML DOM objects using `DOMParser`.
3. **Transformation:** An `XSLTProcessor` takes the XSL stylesheet, applies it to the XML data, and generates an HTML document fragment containing all the employee cards.
4. **Injection & Tagging:** The resulting HTML is injected into the `<main>` container. During transformation, the XSLT strategically attaches custom `data-*` attributes (e.g., `data-department`, `data-name`) to each card.
5. **Filtering:** When a user types in the search bar or clicks a filter, JavaScript reads these `data-*` attributes and toggles the `display` property of the cards, resulting in lightning-fast sorting without re-rendering the DOM.
6. **Adding Data:** Submitting the "Add Employee" form creates new XML nodes, appends them to the in-memory `xmlDoc`, and re-runs the `XSLTProcessor` to update the screen. *(Note: Changes reset on page refresh since there is no persistent database connection).*