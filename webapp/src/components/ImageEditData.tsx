import React, { ChangeEvent, useEffect, useState } from 'react';
import DropdownList from 'react-widgets/DropdownList';
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

  return (
    <>
      {pageOne && (
        <>
          <div className="review-list">
            Please review your data.
            <div>Receipt:</div>
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
            Edit Data
          </button>
          <button disabled={!ready} onClick={onSubmit}>
            Submit Data
          </button>
        </>
      )}
      {!pageOne && (
        <>
          <div className="review-list">
            <div>Edit Receipt</div>
            <ImageEditReceipt
              data={data?.receipt!}
              editData={editReceipt}
            ></ImageEditReceipt>
            <div>Edit Items</div>
            <DropdownList
              // defaultValue={category}
              data={data?.items!.map((item) => item.productName)}
              onChange={(nextValue) => setCurrentItem(nextValue)}
            />
            {currentItemTyped && (
              <ImageEditItem
                data={currentItemTyped}
                editData={editItems}
                rerender={test}
              ></ImageEditItem>
            )}
          </div>
          <button onClick={onSubmit}>Submit Data</button>
        </>
      )}
    </>
  );
};

export default ImageEditData;
