import React from 'react';
import { Marker } from 'react-native-maps';
import MapView from 'react-native-map-clustering';

// https://github.com/venits/react-native-map-clustering
// https://medium.com/@begehr/cluster-react-native-maps-markers-with-react-native-map-clustering-72f50db26891
// https://blog.bam.tech/developer-news/four-tips-optimize-react-native-map-performance-user-experience

const INITIAL_REGION = {
	latitude: 52.5,
	longitude: 19.2,
	latitudeDelta: 8.5,
	longitudeDelta: 8.5,
};

export default class Map3Screen extends React.Component {
	render() {
		return (
			<MapView initialRegion={INITIAL_REGION} style={{ flex: 1 }}>
				<Marker coordinate={{ latitude: 52.4, longitude: 18.7 }} />
				<Marker coordinate={{ latitude: 52.1, longitude: 18.4 }} />
				<Marker coordinate={{ latitude: 52.6, longitude: 18.3 }} />
				<Marker coordinate={{ latitude: 51.6, longitude: 18.0 }} />
				<Marker coordinate={{ latitude: 53.1, longitude: 18.8 }} />
				<Marker coordinate={{ latitude: 52.9, longitude: 19.4 }} />
				<Marker coordinate={{ latitude: 52.2, longitude: 21 }} />
				<Marker coordinate={{ latitude: 52.4, longitude: 21 }} />
				<Marker coordinate={{ latitude: 51.8, longitude: 20 }} />
			</MapView>
		);
	}
}
