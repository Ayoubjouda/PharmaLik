import { FC, useEffect, useRef } from 'react';
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
import MarkerIcon from 'assets/images/Marker.png';
import { useDirection } from 'hooks/useDirections';
import { useLocation } from 'hooks/useLocation';
import { useGetPharmacies } from 'hooks/usePharmacie';
import MapView from 'react-native-map-clustering';
import useAppStore from 'services/zustand/store';
import BottomModal from './BottomModal';
import ModalSheet from './ModalSheet';
import useMapNavigation from 'hooks/useMapNavigation';
type MapProps = ViewProps;

const Map: FC<MapProps> = () => {
  const modalSheetRef = useRef<BottomSheet>(null);
  const bottomModalRef = useRef<BottomSheetModal>(null);
  const { getDirections } = useDirection();
  const _mapView = useRef<MapView | null>(null);
  const {
    pharmacies,
    setPharmacies,
    setSelectedPharmacy,
    coords,
    currentUserLocation,
    selectedAdress,
  } = useAppStore();

  const { data } = useGetPharmacies(currentUserLocation as LatLng);
  const { getLocationAsync } = useLocation();

  useEffect(() => {
    (async () => {
      await getLocationAsync();
    })();
  }, []);

  useEffect(() => {
    if (!_mapView.current) return;

    // @ts-expect-error problem with the types of MapView

    _mapView.current?.animateToRegion(
      {
        latitude: selectedAdress.latitude,
        longitude: selectedAdress.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.02,
      },
      300
    );
  }, [selectedAdress]);

  useMapNavigation();

  const handleGetDirections = (pharmacy: Pharmacy) => {
    if (!currentUserLocation || !pharmacy) return;
    getDirections(currentUserLocation, pharmacy);
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
  if (!currentUserLocation || !data)
    return (
      <View className="items-center justify-center flex-1 bg-white">
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
        {!!pharmacies.length &&
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

        {coords?.length > 0 ? (
          <Polyline
            coordinates={coords}
            fillColor="#44C89C"
            strokeWidth={6}
          />
        ) : null}
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
