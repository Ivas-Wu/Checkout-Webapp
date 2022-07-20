import React, { ChangeEvent, useState } from 'react';
import { ReceiptUpdateReq } from '../types/Receipt';
import DropdownList from 'react-widgets/DropdownList';
import 'react-widgets/styles.css';
import { Category } from '../types/Category';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { TableReqs } from './Table'

interface ITableModifyProps {
  receiptUpdateInfo: (data: ReceiptUpdateReq) => void;
  data?: TableReqs;
}

export const TableModify: React.FC<ITableModifyProps> = ({
  receiptUpdateInfo, data
}: ITableModifyProps) => {
  const [userId, setUserId] = useState<number | undefined>(undefined);
  const [store, setStore] = useState<string | undefined>(data?.store);
  const [total, setTotal] = useState<number | undefined>(data?.tAmount);
  const [category, setCategory] = useState<Category | undefined>(data?.category);
  const [date, setDate] = useState<Date | undefined>(new Date(data?.date!));

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === 'useId') {
      setUserId(Number(event.target.value.replace(/\D/g, '')));
    } else if (event.target.name === 'store') {
      setStore(event.target.value);
    } else if (event.target.name === 'total') {
      setTotal(Number(event.target.value.replace(/\D/g, '')));
    }
  };

  const selectDateHandler = (d: Date) => {
    setDate(d);
  };

  const onSubmit = () => {
    let dataReturn: ReceiptUpdateReq = {
      userId: userId, //Not supported yet
      store: store,
      total: total,
      category: category,
      date: date,
    };
    receiptUpdateInfo(dataReturn);
  };

  return (
    <>
      <input
        type="text"
        placeholder="New Store..."
        name="store"
        value={store}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="New Total..."
        name="total"
        value={total}
        onChange={handleChange}
      />
      <DropdownList
        defaultValue={category}
        data={Object.values(Category).filter(
          (value) => typeof value === 'string'
        )}
        onChange={(nextValue) => {
          setCategory(nextValue);
        }}
      />
      <DatePicker
        dateFormat="yyyy/MM/dd"
        selected={date}
        onChange={selectDateHandler}
        todayButton={'Today'}
      />
      <button onClick={onSubmit}>Modify</button>
    </>
  );
};

export default TableModify;
