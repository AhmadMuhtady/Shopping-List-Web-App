// bring everything we need to target in the global scope
const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');

//functions:
const addItem = (e) => {
	e.preventDefault();
	const newItem = itemInput.value;
	// validate input
	if (newItem === '') {
		alert('Please add an Item');
		return;
	}

	// create list Item
	const li = document.createElement('li');
	const itemText = document.createTextNode(newItem);

	const buttonDelete = createButtonDelete('remove-item btn-link text-red');
	const buttonMark = createButtonMark('mark-item btn-link text-green');

	li.appendChild(buttonMark);
	li.appendChild(itemText);
	li.appendChild(buttonDelete);

	itemList.appendChild(li);
	itemInput.value = '';
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
//Event listeners:
itemForm.addEventListener('submit', addItem);
