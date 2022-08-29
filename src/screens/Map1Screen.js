import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import MyCustomMarkerView from '../components/MyCustomMarkerView';
import MyCustomCalloutView from '../components/MyCustomCalloutView';

export default class Map1Screen extends React.Component {
	state = {
		currentRegion: {},
		mapRegion: {
			// type Region
			latitude: 37.78825,
			longitude: -122.4324,
			latitudeDelta: 0.0922,
			longitudeDelta: 0.0421,
		},
		x: 0,
		markerList: [
			{
				latlng: { latitude: 37.77825, longitude: -122.4224 },
				title: 'Title 1',
				description: 'Description 1',
			},
			{
				latlng: { latitude: 37.78825, longitude: -122.4324 },
				title: 'Title 2',
				description: 'Description 2',
			},
			{
				latlng: { latitude: 37.79825, longitude: -122.4424 },
				title: 'Title 3',
				description: 'Description 3',
			},
		],
	};

	/*
camera = { // type Camera
    center: {
      latitude: 0,
      longitude: 0,
  },
  pitch: 0,
  heading: 0,
  // Only on iOS MapKit, in meters. The property is ignored by Google Maps.
  altitude: 0,
  // Only when using Google Maps.
  zoom: 0
}

location = { // type Location
  latitude: 0,
  longitude: 0,
  altitude: 0,
  timestamp: 0, //Milliseconds since Unix epoch
  accuracy: 0,
  altitudeAccuracy: 0,
  speed: 0,
}

latLng = { // type LatLng
  latitude: 0,
  longitude: 0,
}
*/

	constructor(props) {
		super(props);
		this.state.currentRegion = this.initialRegion;
	}

	initialRegion = {
		// type Region
		latitude: 37.78825,
		longitude: -122.4324,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421,
	};

	goToRegion = () => {
		if (this.map) {
			let cameraObj = {
				center: {
					latitude: 37.71825,
					longitude: -122.4224,
				},
				zoom: 15,
			};
			this.map.animateCamera(cameraObj, 5000);
		}
	};

	onMapReady = (mapRegion) => {
		console.log('onMapReady...');
	};
	onKmlReady = (mapRegion) => {
		console.log('onKmlReady...');
	};
	onRegionChange = (mapRegion) => {
		// let data = JSON.stringify(this.map.props.camera);
		let data = JSON.stringify(mapRegion);
		console.log('onRegionChange...' + data);
		let d1 = 0; //Math.abs(this.state.currentRegion.latitude - mapRegion.latitude);
		let d2 = 0; // Math.abs(this.state.currentRegion.longitude - mapRegion.longitude);
		console.log('onRegionChange...' + d1 + ' ' + d2);
		let threshold = 0.003;
		if (d1 > threshold || d2 > threshold) {
			// console.log('update the state');
			let currentRegion = {
				latitude: mapRegion.latitude.toFixed(10),
				latitudeDelta: mapRegion.latitudeDelta,
				longitude: mapRegion.longitude.toFixed(10),
				longitudeDelta: mapRegion.longitudeDelta,
			};
			this.setState({ currentRegion: currentRegion });
		} else {
			//console.log('skip re-rendering the map');
		}
	};
	onRegionChangeComplete = (mapRegion) => {
		console.log('onRegionChangeComplete...');
	};
	onUserLocationChange = (mapRegion) => {
		console.log('onUserLocationChange...');
	};
	onMarkerPress = (mapRegion) => {
		console.log('onMarkerPress...');
	};
	onMarkerSelect = (mapRegion) => {
		console.log('onMarkerSelect...');
	};
	onMarkerDeselect = (mapRegion) => {
		console.log('onMarkerDeselect...');
	};
	onCalloutPress = (mapRegion) => {
		console.log('onCalloutPress...');
	};
	onCalloutPress2 = (mapRegion) => {
		console.log('onCalloutPress2...');
		this.goToRegion();
	};

	render() {
		return (
			<View style={{ flex: 1 }}>
				{this.renderMapView()}
				<View
					style={{
						backgroundColor: 'black',
						height: 100,
						justifyContent: 'center',
						alignItems: 'center',
					}}>
					<Text style={{ color: 'white' }}>Hello !</Text>
				</View>
			</View>
		);
	}

	renderMapView() {
		return (
			<View style={styles.container}>
				<MapView
					ref={(map) => {
						this.map = map;
					}}
					style={styles.mapStyle}
					initialRegion={this.initialRegion}
					showsTraffic={false}
					onMapReady={this.onMapReady}
					onKmlReady={this.onKmlReady}
					onRegionChange={this.onRegionChange}
					onRegionChangeComplete={this.onRegionChangeComplete}
					onUserLocationChange={this.onUserLocationChange}
					onMarkerPress={this.onMarkerPress}
					onMarkerSelect={this.onMarkerSelect}
					onMarkerDeselect={this.onMarkerDeselect}
					onCalloutPress={this.onCalloutPress}
					showsUserLocation={true}
					followsUserLocation={true}>
					{this.state.markerList.map((marker, index) => (
						<Marker
							draggable
							id={index.toString()}
							key={index}
							coordinate={marker.latlng}
							title={marker.title}
							description={marker.description}
							onDragEnd={(e) => this.setState({ x: e.nativeEvent.coordinate })}>
							{/* <MyCustomMarkerView {...marker} /> */}
							<Callout key={index} onPress={this.onCalloutPress2}>
								<MyCustomCalloutView {...marker} />
							</Callout>
						</Marker>
					))}
				</MapView>
				{this.renderOverlay()}
			</View>
		);
	}

	renderOverlay() {
		return (
			<TouchableOpacity style={styles.overlay}>
				<Text>{'Lat: ' + this.state.currentRegion.latitude}</Text>
				<Text>{'Lon: ' + this.state.currentRegion.longitude}</Text>
			</TouchableOpacity>
		);
	}
} // end class

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	mapStyle: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height,
	},
	overlay: {
		position: 'absolute',
		bottom: 50,
		backgroundColor: '#fff',
		opacity: 0.5,
		justifyContent: 'center',
		alignItems: 'center',

		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 10,
		paddingRight: 10,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: '#fff',
	},
});
