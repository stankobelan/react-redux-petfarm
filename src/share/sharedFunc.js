/*  https://gist.github.com/JamieMason/0566f8412af9fe6a1d470aa1e089a752
 */
import { PetType } from './interfaces/IPet';
import { toAge } from './SharedServiceFunc';

export const groupBy = key => array =>
  array.reduce((objectsByKeyValue, obj) => {
    const value = obj[key];
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
    return objectsByKeyValue;
  }, {});

export const arrIsNotEmtyOrUndefined = checkedArray => {
  return typeof checkedArray !== 'undefined' && checkedArray.length > 0;
};

export const getCalculationFarm = (groupedArray, propertiesArray) => {
  let ResultArr = [];
  for (let index = 0; index < propertiesArray.length; index++) {
    let element = propertiesArray[index];
    let ownerGroup = groupedArray[element];

    let filteredCAts = ownerGroup.filter(x => x.type === PetType.CAT);
    let filteredDogs = ownerGroup.filter(x => x.type === PetType.DOG);
    let CatAgeArr =
      arrIsNotEmtyOrUndefined(filteredCAts) === true
        ? filteredCAts.map(x => toAge(x.datumNarodenia))
        : undefined;
    let DogAgeArr =
      arrIsNotEmtyOrUndefined(filteredDogs) === true
        ? filteredDogs.map(x => toAge(x.datumNarodenia))
        : undefined;

    let item = {
      Id: +element,
      CountOfCats: ownerGroup?.filter(x => x.type === PetType.CAT).length,
      CountOfDogs: ownerGroup?.filter(x => x.type === PetType.DOG).length,
      SumOfCatsAge:
        arrIsNotEmtyOrUndefined(CatAgeArr) === true
          ? CatAgeArr.reduce((sum, record) => sum + record)
          : 0,
      SumOfDogsAge:
        arrIsNotEmtyOrUndefined(DogAgeArr) === true
          ? DogAgeArr.reduce((sum, record) => sum + record)
          : 0,
    };
    ResultArr.push(item);
  }
  return ResultArr;
};
