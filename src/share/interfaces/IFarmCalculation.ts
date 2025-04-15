import { IFarm } from './IFarm';

export interface IFarmCalculation {
  Id: number;
  SumOfCatsAge: number;
  SumOfDogsAge: number;
  CountOfDogs: number;
  CountOfCats: number;
}

export interface IFarmEx extends IFarmCalculation, IFarm {}
