import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../redux/data/store';
import { fetchFarms } from '../../redux/reducer/farmSlice';
import Farm from './item/farm';
import { API_ENDPOINTS } from '../../share/ApiUrl';
import axios from '../../axios-inst';
import { PetType, IPet } from '../../share/interfaces/IPet';
import { IFarmEx } from '../../share/interfaces/IFarmCalculation';
import { initPets, clearPets } from '../../redux/reducer/petsSlice';
import { initFarmCalc, clearCaclulation } from '../../redux/reducer/calcFarmSlice';
import { clearNewFarm } from '../../redux/reducer/createFarmSlice';
import cssFarm from './farm.module.scss';
import { Alert, Spinner } from 'react-bootstrap';
import Pagination from '../ui/pagination/Pagination';
import { usePagination } from '../../hooks/usePagination';

const FARMS_PER_PAGE = 6;

/**
 * Component that displays a list of farms with their associated pet statistics
 * Fetches data from APIs and calculates aggregated stats
 */
const ListOfFarms: React.FC = () => {
  const dispatch = useAppDispatch();

  // Get farms and calculation data from Redux store
  const {
    farms,
    loading: farmsLoading,
    error: farmsError,
  } = useAppSelector(state => ({
    farms: state.farms.farms,
    loading: state.farms.loading,
    error: state.farms.error,
  }));

  const calcFarms = useAppSelector(state => state.farmCalculation.calcFarms);
  const [extFarms, setExtFarms] = useState<IFarmEx[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Initial data fetching
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        dispatch(clearNewFarm());
        dispatch(clearPets());
        dispatch(clearCaclulation());

        // Fetch farms if not already loaded
        if (farms.length === 0) {
          dispatch(fetchFarms());
        }

        // Fetch cats
        const catsResponse = await axios.get<IPet[]>(API_ENDPOINTS.PETS.CATS);
        const cats = catsResponse.data.map((pet: IPet) => ({
          ...pet,
          type: PetType.CAT,
        }));

        dispatch(initPets(cats));
        dispatch(initFarmCalc(cats));

        // Fetch dogs
        const dogsResponse = await axios.get<IPet[]>(API_ENDPOINTS.PETS.DOGS);
        const dogs = dogsResponse.data.map((pet: IPet) => ({
          ...pet,
          type: PetType.DOG,
        }));

        dispatch(initPets(dogs));
        dispatch(initFarmCalc(dogs));
      } catch (err: any) {
        setError(err.message || 'Failed to fetch farms and pets data');
        console.error('Error fetching data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  // Calculate extended farm statistics when data changes
  useEffect(() => {
    if (calcFarms.length > 0 && farms.length > 0) {
      const extendedFarms = farms
        .map(farm => {
          const calculationData = calcFarms.find(calc => calc.Id === farm.id);
          return calculationData ? ({ ...farm, ...calculationData } as IFarmEx) : null;
        })
        .filter(Boolean) as IFarmEx[];

      setExtFarms(extendedFarms);
    }
  }, [calcFarms, farms]);

  // Render loading state while data is being fetched
  if (isLoading || farmsLoading) {
    return (
      <div className="d-flex justify-content-center my-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  // Render error message if something went wrong
  if (error || farmsError) {
    return (
      <Alert variant="danger">
        <Alert.Heading>Error loading farms</Alert.Heading>
        <p>{error || farmsError}</p>
      </Alert>
    );
  }

  // Render empty state if no farms
  if (extFarms.length === 0) {
    return (
      <Alert variant="info">
        <p>No farms found. Create a new farm to get started!</p>
      </Alert>
    );
  }

  // Pagination logic
  const {
    currentPage,
    totalPages,
    pageNumbers,
    setPage,
    hasPreviousPage,
    hasNextPage,
    firstItemIndex,
    lastItemIndex,
  } = usePagination({
    totalItems: extFarms.length,
    itemsPerPage: FARMS_PER_PAGE,
  });
  const farmsToShow = extFarms.slice(firstItemIndex, lastItemIndex + 1);

  // Render the list of farms with their statistics and pagination
  return (
    <div className={cssFarm.container}>
      {farmsToShow.map(farm => (
        <Farm
          key={farm.id}
          id={farm.id}
          name={farm.name}
          address={farm.address}
          averageDogsAge={
            farm.CountOfDogs > 0 ? (farm.SumOfDogsAge / farm.CountOfDogs).toFixed(2) : 'N/A'
          }
          averageCatsAge={
            farm.CountOfCats > 0 ? (farm.SumOfCatsAge / farm.CountOfCats).toFixed(2) : 'N/A'
          }
          sumOfCats={farm.CountOfCats}
          sumOfDogs={farm.CountOfDogs}
        />
      ))}
      <div className="d-flex justify-content-center mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageNumbers={pageNumbers}
          onPageChange={setPage}
          hasPreviousPage={hasPreviousPage}
          hasNextPage={hasNextPage}
        />
      </div>
    </div>
  );
};

export default React.memo(ListOfFarms);
