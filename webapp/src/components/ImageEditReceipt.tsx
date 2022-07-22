import React, { ChangeEvent, useEffect, useState } from 'react';
import { dataR } from './ImageEditData';
import { Category } from '../types/Category';
import DropdownList from 'react-widgets/DropdownList';

interface IImageEditReceiptProps {
  data: dataR;
  editData: (values: dataR) => void;
}

export const ImageEditReceipt: React.FC<IImageEditReceiptProps> = ({
  data,
  editData,
}) => {
  const [store, setStore] = useState<string>(data.store);
  const [category, setCategory] = useState<Category>(data.category);
  const [total, setTotal] = useState<number>(data.total);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === 'store') {
      setStore(event.target.value);
    } else if (event.target.name === 'total') {
      setTotal(Number(event.target.value.replace(/[^0-9.]/g, '')));
    }
  };

  useEffect(() => {
    let newData: dataR = { store: store, category: category, total: total };
    editData(newData);
  }, [total, store, category]);

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
    </>
  );
};

export default ImageEditReceipt;
