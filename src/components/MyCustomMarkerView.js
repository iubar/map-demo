import React from 'react';
import { StyleSheet, Text, View, Button, Dimensions } from 'react-native';

export default class MyCustomMarkerView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: 'World!',
		};
	}
	onClick = () => {
		this.setState({
			name: 'John!',
		});
	};
	render() {
		return (
			<View style={styles.container}>
				<Text>Hello {this.state.name}</Text>
				<Button
					onPress={() => {
						this.onClick();
					}}
					title="Click me"
					color="#4169E1"></Button>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	nameText: {
		fontSize: 50,
		padding: 15,
	},
});
