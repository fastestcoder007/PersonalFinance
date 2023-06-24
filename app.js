// Initialize variables
let transactions = [];
let balance = 0;

// Function to update the balance display
function updateBalance() {
    const balanceElement = document.getElementById("balance");
    balanceElement.textContent = `$${balance.toFixed(2)}`;    
}


// Function to display transactions
function displayTransactions() {
  const transactionsElement = document.getElementById("transactions");
  transactionsElement.innerHTML = "";

  transactions.forEach(transaction => {
    const transactionElement = document.createElement("div");
    transactionElement.classList.add("transaction");
    const transactionType = transaction.amount > 0 ? "income" : "expense";
    transactionElement.classList.add(transactionType);

    const descriptionElement = document.createElement("span");
    descriptionElement.textContent = transaction.description;

    const amountElement = document.createElement("span");
    amountElement.classList.add("amount");
    amountElement.textContent = `$${transaction.amount.toFixed(2)}`;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      deleteTransaction(transaction.id);
    });

    transactionElement.appendChild(descriptionElement);
    transactionElement.appendChild(amountElement);
    transactionElement.appendChild(deleteButton);
    transactionsElement.appendChild(transactionElement);
  });
}

// Function to add a transaction
function addTransaction(description, amount, type) {
  const transaction = {
    id: Date.now(),
    description,
    amount: parseFloat(amount) * (type === "expense" ? -1 : 1)
  };

  transactions.push(transaction);
  balance += transaction.amount;

  displayTransactions();
  updateBalance();
}

// Function to delete a transaction
function deleteTransaction(id) {
  const transactionIndex = transactions.findIndex(transaction => transaction.id === id);
  if (transactionIndex > -1) {
    balance -= transactions[transactionIndex].amount;
    transactions.splice(transactionIndex, 1);
    displayTransactions();
    updateBalance();
  }
}

// Handle form submission
const transactionForm = document.getElementById("transaction-form");
transactionForm.addEventListener("submit", event => {
  event.preventDefault();

  const descriptionInput = document.getElementById("description");
  const amountInput = document.getElementById("amount");
  const typeInput = document.getElementById("transaction-type");

  addTransaction(descriptionInput.value, amountInput.value, typeInput.value);

  descriptionInput.value = "";
  amountInput.value = "";
});

// Initial display
updateBalance();
displayTransactions();
