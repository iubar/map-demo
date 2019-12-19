import React from 'react';
import { View, Text, Button } from 'react-native';
import MapView from 'react-native-maps';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

export default class MapExample extends React.Component {

    state = {
        region: { latitude: 90, longitude: 0, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
        marker: null,
        gpsPermission: false
    };

    constructor(props) {
        super(props);
        this.initStateGpsPermission();
    }

    async initStateGpsPermission() {
        let response = await Permissions.getAsync(Permissions.LOCATION);
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
        }

        if (this.state.gpsPermission){
            let region = await this.getLocationAsync();
            if (region) {
                this.setState({
                    region: region,
                    marker: { latitude: region.latitude, longitude: region.longitude }
                });
            }
        }
    }

    checkGpsPermission = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);    
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
            }
        }

        if (this.state.gpsPermission){
            let region = await this.getLocationAsync();
            if (region) {
                console.log('animateToRegion: ' + JSON.stringify(region));
                this.map.animateToRegion(region, 5000);
            }
        }
    };

    animateCamera = async () => {
        console.log('animateCamera...');
        if (!this.state.gpsPermission) {
            let gpsStatus = await this.checkGpsPermission();
            if (gpsStatus === 'granted') {
                this.state.gpsPermission = true;
            }
        }

        if (this.state.gpsPermission){
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
                   zoom: 20
                };
                console.log('animateCamera: ' + JSON.stringify(camera));
                this.map.animateCamera(camera, 5000);
            }
        }
    };

    render() {
        return (
            <View>
                <MapView
                    style={{ alignSelf: 'stretch', height: 150, marginTop: 15 }}
                    ref={r => {
                        this.map = r;
                      }}
                    onRegionChangeComplete={this.onRegionChange}
                    region={this.state.region}
                    pitchEnabled={true}
                    scrollEnabled={true}
                    cacheEnabled={true}
                    zoomTapEnabled={false}
                    zoomEnabled={false}
                    rotateEnabled={false}
                    minZoomLevel={ 1 }
                    maxZoomLevel={ 10 }>
                    {this.state.marker ? (
                        <MapView.Marker coordinate={this.state.marker}/>
                    ) : null}
                </MapView>
                <View style={{marginHorizontal:40, marginVertical: 10}}>
                    <Button onPress={this.getGpsPosition} title="Gps position" />
                </View>
                <View style={{marginHorizontal:40, marginVertical: 10}}>
                    <Button onPress={this.animateToRegion} title="Animate to region" />
                </View>
                <View style={{marginHorizontal:40, marginVertical: 10}}>
                    <Button onPress={this.animateCamera} title="Animate camera" />
                </View>
            </View>
        );
    }

}