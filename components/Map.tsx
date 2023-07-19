import { FC } from 'react';
import { Image, View, ViewProps } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import MarkerIcon from 'assets/images/Marker.png';

type MapProps = ViewProps;

const Map: FC<MapProps> = () => {
  return (
    <View className="flex-1">
      <MapView
        className="w-full h-full"
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        showsMyLocationButton={true}
        mapPadding={{ top: 0, right: 0, bottom: 170, left: 0 }}
      >
        <Marker
          coordinate={{
            longitude: -7.67448,
            latitude: 33.541255,
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
      </MapView>
    </View>
  );
};

export default Map;
