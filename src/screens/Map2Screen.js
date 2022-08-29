import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Button, Alert } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';

export default class Map2Screen extends React.Component {
	state = {
		region: { latitude: 90, longitude: 0, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
		marker: null,
		gpsPermission: false,
	};

	constructor(props) {
		super(props);
		this.initStateGpsPermission();
	}

	async initStateGpsPermission() {
		let response = await Location.requestForegroundPermissionsAsync();
		if (response.status === 'granted') {
			this.state.gpsPermission = true;
		}
	}

	getGpsPosition = async () => {
		if (!this.state.gpsPermission) {
			let gpsStatus = await this.checkGpsPermission();
			if (gpsStatus === 'granted') {
				this.state.gpsPermission = true;
			}
		} else {
			console.log('OK gpsPermission: ' + JSON.stringify(this.state.gpsPermission));
		}

		if (this.state.gpsPermission) {
			let region = await this.getLocationAsync();
			if (region) {
				this.setState({
					region: region,
					marker: { latitude: region.latitude, longitude: region.longitude },
				});
			} else {
				console.error('region: ' + JSON.stringify(region));
			}
		}
	};

	checkGpsPermission = async () => {
		let { status } = await Location.getForegroundPermissionsAsync();
		let buttons = [];
		buttons.push({ text: 'Ok', onPress: this.eventCancelPermission, style: 'cancel' });
		if (status !== 'granted') {
			Alert.alert('Attenzione', 'Permessi gps obbligatori', buttons, { cancelable: false });
		}

		return status;
	};

	getLocationAsync = async () => {
		let _region = this.state.initialRegion;
		try {
			let location = await Location.getCurrentPositionAsync({});
			_region = {
				latitude: location.coords.latitude,
				longitude: location.coords.longitude,
				latitudeDelta: 0.0922,
				longitudeDelta: 0.0421,
			};
		} catch (error) {
			console.log('Location.getCurrentPositionAsync: ' + JSON.stringify(error));
		}

		return _region;
	};

	eventCancelPermission = async () => {
		console.log('cancelled...');
	};

	onRegionChange = (region) => {
		console.log('onRegionChange: region changed: ' + JSON.stringify(region));
	};

	animateToRegion = async () => {
		console.log('animateToRegion...');
		if (!this.state.gpsPermission) {
			let gpsStatus = await this.checkGpsPermission();
			if (gpsStatus === 'granted') {
				this.state.gpsPermission = true;
			} else {
				console.error('gpsStatus: ' + JSON.stringify(gpsStatus));
			}
		} else {
			console.log('OK gpsPermission: ' + JSON.stringify(this.state.gpsPermission));
		}

		if (this.state.gpsPermission) {
			let region = await this.getLocationAsync();
			if (region) {
				// let region2= {
				//     latitude: region.latitude,
				//     longitude: region.longitude,
				//     latitudeDelta: 1,
				//     longitudeDelta: 1,
				//     };

				console.log('animateToRegion: ' + JSON.stringify(region));
				this.map.animateToRegion(region, 2000);
			} else {
				console.error('region: ' + JSON.stringify(region));
			}
		}
	};

	getCamera = async () => {
		const camera = await this.map.getCamera();
		Alert.alert('Current camera', JSON.stringify(camera), [{ text: 'OK' }], {
			cancelable: true,
		});
	};

	setCamera = async () => {
		const camera = await this.map.getCamera();
		// Note that we do not have to pass a full camera object to setCamera().
		// Similar to setState(), we can pass only the properties you like to change.
		this.map.setCamera({
			heading: camera.heading + 10,
		});
	};

	/**
	 * @see https://github.com/react-native-maps/react-native-maps/blob/0.30.x/example/examples/CameraControl.js
	 */
	animateCamera = async () => {
		console.log('animateCamera...');
		if (!this.state.gpsPermission) {
			let gpsStatus = await this.checkGpsPermission();
			if (gpsStatus === 'granted') {
				this.state.gpsPermission = true;
			} else {
				console.error('gpsStatus: ' + JSON.stringify(gpsStatus));
			}
		} else {
			console.log('OK gpsPermission: ' + JSON.stringify(this.state.gpsPermission));
		}

		if (this.state.gpsPermission) {
			let region = await this.getLocationAsync();
			if (region) {
				let camera = {
					center: {
						latitude: 45.4627124,
						longitude: 9.1076924,
					},
					pitch: 15,
					heading: 20,
					altitude: 10, // Only on iOS MapKit, in meters. The property is ignored by Google Maps.
					zoom: 20,
				};
				console.log('animateCamera: ' + JSON.stringify(camera));
				this.map.animateCamera(camera, { duration: 5000 });
			}
		}
	};

	render() {
		return (
			<View>
				<MapView
					style={{ alignSelf: 'stretch', height: 250, marginTop: 15 }}
					ref={(r) => {
						this.map = r;
					}}
					//  initialCamera={{
					//    center: {
					//      latitude: 11,
					//      longitude: 11,
					//    },
					//    pitch: 45,
					//    heading: 90,
					//    altitude: 1000,
					//    zoom: 10,
					//}}
					onRegionChangeComplete={this.onRegionChange}
					region={this.state.region}
					pitchEnabled={true}
					scrollEnabled={true}
					//cacheEnabled={true}
					zoomTapEnabled={false}
					zoomEnabled={true}
					rotateEnabled={false}
					minZoomLevel={1}
					maxZoomLevel={10}>
					{this.state.marker ? <MapView.Marker coordinate={this.state.marker} /> : null}
				</MapView>

				<View style={{ marginHorizontal: 40, marginVertical: 10 }}>
					<Button onPress={this.getGpsPosition} title="Gps position" />
				</View>
				<View style={{ marginHorizontal: 40, marginVertical: 10 }}>
					<Button onPress={this.animateToRegion} title="Animate to region" />
				</View>
				<View style={{ marginHorizontal: 40, marginVertical: 10 }}>
					<Button onPress={this.animateCamera} title="Animate camera" />
				</View>

				<TouchableOpacity
					onPress={() => this.getCamera()}
					style={[styles.bubble, styles.button]}>
					<Text>Get current camera</Text>
				</TouchableOpacity>

				<TouchableOpacity
					onPress={() => this.setCamera()}
					style={[styles.bubble, styles.button]}>
					<Text>Set Camera</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFillObject,
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	map: {
		...StyleSheet.absoluteFillObject,
	},
	bubble: {
		backgroundColor: 'rgba(255,255,255,0.7)',
		paddingHorizontal: 18,
		paddingVertical: 12,
		borderRadius: 20,
	},
	button: {
		marginTop: 12,
		paddingHorizontal: 12,
		alignItems: 'center',
		marginHorizontal: 10,
	},
	buttonContainer: {
		flexDirection: 'column',
		marginVertical: 20,
		backgroundColor: 'transparent',
	},
});
