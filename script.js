// === Initialize Quotes ===
// Load from localStorage or use default quotes
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "Inspiration" },
  { text: "Your time is limited, so don’t waste it living someone else’s life.", category: "Life" }
];

const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");

// === Display a random quote ===
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  quoteDisplay.textContent = `"${quote.text}" — ${quote.category}`;

  // Save the last shown quote in sessionStorage
  sessionStorage.setItem("lastQuote", JSON.stringify(quote));
}

// === Add new quote ===
function addQuote() {
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();

  if (!text || !category) {
    alert("Please fill out both fields.");
    return;
  }

  quotes.push({ text, category });
  saveQuotes(); // Save to localStorage
  alert("Quote added successfully!");

  // Clear inputs
  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";
}

// === Save quotes to localStorage ===
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// === Export quotes to a JSON file ===
function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2); // formatted JSON
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "quotes.json";
  link.click();

  URL.revokeObjectURL(url);
}

// === Import quotes from JSON file ===
function importFromJsonFile(event) {
  const fileReader = new FileReader();

  fileReader.onload = function (e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);

      if (!Array.isArray(importedQuotes)) {
        alert("Invalid JSON format — expected an array of quotes.");
        return;
      }

      quotes.push(...importedQuotes);
      saveQuotes();
      alert("Quotes imported successfully!");
    } catch (err) {
      alert("Error reading JSON file. Please check its format.");
    }
  };

  fileReader.readAsText(event.target.files[0]);
}

// === Restore last quote from sessionStorage (if available) ===
document.addEventListener("DOMContentLoaded", () => {
  const lastQuote = sessionStorage.getItem("lastQuote");
  if (lastQuote) {
    const quote = JSON.parse(lastQuote);
    quoteDisplay.textContent = `"${quote.text}" — ${quote.category}`;
  } else {
    showRandomQuote();
  }

  newQuoteBtn.addEventListener("click", showRandomQuote);
});
