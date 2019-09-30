import React, { useRef } from 'react';
import $ from 'jquery';
import { Segment, Button, Ref } from 'semantic-ui-react';

import './checkbox.css';

export default function TodoItem({ item, index, onComplete, onActive, onRemove }) {
	const itemRef = useRef(`item-${index}`);

	const onRemoveClick = () => {
		$(itemRef.current).slideUp(200);
		setTimeout(() => {
			onRemove(index);
			setTimeout(() => {
				$(itemRef.current).slideDown(0);
				$('.ui.inverted.red.button').focus(function() {
					this.blur();
				});
				document.body.focus();
			}, 100);
		}, 100);
	};

	const isComplete = item.state === 'complete';

	const onCheck = () => {
		isComplete ? onActive(index) : onComplete(index);
	};

	return (
		<Ref innerRef={itemRef}>
			<Segment
				clearing
				color={item.state === 'active' ? 'yellow' : 'green'}
				style={{ marginTop: 10, marginRight: 35, textDecorationLine: isComplete ? 'line-through' : null }}
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
			</Segment>
		</Ref>
	);
}
