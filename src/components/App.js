import React, { useState } from 'react';
import { Responsive } from 'semantic-ui-react';
import Main from './Main';

export default function App() {
	const initItems = [ { name: 'Do homeworks', state: 'complete' }, { name: 'Coding', state: 'active' } ];
	const [ items, setItems ] = useState(initItems);

	const onItemComplete = (index) => {
		items[index].state = 'complete';
		setItems([ ...items ]);
	};

	const onItemActive = (index) => {
		items[index].state = 'active';
		setItems([ ...items ]);
	};

	const onItemRemove = (index) => {
		items.splice(index, 1);
		setItems([ ...items ]);
	};

	const onItemDrag = (arrayMove, from, to) => {
		setItems(arrayMove(items, from, to));
	};

	const onAdd = (items, toAdd) => {
		setItems([ ...items, toAdd ]);
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
				/>
			</Responsive>
		</React.Fragment>
	);
}
