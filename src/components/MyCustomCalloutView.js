import React from 'react';
import { StyleSheet, Text, View, Button, Dimensions, TouchableOpacity } from 'react-native';

export default class MyCustomCalloutView extends React.Component {
	state = {
		name: 'World!',
	};

	constructor(props) {
		super(props);
	}

	onClick = () => {
		console.log('clicked...');
		this.setState({
			name: 'Borgo!',
		});
	};

	calloutPress() {
		console.log('hello!');
	}

	render() {
		return (
			<View style={styles.container}>
				<Text>{this.props.title}</Text>
				<Button
					onPress={this.onClick}
					title={'Hi ' + this.state.name}
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
