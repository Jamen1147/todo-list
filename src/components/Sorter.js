import React from 'react';
import { Menu, Container } from 'semantic-ui-react';

export default function Sorter({ isMobile, currentItem, onMenuChange }) {
	const style = {
		width: isMobile ? '100%' : '90%',
		position: isMobile ? null : 'absolute',
		bottom: isMobile ? null : 1.5,
		right: isMobile ? null : 15
	};

	const handleChange = (item) => {
		onMenuChange(item);
	};

	return (
		<Container style={style}>
			<Menu widths={3} secondary pointing>
				<Menu.Item name="all" color="blue" active={currentItem === 'all'} onClick={() => handleChange('all')} />
				<Menu.Item
					name="active"
					color="yellow"
					active={currentItem === 'active'}
					onClick={() => handleChange('active')}
				/>
				<Menu.Item
					name="complete"
					color="green"
					active={currentItem === 'complete'}
					onClick={() => handleChange('complete')}
				/>
			</Menu>
		</Container>
	);
}
