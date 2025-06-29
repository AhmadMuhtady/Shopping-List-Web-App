// // bring everything we need to target in the global scope
// const itemForm = document.getElementById('item-form');
// const itemInput = document.getElementById('item-input');
// const itemList = document.getElementById('item-list');
// const clearBtn = document.getElementById('clear');
// const itemFilter = document.getElementById('filter');

// //functions:
// const onAddItemSubmit = (e) => {
// 	e.preventDefault();
// 	const newItem = itemInput.value;
// 	// validate input
// 	if (newItem === '') {
// 		alert('Please add an Item');
// 		return;
// 	}

// 	// create list Item
// 	addItemToDOM(newItem);
// 	checkUI();
// 	itemInput.value = '';
// 	itemInput.focus();
// };

// const addItemToDOM = (item) => {
// 	const li = document.createElement('li');
// 	const itemSpan = document.createElement('span');
// 	itemSpan.textContent = item;

// 	const buttonDelete = createButtonDelete('remove-item btn-link text-red');
// 	const buttonMark = createButtonMark('mark-item btn-link text-green');

// 	li.appendChild(buttonMark);
// 	li.appendChild(itemSpan);
// 	li.appendChild(buttonDelete);

// 	itemList.appendChild(li);
// };
// // create a button that will be inside the Li and has the classes we want
// const createButtonDelete = (classes) => {
// 	const button = document.createElement('button');
// 	button.className = classes;
// 	const iconX = createIcon('fa-solid fa-xmark');
// 	button.appendChild(iconX);
// 	return button;
// };

// const createButtonMark = (classes) => {
// 	const button = document.createElement('button');
// 	button.className = classes;
// 	const iconC = createIcon('fa-solid fa-check');
// 	button.appendChild(iconC);
// 	return button;
// };

// const createIcon = (classes) => {
// 	const icon = document.createElement('i');
// 	icon.className = classes;
// 	return icon;
// };

// // removing the li

// const removeItem = (e) => {
// 	if (e.target.parentElement.classList.contains('remove-item')) {
// 		if (confirm('Do you want to delete item?')) {
// 			e.target.parentElement.parentElement.remove();

// 			checkUI();
// 		}
// 	}
// };

// const clearItems = () => {
// 	if (confirm('Do you want to delete All item?')) {
// 		while (itemList.firstChild) {
// 			itemList.removeChild(itemList.firstChild);
// 		}
// 	}
// 	checkUI();
// };
// const markItem = (e) => {
// 	if (e.target.parentElement.classList.contains('mark-item')) {
// 		const li = e.target.parentElement.parentElement;
// 		const span = li.querySelector('span');
// 		span.classList.toggle('marked');
// 	}
// };

// const filterItem = (e) => {
// 	const items = itemList.querySelectorAll('li');
// 	const text = e.target.value.toLowerCase();
// 	items.forEach((item) => {
// 		const itemName = item.querySelector('span').textContent.toLowerCase();
// 		if (itemName.indexOf(text) != -1) {
// 			item.style.display = 'flex';
// 		} else {
// 			item.style.display = 'none';
// 		}
// 	});
// };

// const checkUI = () => {
// 	const items = itemList.querySelectorAll('li');
// 	if (items.length === 0) {
// 		clearBtn.style.display = 'none';
// 		itemFilter.style.display = 'none';
// 	} else {
// 		clearBtn.style.display = 'block';
// 		itemFilter.style.display = 'block';
// 	}
// };

// //Event listeners:
// itemForm.addEventListener('submit', onAddItemSubmit);
// itemList.addEventListener('click', removeItem);
// clearBtn.addEventListener('click', clearItems);
// itemList.addEventListener('click', markItem);
// itemFilter.addEventListener('input', filterItem);
// window.addEventListener('DOMContentLoaded', () => itemInput.focus());

// checkUI();

// bring everything we need to target in the global scope
const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');

//functions:
const onAddItemSubmit = (e) => {
	e.preventDefault();
	const newItem = itemInput.value;
	// validate input
	if (newItem === '') {
		alert('Please add an Item');
		return;
	}

	// create list Item
	addItemToDOM(newItem);
	checkUI();
	itemInput.value = '';
	itemInput.focus();
};

const addItemToStorage = (item) => {};

const addItemToDOM = (item) => {
	const li = document.createElement('li');
	const itemSpan = document.createElement('span');
	itemSpan.textContent = item;

	const buttonDelete = createButtonDelete('remove-item btn-link text-red');
	const buttonMark = createButtonMark('mark-item btn-link text-green');

	li.appendChild(buttonMark);
	li.appendChild(itemSpan);
	li.appendChild(buttonDelete);

	itemList.appendChild(li);
};

// create a button that will be inside the Li and has the classes we want
const createButtonDelete = (classes) => {
	const button = document.createElement('button');
	button.className = classes;
	const iconX = createIcon('fa-solid fa-xmark');
	button.appendChild(iconX);
	return button;
};

const createButtonMark = (classes) => {
	const button = document.createElement('button');
	button.className = classes;
	const iconC = createIcon('fa-solid fa-check');
	button.appendChild(iconC);
	return button;
};

const createIcon = (classes) => {
	const icon = document.createElement('i');
	icon.className = classes;
	return icon;
};

// Combined function to handle both remove and mark actions
const handleItemClick = (e) => {
	// Check if clicked element is a remove button
	if (e.target.parentElement.classList.contains('remove-item')) {
		if (confirm('Do you want to delete item?')) {
			e.target.parentElement.parentElement.remove();
			checkUI();
		}
	}
	// Check if clicked element is a mark button
	else if (e.target.parentElement.classList.contains('mark-item')) {
		const li = e.target.parentElement.parentElement;
		const span = li.querySelector('span');
		span.classList.toggle('marked');
	}
};

const clearItems = () => {
	if (confirm('Do you want to delete All item?')) {
		while (itemList.firstChild) {
			itemList.removeChild(itemList.firstChild);
		}
	}
	checkUI();
};

const filterItem = (e) => {
	const items = itemList.querySelectorAll('li');
	const text = e.target.value.toLowerCase();
	items.forEach((item) => {
		const itemName = item.querySelector('span').textContent.toLowerCase();
		if (itemName.indexOf(text) != -1) {
			item.style.display = 'flex';
		} else {
			item.style.display = 'none';
		}
	});
};

const checkUI = () => {
	const items = itemList.querySelectorAll('li');
	if (items.length === 0) {
		clearBtn.style.display = 'none';
		itemFilter.style.display = 'none';
	} else {
		clearBtn.style.display = 'block';
		itemFilter.style.display = 'block';
	}
};

//Event listeners:
itemForm.addEventListener('submit', onAddItemSubmit);
itemList.addEventListener('click', handleItemClick); // Single event listener
clearBtn.addEventListener('click', clearItems);
itemFilter.addEventListener('input', filterItem);
window.addEventListener('DOMContentLoaded', () => itemInput.focus());

checkUI();
