import React from 'react';
import { List, arrayMove } from 'react-movable';
import TodoItem from './TodoItem';

export default function TodoList({ items, showState, onItemActive, onItemComplete, onItemRemove, onItemDrag }) {
	const renderList = (children, props) => {
		return (
			<ul {...props} style={{ listStyleType: 'none' }}>
				{children}
			</ul>
		);
	};

	const renderItem = (value, index, props) => {
		if (showState === 'all' || value.state === showState) {
			return (
				<li {...props}>
					<TodoItem
						item={value}
						index={index}
						onComplete={onItemComplete}
						onActive={onItemActive}
						onRemove={onItemRemove}
					/>
				</li>
			);
		}
		return null;
	};

	return (
		<div>
			<List
				values={items}
				onChange={({ oldIndex, newIndex }) => onItemDrag(arrayMove, oldIndex, newIndex)}
				renderList={({ children, props }) => renderList(children, props)}
				renderItem={({ value, index, props }) => renderItem(value, index, props)}
			/>
		</div>
	);
}
