import '../../App.css'
import React, { useState } from 'react';
import { Button } from '../Button'
import { Table } from "../Table";
import BasePopupWrapper from '../Popup/BasedPopupWrapper';
import Table2 from '../Table2';
import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

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

  const table2Columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 90,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
  ];
  
  const table2Rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];

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
          <Table2 rows={table2Rows} cols={table2Columns} />
          {/* I made 2 params optional for customization so uncomment below if you want to see that  */}
          {/* <Table2 rows={table2Rows} cols={table2Columns} pageSize={8} checkboxes={false} /> */}
      </>
  )
}

export default Information;