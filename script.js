// bring everything we need to target in the global scope
const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
const formBtn = itemForm.querySelector('button');
let isEditMode = false;
//functions:
const displayItems = () => {
	const itemsFromStorage = getItemFromStorage();
	itemsFromStorage.forEach((item) => {
		addItemToDOM(item);
	});
	checkUI();
};

const onAddItemSubmit = (e) => {
	e.preventDefault();
	const newItem = itemInput.value;
	// validate input
	if (newItem.trim() === '') {
		alert('Please add an Item');
		return;
	}
	// check for edit mode
	if (isEditMode) {
		const itemToEdit = itemList.querySelector('.editMode');
		removeItemFromStorage(itemToEdit.textContent);
		itemToEdit.classList.remove('editMode');
		itemToEdit.remove();
		isEditMode = false;
	} else {
		if (checkIfItemExist(newItem)) {
			alert('That item already exist');
			return;
		}
	}
	// create Item DOM ELement
	addItemToDOM(newItem);
	// add item to local storage
	addItemToStorage(newItem);
	checkUI();
	itemInput.value = '';
	itemInput.focus();
};
// adding item to local storage

const addItemToStorage = (item) => {
	const itemsFromStorage = getItemFromStorage();
	//adding new item to array
	itemsFromStorage.push(item);
	//convert to Jason string and set to local storage
	localStorage.setItem('items', JSON.stringify(itemsFromStorage));
};

// get item from storage
const getItemFromStorage = () => {
	let itemsFromStorage;
	if (localStorage.getItem('items') === null) {
		itemsFromStorage = [];
	} else {
		itemsFromStorage = JSON.parse(localStorage.getItem('items'));
	}
	return itemsFromStorage;
};
// adding item to the DOM
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

const onClickItem = (e) => {
	if (e.target.parentElement.classList.contains('remove-item')) {
		removeItem(e.target.parentElement.parentElement);
	} else if (e.target.parentElement.classList.contains('mark-item')) {
		markItem(e.target.parentElement.parentElement);
	} else if (e.target.tagName === 'SPAN') {
		// placeholder for edit functionality
		setItemToEdit(e.target);
	}
};

// check if item Already added to list

const checkIfItemExist = (item) => {
	const itemsFromStorage = getItemFromStorage();
	return itemsFromStorage.includes(item);
};
//edit item
const setItemToEdit = (item) => {
	isEditMode = true;
	itemList.querySelectorAll('li').forEach((li) => {
		li.classList.remove('editMode');
	});

	item.parentElement.classList.add('editMode');

	formBtn.innerHTML = '<i class="fa-solid fa-pen"></i>  Update Item';
	formBtn.style.backgroundColor = '#228B22';
	itemInput.value = item.textContent;
};
// removing the li

const removeItem = (li) => {
	if (confirm('Do you want to delete item?')) {
		const itemName = li.querySelector('span').textContent;
		li.remove();
		removeItemFromStorage(itemName);
		checkUI();
	}
};

const removeItemFromStorage = (item) => {
	let itemsFromStorage = getItemFromStorage();
	itemsFromStorage = itemsFromStorage.filter((i) => i !== item);
	localStorage.setItem('items', JSON.stringify(itemsFromStorage));
};

const clearItems = () => {
	if (confirm('Do you want to delete All item?')) {
		while (itemList.firstChild) {
			itemList.removeChild(itemList.firstChild);
		}
		localStorage.removeItem('items'); // <-- add this line
	}
	checkUI();
};
const markItem = (li) => {
	const span = li.querySelector('span');
	span.classList.toggle('marked');
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
	itemInput.value = '';
	const items = itemList.querySelectorAll('li');
	if (items.length === 0) {
		clearBtn.style.display = 'none';
		itemFilter.style.display = 'none';
	} else {
		clearBtn.style.display = 'block';
		itemFilter.style.display = 'block';
	}

	formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
	formBtn.style.backgroundColor = '#210b2c';
	isEditMode = false;
};

// initialize app

const init = () => {
	//Event listeners:
	itemForm.addEventListener('submit', onAddItemSubmit);
	itemList.addEventListener('click', onClickItem);
	clearBtn.addEventListener('click', clearItems);
	itemFilter.addEventListener('input', filterItem);
	window.addEventListener('DOMContentLoaded', () => itemInput.focus());
	document.addEventListener('DOMContentLoaded', displayItems);

	checkUI();
};

init();
