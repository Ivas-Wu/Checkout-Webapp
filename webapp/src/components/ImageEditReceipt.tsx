import React, { ChangeEvent, useEffect, useState } from 'react';
import { dataR } from './ImageEditData';
import { Category, convertCategory } from '../types/Category';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

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
      setTotal(Math.round(Number(event.target.value) * 100) / 100);
    }
  };

  useEffect(() => {
    let newData: dataR = { store: store, category: category, total: total };
    editData(newData);
  }, [total, store, category]);

  return (
    <>
      <TextField
        required
        id="Store"
        label="Required"
        defaultValue="New Store..."
        variant="standard"
        name="store"
        value={store}
        onChange={handleChange}
        helperText="Please enter a store name"
        style = {{position:'relative'}}
      />
      <TextField
        id="standard-number"
        label="Total"
        type="number"
        placeholder="New Total..."
        InputLabelProps={{
          shrink: true,
        }}
        name="total"
        value={total}
        onChange={handleChange}
        helperText="Please enter a total amount"
      />
      <TextField
          id="select-category"
          select
          label="Select"
          defaultValue={category}
          helperText="Please choose a category"
        >
          {Object.values(Category).map((option) => (
            <MenuItem 
            key={option} 
            value={option}
            onClick={(nextValue) => {
              setCategory(nextValue.currentTarget.dataset.value ? convertCategory(nextValue.currentTarget.dataset.value) : Category.OTHER);
            }}>
              {option}
            </MenuItem>
          ))}
      </TextField>
    </>
  );
};

export default ImageEditReceipt;
