import React, { useState } from 'react';
import { Responsive } from 'semantic-ui-react';
import Main from './Main';

import { localStore } from '../localStorage';

export default function App() {
	const initItems = [
		{ name: 'Do homeworks', state: 'complete', priority: 'high' },
		{ name: 'Coding', state: 'active', priority: 'medium' }
	];
	const [ items, setItems ] = useState(localStore.getItems() || initItems);

	const onItemComplete = (index) => {
		items[index].state = 'complete';
		setItems([ ...items ]);
		localStore.setItems([ ...items ]);
	};

	const onItemActive = (index) => {
		items[index].state = 'active';
		setItems([ ...items ]);
		localStore.setItems([ ...items ]);
	};

	const onItemRemove = (index) => {
		items.splice(index, 1);
		setItems([ ...items ]);
		localStore.setItems([ ...items ]);
	};

	const onItemDrag = (arrayMove, from, to) => {
		const result = arrayMove(items, from, to);
		setItems(result);
		localStore.setItems(result);
	};

	const onAdd = (items, toAdd) => {
		setItems([ ...items, toAdd ]);
		localStore.setItems([ ...items, toAdd ]);
	};

	const onPriorityChange = (index, priority) => {
		items[index].priority = priority;
		setItems([ ...items ]);
		localStore.setItems([ ...items ]);
	};

	const getWidth = () => {
		const isSSR = typeof window === 'undefined';
		return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
	};
	return (
		<React.Fragment>
			<Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth} style={{ height: '100%' }}>
				<Main
					items={items}
					onActive={onItemActive}
					onComplete={onItemComplete}
					onDrag={onItemDrag}
					onRemove={onItemRemove}
					onAddItem={onAdd}
					onPriorityChange={onPriorityChange}
				/>
			</Responsive>
			<Responsive getWidth={getWidth} maxWidth={Responsive.onlyMobile.maxWidth} style={{ height: '100%' }}>
				<Main
					isMobile
					items={items}
					onActive={onItemActive}
					onComplete={onItemComplete}
					onDrag={onItemDrag}
					onRemove={onItemRemove}
					onAddItem={onAdd}
					onPriorityChange={onPriorityChange}
				/>
			</Responsive>
		</React.Fragment>
	);
}
