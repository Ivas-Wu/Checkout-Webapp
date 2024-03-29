import React, { ChangeEvent, useEffect, useState } from 'react';
import 'react-widgets/styles.css';
import { Category, convertCategory } from '../types/Category';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { Scanner, ScannerI } from '../types/Scanner';
import './ImageEditData.css';
import ImageEditReceipt from './ImageEditReceipt';
import ImageEditItem from './ImageEditItem';
import { ReceiptCreateReq } from '../types/Receipt';
import { ItemCreateReq } from '../types/Item';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

interface IImageEditDataProps {
  dataFromUpload?: Scanner;
  handleClose: () => void;
}

export type dataS = {
  receipt: dataR;
  items: dataI[];
};

export type dataR = {
  store: string;
  category: Category;
  total: number;
};

export type dataI = {
  productName: string;
  category: Category;
  price: number;
};

export const ImageEditData: React.FC<IImageEditDataProps> = ({
  dataFromUpload,
  handleClose,
}) => {
  const userId = localStorage.getItem('user-id');
  const [pageOne, setPageOne] = useState<boolean>(true);
  const [data, setData] = useState<dataS>();
  const [ready, setReady] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<string>('');
  const [currentItemTyped, setCurrentItemTyped] = useState<dataI | undefined>(
    undefined
  );
  const [test, setTest] = useState<boolean>(false);

  useEffect(() => {
    let dataHold: dataS = convertScannerData(dataFromUpload!);
    setData(dataHold);
    setReady(true);
  }, [dataFromUpload]);

  useEffect(() => {
    setCurrentItemTyped(
      data?.items!.find((item) => item.productName === currentItem)
    );
    setTest(!test);
  }, [currentItem]);

  const getData = () => {
    axios
      .get(`http://localhost:3000/api/scanner?userId=${userId}`)
      .then((res) => {
        let data: dataS = convertScannerData(res.data);
        setData(data);
        setReady(true);
      });
  };

  function convertScannerData(data: Scanner): dataS {
    let hold: dataI[] = [];
    let returnValue: dataS = {
      receipt: {
        store: data.receipt?.store ? data.receipt.store : 'Unknown',
        category: data.receipt?.category
          ? convertCategory(data.receipt.category)
          : Category.OTHER,
        total: data.receipt?.total ? data.receipt.total : 0,
      },
      items: data.items ? convertScannerItems(data.items) : hold,
    };
    return returnValue;
  }

  function convertScannerItems(items: ScannerI[]): dataI[] {
    let returnValue: dataI[] = [];
    items.forEach((item) => {
      if (item.productName !== 'Tax') {
        let newItem: dataI = {
          productName: item.productName ? item.productName : 'Unknown',
          category: item.category
            ? convertCategory(item.category)
            : Category.OTHER,
          price: item.price ? item.price : 0,
        };
        returnValue.push(newItem);
      }
    });
    return returnValue;
  }

  const onSubmit = () => {
    let receiptData: ReceiptCreateReq = {
      userId: Number(userId),
      store: data?.receipt.store,
      total: data?.receipt.total ? Number(data?.receipt.total) : 0,
      category: data?.receipt.category,
      date: new Date(),
    };
    try {
      axios
        .post(`http://localhost:3000/api/receipts/`, receiptData)
        .then((res) => {
          console.log(res.data);
          let reciptId = res.data.id;
          data?.items.forEach((item) => {
            let itemData: ItemCreateReq = {
              userId: Number(userId),
              receiptId: reciptId,
              productName: item.productName,
              category: item.category,
              numberOf: 1,
              price: item.price,
            };
            try {
              axios
                .post(`http://localhost:3000/api/items/`, itemData)
                .then((res) => {
                  console.log(res.data);
                });
            } catch (error) {
              console.log(error);
            }
          });
        });
    } catch (error) {
      console.log(error);
    }

    handleClose();
  };

  const editData = () => {
    setPageOne(false);
  };

  const editReceipt = (value: dataR) => {
    let dataI: dataI[] = data?.items ? data?.items : [];
    let newData: dataS = {
      receipt: value,
      items: dataI,
    };
    setData(newData);
  };

  const editItems = (value: dataI) => {
    console.log('{}', data);
    let dataR: dataR = data?.receipt
      ? data?.receipt
      : {
          store: 'Unknwon',
          category: Category.OTHER,
          total: 0,
        };
    let dataI: dataI[] = [];
    let index = data?.items.findIndex(
      (item) => item.productName !== value.productName
    );
    if (index !== -1) {
      dataI = data?.items.filter(
        (item) => item.productName !== value.productName
      )!;
      dataI.splice(index!, 0, value);
    }
    let newData: dataS = {
      receipt: dataR,
      items: dataI,
    };
    console.log(newData);
    setData(newData);
  };

  let str = '<ul>';
  data?.items!.forEach(function (item) {
    str += '<li>' + 'Product Name: ' + item?.productName + '</li>';
    str += '<ul>';
    str += '<li>' + 'Category: ' + item?.category + '</li>';
    str += '<li>' + 'Price: ' + item?.price + '</li>';
    str += '</ul>';
  });
  str += '</ul>';
  let list = document.getElementById('slideContainer');
  if (list != null) {
    list.innerHTML = str;
  }

  const style = {
    width: '100%',
    height: '85%',
    overflow: 'auto',
    marginBottom: '2%',
    padding: '3px',
    border: '3px solid #ebf2ff',
    borderRadius: '7px',
  };

  return (
    <>
      {pageOne && (
        <>
          <Typography variant="h6">Please review your data.</Typography>
          <div className="review-list" style={{ ...style }}>
            <Typography>Receipt:</Typography>
            <ul>
              <li>
                {'Category: '}
                {data?.receipt.category}
              </li>
              <li>
                {'Store: '}
                {data?.receipt.store}
              </li>
              <li>
                {'Total: '}
                {data?.receipt.total}
              </li>
            </ul>
            <div>Items:</div>
            <div id="slideContainer"></div>
          </div>
          <button disabled={!ready} onClick={editData}>
            <Typography variant="button">Edit Data</Typography>
          </button>
          <button disabled={!ready} onClick={onSubmit}>
            <Typography variant="button">Submit Data</Typography>
          </button>
        </>
      )}
      {!pageOne && (
        <>
          <Typography variant="h6">Edit Receipt.</Typography>
          <div className="review-list" style={{ ...style }}>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off"
            >
              <ImageEditReceipt
                data={data?.receipt!}
                editData={editReceipt}
              ></ImageEditReceipt>
              <div>Edit Items</div>
              <TextField
                id="select-item"
                select
                label="Select"
                helperText="Please choose an item"
              >
                {data?.items!.map((option) => (
                  <MenuItem
                    key={option.productName}
                    value={option.productName}
                    onClick={(nextValue) =>
                      setCurrentItem(
                        nextValue.currentTarget.dataset.value
                          ? nextValue.currentTarget.dataset.value
                          : ''
                      )
                    }
                  >
                    {option.productName}
                  </MenuItem>
                ))}
              </TextField>
              {/* <DropdownList
                // defaultValue={category}
                data={data?.items!.map((item) => item.productName)}
                onChange={(nextValue) => setCurrentItem(nextValue)}
              /> */}
              {currentItemTyped && (
                <ImageEditItem
                  data={currentItemTyped}
                  editData={editItems}
                  rerender={test}
                ></ImageEditItem>
              )}
            </Box>
          </div>
          <button onClick={onSubmit}>
            <Typography variant="button">Submit Data</Typography>
          </button>
        </>
      )}
    </>
  );
};

export default ImageEditData;
