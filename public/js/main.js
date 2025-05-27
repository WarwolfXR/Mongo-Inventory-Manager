const form = document.getElementById('itemForm');
const list = document.getElementById('inventoryList');
const updateModal = document.getElementById('updateModal');
const cancelUpdate = document.getElementById('cancelUpdate');
const saveUpdate = document.getElementById('saveUpdate');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const quantity = document.getElementById('quantity').value.trim();
  const price = document.getElementById('price').value.trim();

  if (!name || !quantity || !price) return alert("Please fill all fields.");

  const res = await fetch('/api/items', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, quantity, price }),
  });

  const item = await res.json();
  addItemToList(item);
  form.reset();
});

window.onload = async () => {
  const res = await fetch('/api/items');
  const items = await res.json();
  list.innerHTML = ''; // Clear list to avoid duplicates
  items.forEach(addItemToList);
};

function addItemToList(item) {
  const li = document.createElement('li');
  li.innerHTML = `
    <span><strong>${item.name}</strong> - Qty: ${item.quantity}, $${item.price}</span>
    <div class="button-group">
      <button class="btn btn-update">Update</button>
      <button class="btn btn-delete">Delete</button>
    </div>
  `;

  li.querySelector('.btn-delete').addEventListener('click', async () => {
    const confirmDelete = confirm(`Delete "${item.name}"?`);
    if (!confirmDelete) return;

    await fetch(`/api/items/${item._id}`, { method: 'DELETE' });
    li.remove();
  });

  li.querySelector('.btn-update').addEventListener('click', () => {
    document.getElementById('updateId').value = item._id;
    document.getElementById('updateName').value = item.name;
    document.getElementById('updateQuantity').value = item.quantity;
    document.getElementById('updatePrice').value = item.price;
    document.getElementById('updateCategory').value = item.category || '';

    updateModal.classList.remove('hidden');
  });

  list.appendChild(li);
}

// Cancel update modal
cancelUpdate.addEventListener('click', () => {
  updateModal.classList.add('hidden');
  clearUpdateForm();
});

// Save update modal
saveUpdate.addEventListener('click', async () => {
  const id = document.getElementById('updateId').value;
  const updatedItem = {
    name: document.getElementById('updateName').value.trim(),
    quantity: document.getElementById('updateQuantity').value.trim(),
    price: document.getElementById('updatePrice').value.trim(),
    category: document.getElementById('updateCategory').value.trim(),
  };

  if (!updatedItem.name || !updatedItem.quantity || !updatedItem.price) {
    return alert("Please fill all fields.");
  }

  await fetch(`/api/items/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedItem),
  });

  updateModal.classList.add('hidden');
  clearUpdateForm();
  location.reload();
});

function clearUpdateForm() {
  document.getElementById('updateId').value = '';
  document.getElementById('updateName').value = '';
  document.getElementById('updateQuantity').value = '';
  document.getElementById('updatePrice').value = '';
  document.getElementById('updateCategory').value = '';
}
