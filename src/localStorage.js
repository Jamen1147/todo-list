export const localStore = {
	getItems: () => {
		return JSON.parse(localStorage.getItem('todo-items'));
	},
	setItems: (items) => {
		localStorage.setItem('todo-items', JSON.stringify(items));
	}
};
