import React from 'react';
import { Segment, Button } from 'semantic-ui-react';

import './checkbox.css';

export default function TodoItem({ item, index, onComplete, onActive, onRemove, onPriorityChange }) {
	const onRemoveClick = () => {
		onRemove(index);
	};

	const isComplete = item.state === 'complete';

	const priorityColor = item.priority === 'high' ? 'red' : item.priority === 'medium' ? 'orange' : 'yellow';

	const onCheck = () => {
		isComplete ? onActive(index) : onComplete(index);
	};

	const changePriority = () => {
		const toChange = item.priority === 'high' ? 'low' : item.priority === 'medium' ? 'high' : 'medium';
		onPriorityChange(index, toChange);
	};

	return (
		<Segment
			clearing
			color={item.state === 'active' ? 'yellow' : 'green'}
			style={{ marginTop: 10, textDecorationLine: isComplete ? 'line-through' : null }}
		>
			<Button
				active={isComplete}
				size="tiny"
				basic={!isComplete}
				inverted={isComplete}
				color="green"
				icon="check"
				circular
				onClick={onCheck}
				style={{ marginRight: 20 }}
			/>
			{item.name}
			<Button size="tiny" icon="remove" inverted color="red" floated="right" onClick={onRemoveClick} />
			<Button
				size="mini"
				basic
				content={item.priority}
				color={priorityColor}
				floated="right"
				onClick={changePriority}
				style={{
					marginRight: '15px',
					marginTop: '1px'
				}}
			/>
		</Segment>
	);
}
