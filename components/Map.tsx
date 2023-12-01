import { FC, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  LayoutAnimation,
  View,
  ViewProps,
} from 'react-native';
import {
  LatLng,
  Marker,
  PROVIDER_GOOGLE,
  Polyline,
  Region,
} from 'react-native-maps';

import BottomSheet, { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import MarkerIcon from 'assets/images/Marker.png';
import axios from 'axios';
import * as Location from 'expo-location';
import MapView from 'react-native-map-clustering';
import useAppStore from 'services/zustand/store';
import BottomModal from './BottomModal';
import ModalSheet from './ModalSheet';
type MapProps = ViewProps;
type Coords = {
  latitude: number | undefined;
  longitude: number | undefined;
};

const Map: FC<MapProps> = () => {
  const modalSheetRef = useRef<BottomSheet>(null);
  const bottomModalRef = useRef<BottomSheetModal>(null);
  const queryClient = useQueryClient();
  const [currentUserLocation, setLocation] = useState<LatLng>();
  const _mapView = useRef<MapView | null>(null);
  const {
    pharmacies,
    setPharmacies,
    setSelectedPharmacy,
    coords,
    setCoords,
    isTripStarted,
    selectedPharmacy,
  } = useAppStore();

  const getPharmacies = async (useLocation: LatLng) => {
    try {
      const response = await axios.get(
        `https://saydalia.ma/api/siteweb_api.php?origin=${useLocation?.latitude}%2C${useLocation?.longitude}&api_key=808RBAI77YIO2HZQ9WYSJKHK9WDEVVXXERFB77CALCU6U0`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getPharmacie = async (userLocation: LatLng) => {
    return useQuery<Pharmacy[], Error>(
      ['pharmacies', userLocation],
      () => getPharmacies(userLocation),
      {
        onSuccess: (res) => {
          if (!res) return;
          setPharmacies([
            ...pharmacies,
            ...(res?.filter(
              (item: Pharmacy) => item.id !== pharmacies[0]?.id
            ) as Pharmacy[]),
          ]);
        },
      }
    );
  };
  getPharmacie(currentUserLocation as LatLng);
  useEffect(() => {
    if (!currentUserLocation) return;
    queryClient.invalidateQueries(['pharmacies']);
  }, [currentUserLocation]);

  useEffect(() => {
    let intervalId = null;

    // Function to make the request
    const startTracking = () => {
      // Check if the condition is still true
      if (isTripStarted && selectedPharmacy) {
        if (!currentUserLocation) return;
        getDirections(
          `${currentUserLocation?.longitude},${currentUserLocation?.latitude}`,
          `${selectedPharmacy.lng},${selectedPharmacy.lat}`
        ).then((coords) => setCoords(coords as LatLng[]));
        console.log('tracking');
      } else {
        // If the condition becomes false, clear the interval
        clearInterval(intervalId);
      }
    };

    // Set up the interval to make the request every second
    intervalId = setInterval(startTracking, 1000);

    // Clean up the interval when the component unmounts or when the condition changes
    return () => {
      clearInterval(intervalId);
    };
  }, [isTripStarted]);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
        distanceInterval: 10000,
        timeInterval: 5000,
      });
      setLocation(location.coords);
    })();
  }, []);

  const getDirections = async (startLoc: string, destinationLoc: string) => {
    try {
      const resp = await axios.get(
        `http://141.145.200.78:8001/pharmacy/direction`,
        {
          params: { start: startLoc, dest: destinationLoc },
        }
      );

      return resp.data as Coords[];
    } catch (error) {
      return error;
    }
  };
  const handleGetDirections = (pharmacy: Pharmacy) => {
    if (!currentUserLocation) return;
    getDirections(
      `${currentUserLocation?.longitude},${currentUserLocation?.latitude}`,
      `${pharmacy.lng},${pharmacy.lat}`
    ).then((coords) => setCoords(coords as LatLng[]));

    setPharmacies([pharmacy]);
    if (!_mapView.current) return;

    // @ts-expect-error problem with the types of MapView

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
  if (!currentUserLocation)
    return (
      <View className="items-center justify-center flex-1">
        <ActivityIndicator />
      </View>
    );
  const INITIAL_REGION: Region = {
    ...currentUserLocation,
    latitudeDelta: 0.01,
    longitudeDelta: 0.02,
  };

  return (
    <View className="flex-1">
      <MapView
        className="w-full h-full"
        ref={_mapView}
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_REGION}
        layoutAnimationConf={LayoutAnimation.Presets.easeInEaseOut}
        clusteringEnabled={true}
        animationEnabled={false}
        showsUserLocation={true}
        showsMyLocationButton={true}
        mapPadding={{ top: 0, right: 0, bottom: 170, left: 0 }}
        clusterColor="#fff"
        clusterTextColor="#0E9C6D"
      >
        {pharmacies.length > 0
          ? pharmacies.map((pharmacy: Pharmacy) => (
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
            ))
          : null}

        {coords.length > 0 && (
          <Polyline
            coordinates={coords}
            fillColor="#44C89C"
            strokeWidth={6}
          />
        )}
      </MapView>
      <ModalSheet ref={modalSheetRef} />
      <BottomModal
        ref={bottomModalRef}
        handleOpenModalSheet={() => modalSheetRef.current?.snapToIndex(0)}
      />
    </View>
  );
};

export default Map;
