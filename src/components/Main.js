import React, { useState, useRef, useEffect } from 'react';
import { Segment, Input, Icon, Grid, Container, Ref } from 'semantic-ui-react';
import TodoList from './TodoList';
import Sorter from './Sorter';
export default function Main({ isMobile, items, onAddItem, onComplete, onActive, onRemove, onDrag }) {
	const [ inputVal, setInputVal ] = useState('');

	const [ currentMenuItem, setCurrentMenuItem ] = useState('all');

	const inputRef = useRef('todo-input');

	const onAdd = () => {
		if (inputVal.replace(/ /g, '')) {
			onAddItem(items, { name: inputVal, state: 'active' });
		}
		setInputVal('');
	};

	useEffect(() => {
		const ref = inputRef.current;
		ref.addEventListener('keyup', (evt) => {
			if (evt.key === 'Enter') {
				onAdd();
			}
		});
		return () => {
			ref.removeEventListener('keyup', (evt) => {
				if (evt.key === 'Enter') {
					onAdd();
				}
			});
		};
	});

	const onMenuChange = (item) => {
		setCurrentMenuItem(item);
	};

	const renderRows = () => {
		if (isMobile) {
			return (
				<Container textAlign="center">
					<Sorter isMobile currentItem={currentMenuItem} onMenuChange={onMenuChange} />
					<Ref innerRef={inputRef}>
						<Input
							value={inputVal}
							onChange={(evt) => setInputVal(evt.target.value)}
							icon={<Icon name="plus" link onClick={onAdd} />}
							placeholder="Add..."
							style={{
								width: '90%',
								marginTop: 20,
								marginBottom: 20
							}}
						/>
					</Ref>
				</Container>
			);
		}

		return (
			<Grid style={{ padding: '2em' }}>
				<Grid.Row columns={2}>
					<Grid.Column>
						<Ref innerRef={inputRef}>
							<Input
								value={inputVal}
								onChange={(evt) => setInputVal(evt.target.value)}
								icon={<Icon name="plus" link onClick={onAdd} />}
								placeholder="Add..."
								style={{ width: '90%' }}
							/>
						</Ref>
					</Grid.Column>
					<Grid.Column>
						<Sorter currentItem={currentMenuItem} onMenuChange={onMenuChange} />
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	};

	return (
		<Segment
			basic
			style={{ padding: !isMobile ? '5em 10em' : '5em 2em', height: '100%', backgroundColor: '#eeeeee' }}
		>
			<Segment
				stacked
				style={{
					maxWidth: 1000,
					marginLeft: 'auto',
					marginRight: 'auto',
					height: '100%',
					backgroundColor: '#fbfbfb'
				}}
			>
				<Segment vertical>{renderRows()}</Segment>
				<Container style={{ height: '90%', overflowY: 'auto', padding: '2em 1em' }}>
					<TodoList
						items={items}
						showState={currentMenuItem}
						onItemRemove={(index) => onRemove(index)}
						onItemComplete={(index) => onComplete(index)}
						onItemActive={(index) => onActive(index)}
						onItemDrag={(arrayMove, from, to) => onDrag(arrayMove, from, to)}
					/>
				</Container>
			</Segment>
		</Segment>
	);
}
