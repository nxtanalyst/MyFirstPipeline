const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// --- In-memory Data ---
const jokes = [
  "😂 Why don’t skeletons fight? They don’t have the guts!",
  "🤣 Why did the scarecrow win an award? He was outstanding in his field!",
  "😆 Parallel lines have so much in common… it’s a shame they’ll never meet."
];
const facts = [
  "🌎 Earth is the only planet not named after a god.",
  "🐝 Bees sometimes sting other bees.",
  "🔥 Hot water freezes faster than cold water under certain conditions."
];
const quotes = [
  "💡 'The best way to predict the future is to invent it.' – Alan Kay",
  "🚀 'Stay hungry, stay foolish.' – Steve Jobs",
  "🎯 'Do what you can, with what you have, where you are.' – Theodore Roosevelt"
];
let todos = [];
let secretNumber = Math.floor(Math.random() * 10) + 1;

// --- Serve UI ---
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>🔥 Super Interactive App</title>
      <style>
        body { font-family: Arial; background: #f5f5f5; color: #222; text-align: center; margin: 20px; transition: 0.3s; }
        .dark { background: #121212; color: #f5f5f5; }
        input, button { padding: 10px; margin: 5px; border-radius: 5px; }
        button { background: #007BFF; color: white; border: none; cursor: pointer; }
        button:hover { background: #0056b3; }
        .chat, .todos { width: 320px; margin: 20px auto; padding: 15px; background: #fff; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); text-align: left; }
        .dark .chat, .dark .todos { background: #1e1e1e; }
        .user { color: blue; }
        .bot { color: green; }
        .todo-item { display: flex; justify-content: space-between; }
      </style>
    </head>
    <body>
      <h1>🔥 Super Interactive App</h1>
      <button onclick="toggleDarkMode()">🌙 Toggle Dark Mode</button>
      
      <h3>💬 Chat with Bot</h3>
      <input id="userInput" placeholder="Type a message..." />
      <button onclick="sendMessage()">Send</button>
      <div class="chat" id="chatBox"></div>

      <h3>📝 To-Do List</h3>
      <input id="todoInput" placeholder="Add a new task..." />
      <button onclick="addTodo()">Add</button>
      <div class="todos" id="todoBox"></div>

      <h3>🎲 Guess The Number (1-10)</h3>
      <input id="guessInput" type="number" min="1" max="10" placeholder="Your guess..." />
      <button onclick="guessNumber()">Guess</button>
      <p id="guessResult"></p>

      <script>
        let darkMode = false;
        function toggleDarkMode() {
          darkMode = !darkMode;
          document.body.classList.toggle('dark');
        }

        async function sendMessage() {
          const msg = document.getElementById('userInput').value;
          if (!msg) return;
          document.getElementById('chatBox').innerHTML += '<p class="user"><b>You:</b> ' + msg + '</p>';
          document.getElementById('userInput').value = '';
          const res = await fetch('/reply', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: msg })
          });
          const data = await res.json();
          document.getElementById('chatBox').innerHTML += '<p class="bot"><b>Bot:</b> ' + data.reply + '</p>';
        }

        async function loadTodos() {
          const res = await fetch('/todos');
          const data = await res.json();
          document.getElementById('todoBox').innerHTML = data.map((t, i) =>
            '<div class="todo-item">' + t + 
            '<button onclick="deleteTodo('+i+')">❌</button></div>').join('');
        }

        async function addTodo() {
          const task = document.getElementById('todoInput').value;
          if (!task) return;
          await fetch('/todos', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ task }) });
          document.getElementById('todoInput').value = '';
          loadTodos();
        }

        async function deleteTodo(i) {
          await fetch('/todos/'+i, { method:'DELETE' });
          loadTodos();
        }

        async function guessNumber() {
          const num = document.getElementById('guessInput').value;
          const res = await fetch('/guess', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ number: num }) });
          const data = await res.json();
          document.getElementById('guessResult').innerText = data.result;
        }

        loadTodos();
      </script>
    </body>
    </html>
  `);
});

// --- Chatbot ---
app.post('/reply', (req, res) => {
  const msg = req.body.message.toLowerCase();
  let reply = "🤖 I don't understand. Try asking: joke, fact, quote, weather, time.";

  if (msg.includes("hello")) reply = "👋 Hello there!";
  else if (msg.includes("joke")) reply = jokes[Math.floor(Math.random() * jokes.length)];
  else if (msg.includes("fact")) reply = facts[Math.floor(Math.random() * facts.length)];
  else if (msg.includes("quote")) reply = quotes[Math.floor(Math.random() * quotes.length)];
  else if (msg.includes("time")) reply = `⏰ Current time: ${new Date().toLocaleTimeString()}`;
  else if (msg.includes("weather")) reply = "☀ It's sunny everywhere in bot-land!";

  res.json({ reply });
});

// --- To-Do List API ---
app.get('/todos', (req, res) => res.json(todos));
app.post('/todos', (req, res) => { todos.push(req.body.task); res.json({ success: true }); });
app.delete('/todos/:id', (req, res) => { todos.splice(req.params.id, 1); res.json({ success: true }); });

// --- Guess The Number API ---
app.post('/guess', (req, res) => {
  const guess = parseInt(req.body.number);
  let result = "❌ Try again!";
  if (guess === secretNumber) {
    result = "🎉 Correct! New number generated.";
    secretNumber = Math.floor(Math.random() * 10) + 1;
  } else if (guess < secretNumber) result = "🔼 Too low!";
  else result = "🔽 Too high!";
  res.json({ result });
});

app.listen(PORT, () => console.log(`🔥 Super Interactive App running at http://localhost:${PORT}`));