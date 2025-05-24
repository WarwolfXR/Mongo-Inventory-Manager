const form = document.getElementById('itemForm');
const list = document.getElementById('inventoryList');
const updateModal = document.getElementById('updateModal');
const updateForm = document.getElementById('updateForm');
const cancelUpdate = document.getElementById('cancelUpdate');

// Handle new item form submission
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const quantity = document.getElementById('quantity').value;
  const price = document.getElementById('price').value;

  const res = await fetch('/api/items', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, quantity, price }),
  });

  const item = await res.json();
  addItemToList(item);
  form.reset();
});

// Load items on page load
window.onload = async () => {
  const res = await fetch('/api/items');
  const items = await res.json();
  items.forEach(addItemToList);
};

// Add item to list with Update/Delete buttons
function addItemToList(item) {
  const li = document.createElement('li');
  li.innerHTML = `
    <span>${item.name} - Qty: ${item.quantity}, $${item.price}</span>
    <div class="button-group">
      <button class="btn btn-update">Update</button>
      <button class="btn btn-delete">Delete</button>
    </div>
  `;

  // Delete logic
  li.querySelector('.btn-delete').addEventListener('click', async () => {
    const confirmDelete = confirm(`Delete "${item.name}"?`);
    if (!confirmDelete) return;

    await fetch(`/api/items/${item._id}`, { method: 'DELETE' });
    li.remove();
  });

  // Update logic
  li.querySelector('.btn-update').addEventListener('click', () => {
    document.getElementById('updateId').value = item._id;
    document.getElementById('updateName').value = item.name;
    document.getElementById('updateQuantity').value = item.quantity;
    document.getElementById('updatePrice').value = item.price;
    updateModal.classList.remove('hidden');
  });

  list.appendChild(li);
}

// Modal close button
cancelUpdate.addEventListener('click', () => {
  updateModal.classList.add('hidden');
});

// Handle update form submission
updateForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = document.getElementById('updateId').value;
  const updatedItem = {
    name: document.getElementById('updateName').value,
    quantity: document.getElementById('updateQuantity').value,
    price: document.getElementById('updatePrice').value,
  };

  await fetch(`/api/items/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedItem),
  });

  updateModal.classList.add('hidden');
  location.reload();
});
