'use strict';

// Fetch existing todos from localStorage
const getSavedTodos = () => {
	const todosJSON = localStorage.getItem('todos');
	try {
		return todosJSON ? JSON.parse(todosJSON) : [];
	} catch (e) {
		return [];
	}
};

// Remove todo
const removeTodo = (id) => {
	const deleteTodoIndex = todos.findIndex((todo) => todo.id === id);

	if (deleteTodoIndex > -1) {
		todos.splice(deleteTodoIndex, 1);
	}
};

// Toggle the completed value for a given todo
const toggleTodo = (id) => {
	const todo = todos.find((todo) => todo.id === id);
	if (todo) {
		todo.completed = !todo.completed;
	}
};

// Save todos to localStorage
const saveTodos = (todos) => {
	localStorage.setItem('todos', JSON.stringify(todos));
};

// Render application todos based on filters
const renderTodos = (todos, filters) => {
	const filteredTodos = todos.filter((todo) => {
		const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase());
		const hideCompletedMatch = !filters.hideCompleted || !todo.completed;

		return searchTextMatch && hideCompletedMatch;
	});

	const incompleteTodos = filteredTodos.filter((todo) => !todo.completed);

	document.querySelector('#todos').innerHTML = '';

	document.querySelector('#todos').appendChild(generateSummaryDOM(incompleteTodos));

	if (filteredTodos.length !== 0) {
		filteredTodos.forEach((todo) => {
			document.querySelector('#todos').appendChild(genetateTodoDOM(todo));
		});
	} else {
		const messageEl = document.createElement('p');
		messageEl.classList.add('empty-message');
		messageEl.textContent = 'No to-dos to show';
		document.querySelector('#todos').appendChild(messageEl);
	}
};

// Get the DOM elements for an individual note
const genetateTodoDOM = (todo) => {
	const todoEl = document.createElement('label');
	const containerEl = document.createElement('div');
	const checkbox = document.createElement('input');
	const todoText = document.createElement('span');
	const removeButton = document.createElement('button');

	// Setup todo checkbox
	checkbox.setAttribute('type', 'checkbox');
	checkbox.checked = todo.completed;
	containerEl.appendChild(checkbox);
	checkbox.addEventListener('change', () => {
		toggleTodo(todo.id);
		saveTodos(todos);
		renderTodos(todos, filters);
	});

	// Setup the todo text
	todoText.textContent = todo.text;
	containerEl.appendChild(todoText);

	// Setup container
	todoEl.classList.add('list-item');
	containerEl.classList.add('list-item__container');
	todoEl.appendChild(containerEl);

	// Setup the remove button
	removeButton.textContent = 'remove';
	removeButton.classList.add('button', 'button--text');
	todoEl.appendChild(removeButton);
	removeButton.addEventListener('click', () => {
		removeTodo(todo.id);
		saveTodos(todos);
		renderTodos(todos, filters);
	});

	return todoEl;
};

// Get the DOM element for list su mmary
const generateSummaryDOM = (incompleteTodos) => {
	const leftTodos = incompleteTodos.length;
	const summary = document.createElement('h2');
	summary.classList.add('list-title');
	summary.textContent = leftTodos > 1 ? `You have ${leftTodos} todos left` : `You have ${leftTodos} todo left`;
	return summary;
};
