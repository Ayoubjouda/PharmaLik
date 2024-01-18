import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { LatLng } from 'react-native-maps';
import useAppStore from 'services/zustand/store';

const getPharmacies = async (useLocation: LatLng) => {
  const response = await axios.get(
    `https://saydalia.ma/api/siteweb_api.php?origin=${useLocation?.latitude}%2C${useLocation?.longitude}&api_key=808RBAI77YIO2HZQ9WYSJKHK9WDEVVXXERFB77CALCU6U0`
  );
  return response.data;
};

export const useGetPharmacies = (userLocation: LatLng) => {
  const { pharmacies, setPharmacies } = useAppStore();

  const { data, isLoading, isError } = useQuery<Pharmacy[], Error>(
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
  return { data, isLoading, isError };
};

export const useSelectedPharmacies = () => {
  const { setPharmacies, pharmacies } = useAppStore();
  const getSelectedPharmacies = async (userLocation: LatLng) => {
    try {
      const resp = await getPharmacies(userLocation);
      setPharmacies([
        ...pharmacies,
        ...(resp?.filter(
          (item: Pharmacy) => item.id !== pharmacies[0]?.id
        ) as Pharmacy[]),
      ]);
    } catch (error) {
      return error;
    }
  };
  return {
    getSelectedPharmacies,
  };
};
