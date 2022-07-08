import '../../App.css'
import React, { useState } from 'react';
import { Button } from '../Button'
import { Table } from "../Table";
import BasePopupWrapper from '../Popup/BasedPopupWrapper';

export interface IInformationPageProps {};

const Information: React.FC<IInformationPageProps> = () => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Date",
        columns: [
          {
            Header: "Date Created",
            accessor: "dateCreated"
          },
          {
            Header: "Date Modified",
            accessor: "dateModified"
          }
        ]
      },
      {
        Header: "Info",
        columns: [
          {
            Header: "Total Amount",
            accessor: "tAmount"
          },
          {
            Header: "Filler",
            accessor: "f1"
          },
          {
            Header: "Filler2",
            accessor: "f2"
          },
          {
            Header: "Filler3",
            accessor: "f3"
          }
        ]
      }
    ],
    []
  );
    
  const data = [{dateCreated: "test-date-value",
  dateModified: "test-date-value",
  tAmount: 0,
  f1: 1,
  f2: 2,
  f3: 3,
  subRows: undefined},{dateCreated: "test-date-value2",
  dateModified: "test-date-value2",
  tAmount: 0.1,
  f1: 1.1,
  f2: 2.1,
  f3: 3.1,
  subRows: undefined},{dateCreated: "test-date-value3",
  dateModified: "test-date-value3",
  tAmount: 0.2,
  f1: 1.2,
  f2: 2.2,
  f3: 3.2,
  subRows: undefined}];

  const [isPopupVisible, setPopupVisible] = useState<boolean>(false);

  const togglePopup = () => {
    setPopupVisible(wasPopupVisible => !wasPopupVisible)
  }

  return (
      <>
          <div>This is the Information Page</div>
          <Button
          buttonStyle='btn--extra'
          buttonSize='btn--medium'
          onClick={togglePopup}
          >
          Add Value
          </Button>
          <BasePopupWrapper 
          isPopupVisible={isPopupVisible} 
          onBackdropClick={()=>togglePopup()}
          header="TEST"/>
          <div>TODO: Delete and modify values</div>
          <Table columns={columns} data={data} />
      </>
  )
}

export default Information;