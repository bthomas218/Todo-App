# 📝 Todo CLI App (JavaScript)

A simple command-line todo list app written in modern **JavaScript (Node.js)**.  
Uses classes, JSON persistence, and demonstrates OOP best practices.

---

## 🚀 Features
- Add, list, update, and delete tasks
- Task status tracking (to do, in progress, complete)
- Data saved to JSON file on exit
- Loads previous tasks on startup
- Modern ES6+ syntax with private fields, getters/setters

---

## 🛠️ Tech Stack
- Node.js
- JavaScript (ES2022+)
- JSON for persistence

---

## 📂 Project Structure
```text
Todo-app/
├── src/
│   ├── Task.js         # Defines the Task class with getters/setters
│   ├── TaskList.js     # Manages list of tasks and JSON persistence
│   └── index.js        # CLI entry point / driver
├── tasks.json          # Stored tasks (generated at runtime)
├── package.json        # Node project config
├── .gitignore          # Files/folders to ignore in Git
└── README.md           # Project overview and instructions
```


---

## ▶️ Usage
Clone the repo and run with Node.js:

```bash
git clone https://github.com/bthomas218/Todo-app.git
cd Todo-app
npm install
node src/index.js
```
Requires: [Inquirer.js](https://www.npmjs.com/package/inquirer)