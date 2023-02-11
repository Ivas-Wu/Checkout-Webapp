import React, { ChangeEvent, useEffect, useState } from 'react';
import { dataI } from './ImageEditData';
import { Category, convertCategory } from '../types/Category';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

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
      setPrice(Number(event.target.value.replace(/[^0-9.]/g, '')));
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
      <TextField
        required
        id="Product"
        label="Required"
        defaultValue="New Product Name..."
        variant="standard"
        name="name"
        value={name}
        onChange={handleChange}
        helperText="Please enter a product name"
        style = {{position:'relative'}}
      />
      <TextField
        id="Product"
        label="Total"
        type="number"
        defaultValue="New Total..."
        InputLabelProps={{
          shrink: true,
        }}
        name="price"
        value={price}
        onChange={handleChange}
        helperText="Please enter a total amount"
        style = {{position:'relative'}}
      />
      <TextField
          id="select-category"
          select
          label="Select"
          defaultValue={category}
          helperText="Please choose a category"
        >
          {Object.values(Category).map((option) => (
            <MenuItem key={option} value={option} 
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
