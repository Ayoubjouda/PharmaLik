import { FC, useEffect, useRef, useState } from 'react';
import { Image, View, ViewProps } from 'react-native';
import {
  PROVIDER_GOOGLE,
  Marker,
  Polyline,
  Region,
  LatLng,
} from 'react-native-maps';

import MarkerIcon from 'assets/images/Marker.png';
import ModalSheet from './ModalSheet';
import BottomModal from './BottomModal';
import BottomSheet, { BottomSheetModal } from '@gorhom/bottom-sheet';
import MapView from 'react-native-map-clustering';
import * as Location from 'expo-location';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useAppStore from 'zustand/store';
type MapProps = ViewProps;
type Coords = {
  latitude: number | undefined;
  longitude: number | undefined;
};

const Map: FC<MapProps> = () => {
  const modalSheetRef = useRef<BottomSheet>(null);
  const bottomModalRef = useRef<BottomSheetModal>(null);

  const [currentUserLocation, setLocation] = useState<LatLng>({
    latitude: 33.540950942916,
    longitude: -7.674299924432601,
  });
  const _mapView = useRef<MapView | null>(null);
  const { pharmacies, setPharmacies, setSelectedPharmacy, coords, setCoords } =
    useAppStore();
  useQuery({
    queryKey: ['pharmacies'],
    queryFn: async () =>
      axios.get(
        'https://saydalia.ma/api/siteweb_api.php?origin=33.540950942916%2C-7.674299924432601&api_key=808RBAI77YIO2HZQ9WYSJKHK9WDEVVXXERFB77CALCU6U0'
      ),
    onSuccess: (res) => {
      setPharmacies(res.data as Pharmacy[]);
    },
  });

  useEffect(() => {
    (async () => {
      const location = await Location.getCurrentPositionAsync({});
      setLocation(location?.coords);
    })();
  }, []);
  const getDirections = async (startLoc: string, destinationLoc: string) => {
    try {
      const resp = await axios.get(`http://localhost:3000/pharmacy/direction`, {
        params: { start: startLoc, dest: destinationLoc },
      });

      return resp.data as Coords[];
    } catch (error) {
      return error;
    }
  };

  const handleGetDirections = (pharmacy: Pharmacy) => {
    if (!currentUserLocation) return;
    getDirections(
      `${currentUserLocation?.latitude},${currentUserLocation?.longitude}`,
      `${pharmacy.lat},${pharmacy.lng}`
    ).then((coords) => setCoords(coords as LatLng[]));

    setPharmacies([pharmacy]);
    if (!_mapView.current) return;

    _mapView.current?.animateToRegion(
      {
        latitude: pharmacy.lat,
        longitude: pharmacy.lng,
        latitudeDelta: 0.01,
        longitudeDelta: 0.02,
      },
      1000
    );
  };

  const INITIAL_REGION: Region = {
    ...currentUserLocation,
    latitudeDelta: 0.01,
    longitudeDelta: 0.02,
  };

  // if (isLoading || isError || !currentUserLocation || pharmacies.length < 0)
  //   return;

  return (
    <View className="flex-1">
      <MapView
        className="w-full h-full"
        ref={_mapView}
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_REGION}
        showsUserLocation={true}
        showsMyLocationButton={true}
        mapPadding={{ top: 0, right: 0, bottom: 170, left: 0 }}
        clusterColor="#fff"
        clusterTextColor="#0E9C6D"
      >
        {pharmacies.length > 0 &&
          pharmacies.map((pharmacy: Pharmacy) => (
            <Marker
              key={pharmacy.id}
              coordinate={{
                latitude: pharmacy.lat,
                longitude: pharmacy.lng,
              }}
              onPress={() => {
                modalSheetRef.current?.close();
                bottomModalRef.current?.present();
                setSelectedPharmacy(pharmacy);
                handleGetDirections(pharmacy);
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

        {coords.length > 0 && (
          <Polyline
            coordinates={coords}
            fillColor="#44C89C"
            strokeWidth={6}
          />
        )}
      </MapView>
      <ModalSheet ref={modalSheetRef} />
      <BottomModal ref={bottomModalRef} />
    </View>
  );
};

export default Map;
