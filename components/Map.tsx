import { FC, useEffect, useRef, useState } from 'react';
import { Image, View, ViewProps } from 'react-native';
import { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import MarkerIcon from 'assets/images/Marker.png';
import ModalSheet from './ModalSheet';
import BottomModal from './BottomModal';
import BottomSheet, { BottomSheetModal } from '@gorhom/bottom-sheet';
import MapView from 'react-native-map-clustering';
import { decode } from '@mapbox/polyline';
import * as Location from 'expo-location';
type MapProps = ViewProps;
type Coords = {
  latitude: number | undefined;
  longitude: number | undefined;
};
const Map: FC<MapProps> = () => {
  const modalSheetRef = useRef<BottomSheet>(null);
  const bottomModalRef = useRef<BottomSheetModal>(null);
  const [coords, setCoords] = useState<Coords[]>([]);
  const [location, setLocation] = useState<Coords | null>(null);
  useEffect(() => {
    (async () => {
      const location = await Location.getCurrentPositionAsync({});
      setLocation(location?.coords);
    })();
  }, []);
  const getDirections = async (startLoc: string, destinationLoc: string) => {
    try {
      const KEY = 'AIzaSyBhDk0Kew6HfA0Aj_iPmpz96OVtZr02IIk'; //put your API key here.
      //otherwise, you'll have an 'unauthorized' error.
      const resp = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=${KEY}`
      );
      if (!resp.ok) {
        throw new Error('Something went wrong');
      }
      const respJson = await resp.json();
      const points = decode(respJson.routes[0].overview_polyline.points);
      const coords: Coords[] = points.map((point: number[]) => {
        return {
          latitude: point[0],
          longitude: point[1],
        };
      });
      return coords as Coords[];
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    //fetch the coordinates and then store its value into the coords Hook.
    if (!location) return;
    getDirections(
      `${location?.latitude},${location?.longitude}`,
      '33.531255,-7.67448'
    )
      .then((coords) => setCoords(coords))
      .catch((err) => console.log('Something went wrong'));
  }, [location]);

  const INITIAL_REGION = {
    latitude: 33.541255,
    longitude: -7.67448,
    latitudeDelta: 8.5,
    longitudeDelta: 8.5,
  };

  return (
    <View className="flex-1">
      <MapView
        className="w-full h-full"
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_REGION}
        showsUserLocation={true}
        showsMyLocationButton={true}
        mapPadding={{ top: 0, right: 0, bottom: 170, left: 0 }}
        clusterColor="#fff"
        clusterTextColor="#0E9C6D"
      >
        {new Array(40).fill(0).map((x, i) => (
          <Marker
            key={i}
            coordinate={{
              latitude: 33.541255 + (Math.random() - 0.5) * 0.25,
              longitude: -7.67448 + (Math.random() - 0.5) * 0.13,
            }}
            onPress={() => {
              modalSheetRef.current?.close();
              bottomModalRef.current?.present();
            }}
          >
            <Image
              source={MarkerIcon}
              style={{
                width: 30,
                height: 30,
              }}
            />
          </Marker>
        ))}
        <Marker
          coordinate={{
            latitude: 33.531255,
            longitude: -7.67448,
          }}
          onPress={() => {
            modalSheetRef.current?.close();
            bottomModalRef.current?.present();
          }}
        >
          <Image
            source={MarkerIcon}
            style={{
              width: 30,
              height: 30,
            }}
          />
        </Marker>
        <Polyline
          coordinates={coords}
          fillColor="#44C89C"
          strokeWidth={6}
        />
      </MapView>
      <ModalSheet ref={modalSheetRef} />
      <BottomModal ref={bottomModalRef} />
    </View>
  );
};

export default Map;
