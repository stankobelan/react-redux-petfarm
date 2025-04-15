import reducer, {
  addFarm,
  editFarm,
  removeFarm,
  initFarms,
  setCurrentFarm,
  FarmSliceState,
} from './farmSlice';
import { IFarm } from '../../share/interfaces/IFarm';

describe('farm reducer', () => {
  const initialState: FarmSliceState = {
    current: 0,
    farms: [],
    loading: false,
    error: null,
  };

  // Test sample data
  const sampleFarms: IFarm[] = [
    { id: 1, name: 'Green Hills Farm', address: '123 Country Road' },
    { id: 2, name: 'Sunny Valley Ranch', address: '456 Valley Drive' },
  ];

  it('should return the initial state', () => {
    expect(reducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  it('should handle adding a farm', () => {
    const newFarm = { id: 3, name: 'New Farm', address: '789 New Road' };
    const nextState = reducer(initialState, addFarm(newFarm));

    expect(nextState.farms.length).toBe(1);
    expect(nextState.farms[0]).toEqual(newFarm);
  });

  it('should handle initializing farms', () => {
    const nextState = reducer(initialState, initFarms(sampleFarms));

    expect(nextState.farms.length).toBe(2);
    expect(nextState.farms).toEqual(sampleFarms);
  });

  it('should handle editing a farm', () => {
    // First add farms to the state
    const stateWithFarms = reducer(initialState, initFarms(sampleFarms));

    // Then edit one farm
    const editedFarm = { ...sampleFarms[0], name: 'Updated Farm Name' };
    const nextState = reducer(stateWithFarms, editFarm(editedFarm));

    expect(nextState.farms[0].name).toBe('Updated Farm Name');
    expect(nextState.farms[1]).toEqual(sampleFarms[1]); // Other farm should remain unchanged
  });

  it('should handle removing a farm', () => {
    // First add farms to the state
    const stateWithFarms = reducer(initialState, initFarms(sampleFarms));

    // Then remove one farm
    const nextState = reducer(stateWithFarms, removeFarm(sampleFarms[0]));

    expect(nextState.farms.length).toBe(1);
    expect(nextState.farms[0]).toEqual(sampleFarms[1]);
  });

  it('should handle setting current farm', () => {
    const nextState = reducer(initialState, setCurrentFarm(5));

    expect(nextState.current).toBe(5);
  });
});
