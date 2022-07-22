import React, { ChangeEvent, useEffect, useState } from 'react';
import { dataI } from './ImageEditData';
import { Category } from '../types/Category';
import DropdownList from 'react-widgets/DropdownList';

interface IImageEditReceiptProps {
  data: dataI;
  editData: (values: dataI) => void;
  rerender: boolean;
}

export const ImageEditReceipt: React.FC<IImageEditReceiptProps> = ({
  data,
  editData,
  rerender,
}) => {
  const [name, setName] = useState<string>(data.productName);
  const [category, setCategory] = useState<Category>(data.category);
  const [price, setPrice] = useState<number>(data.price);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === 'name') {
      setName(event.target.value);
    } else if (event.target.name === 'price') {
      setPrice(Number(event.target.value.replace(/\D/g, '')));
    }
  };

  useEffect(() => {
    let newData: dataI = {
      productName: name,
      category: category,
      price: price,
    };
    editData(newData);
  }, [name, price, category]);

  useEffect(() => {
    console.log(data);
    setName(data.productName);
    setCategory(data.category);
    setPrice(data.price);
  }, [rerender]);

  return (
    <>
      <input
        type="text"
        placeholder="New Product Name..."
        name="name"
        value={name}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="New Total..."
        name="price"
        value={price}
        onChange={handleChange}
      />
      <DropdownList
        data={Object.values(Category).filter(
          (value) => typeof value === 'string'
        )}
        value={category}
        onChange={(nextValue) => {
          setCategory(nextValue);
        }}
      />
    </>
  );
};

export default ImageEditReceipt;
