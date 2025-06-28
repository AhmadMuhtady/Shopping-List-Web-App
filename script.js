// bring everything we need to target in the global scope
const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');

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
	const itemSpan = document.createElement('span');
	itemSpan.textContent = newItem;

	const buttonDelete = createButtonDelete('remove-item btn-link text-red');
	const buttonMark = createButtonMark('mark-item btn-link text-green');

	li.appendChild(buttonMark);
	li.appendChild(itemSpan);
	li.appendChild(buttonDelete);

	itemList.appendChild(li);
	checkUI();
	itemInput.value = '';
	itemInput.focus();
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

// removing the li

const removeItem = (e) => {
	if (e.target.parentElement.classList.contains('remove-item')) {
		if (confirm('Do you want to delete item?')) {
			e.target.parentElement.parentElement.remove();

			checkUI();
		}
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
const markItem = (e) => {
	if (e.target.parentElement.classList.contains('mark-item')) {
		const li = e.target.parentElement.parentElement;
		const span = li.querySelector('span');
		span.classList.toggle('marked');
	}
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
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearItems);
itemList.addEventListener('click', markItem);
clearBtn.addEventListener('click', checkUI);
