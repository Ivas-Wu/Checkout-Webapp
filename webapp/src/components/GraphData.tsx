import { GraphReq } from './Graphs';
import { Category } from '../types/Category';

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
  // Only uses recipt totals rn, should be updated for items
  const newData: dataReq[] = [];
  data.forEach(function (value) {
    let index = newData.findIndex((element) => element.date === value.date);
    if (index === -1) {
      newData.push({
        date: value.date,
        Groceries: 0,
        Entertainment: 0,
        Medical: 0,
        Transportation: 0,
        Housing: 0,
        Utilities: 0,
        Other: 0,
      });
      index = newData.length - 1;
    }
    if (value.category === Category.GROCERIES) {
      newData[index].Groceries =
        Number(newData[index].Groceries!) + Number(value.amt);
    } else if (value.category === Category.ENTERTAINMENT) {
      newData[index].Entertainment =
        Number(newData[index].Entertainment!) + Number(value.amt);
    } else if (value.category === Category.MEDICAL) {
      newData[index].Medical =
        Number(newData[index].Medical!) + Number(value.amt);
    } else if (value.category === Category.TRANSPORTATION) {
      newData[index].Transportation =
        Number(newData[index].Transportation!) + Number(value.amt);
    } else if (value.category === Category.HOUSING) {
      newData[index].Housing =
        Number(newData[index].Housing!) + Number(value.amt);
    } else if (value.category === Category.UTILITIES) {
      newData[index].Utilities =
        Number(newData[index].Utilities!) + Number(value.amt);
    } else {
      newData[index].Other = Number(newData[index].Other!) + Number(value.amt);
    }
  });
  console.log(newData);
  return newData;
}
