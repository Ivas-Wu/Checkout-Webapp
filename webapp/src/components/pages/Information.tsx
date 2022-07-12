import '../../App.css'
import React, { useState } from 'react';
import { Button } from '../Button'
import BasePopupWrapper from '../Popup/BasedPopupWrapper';
import Table2 from '../Table2';
import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

export interface IInformationPtAmountProps {};

const table2Columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'dateCreated', headerName: 'Date Created', width: 130 },
  { field: 'dateModified', headerName: 'Date Modified', width: 130 },
  {
    field: 'tAmount',
    headerName: 'Total Amount',
    type: 'number',
    width: 130,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.dateCreated || ''} ${params.row.dateModified || ''}`,
  },
];

const table2Rows = [
  { id: 1, dateModified: 'Snow', dateCreated: 'Jon', tAmount: 35 },
  { id: 2, dateModified: 'Lannister', dateCreated: 'Cersei', tAmount: 42 },
  { id: 3, dateModified: 'Lannister', dateCreated: 'Jaime', tAmount: 45 },
  { id: 4, dateModified: 'Stark', dateCreated: 'Arya', tAmount: 16 },
  { id: 5, dateModified: 'Targaryen', dateCreated: 'Daenerys', tAmount: null },
  { id: 6, dateModified: 'Melisandre', dateCreated: null, tAmount: 150 },
  { id: 7, dateModified: 'Clifford', dateCreated: 'Ferrara', tAmount: 44 },
  { id: 8, dateModified: 'Frances', dateCreated: 'Rossini', tAmount: 36 },
  { id: 9, dateModified: 'Roxie', dateCreated: 'Harvey', tAmount: 65 },
];

const Information: React.FC<IInformationPtAmountProps> = () => {

  const [isPopupVisible, setPopupVisible] = useState<boolean>(false);

  const togglePopup = () => {
    setPopupVisible(wasPopupVisible => !wasPopupVisible)
  }

  return (
      <>
          <div>This is the Information PtAmount</div>
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
          header="Upload Image"/>
          <Table2 rows={table2Rows} cols={table2Columns} />
          {/* I made 2 params optional for customization so uncomment below if you want to see that  */}
          {/* <Table2 rows={table2Rows} cols={table2Columns} ptAmountSize={8} checkboxes={false} /> */}
      </>
  )
}

export default Information;