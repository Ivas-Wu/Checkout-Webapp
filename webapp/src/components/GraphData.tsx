import { GraphReq } from './Graphs';
import { Category } from './Table';

interface dataReq {
  date: Date;
  Groceries?: number;
  Entertainment?: number;
  Medical?: number;
  Transportation?: number;
  Housing?: number;
  Utilities?: number;
  Other?: number;
}
export function dataGenBar(data: GraphReq[]): dataReq[] {
  const newData: dataReq[] = [];
  data.forEach(function (value) {
    let index = newData.findIndex((element) => element.date === value.date);
    if (index !== -1) {
      if (value.category === Category.GROCERIES) {
        newData[index].Groceries =
          newData[index].Groceries! + Number(value.amt);
      } else if (value.category === Category.ENTERTAINMENT) {
        newData[index].Entertainment =
          newData[index].Entertainment! + Number(value.amt);
      } else if (value.category === Category.MEDICAL) {
        newData[index].Medical = newData[index].Medical! + Number(value.amt);
      } else if (value.category === Category.TRANSPORTATION) {
        newData[index].Transportation =
          newData[index].Transportation! + Number(value.amt);
      } else if (value.category === Category.HOUSING) {
        newData[index].Housing = newData[index].Housing! + Number(value.amt);
      } else if (value.category === Category.UTILITIES) {
        newData[index].Utilities =
          newData[index].Utilities! + Number(value.amt);
      } else {
        newData[index].Other = newData[index].Other! + Number(value.amt);
      }
    } else {
      if (value.category === Category.GROCERIES) {
        newData.push({ date: value.date, Groceries: value.amt });
      } else if (value.category === Category.ENTERTAINMENT) {
        newData.push({ date: value.date, Entertainment: value.amt });
      } else if (value.category === Category.MEDICAL) {
        newData.push({ date: value.date, Medical: value.amt });
      } else if (value.category === Category.TRANSPORTATION) {
        newData.push({ date: value.date, Transportation: value.amt });
      } else if (value.category === Category.HOUSING) {
        newData.push({ date: value.date, Housing: value.amt });
      } else if (value.category === Category.UTILITIES) {
        newData.push({ date: value.date, Utilities: value.amt });
      } else {
        newData.push({ date: value.date, Other: value.amt });
      }
    }
  });
  return newData;
}
