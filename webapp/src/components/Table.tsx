import React, { useEffect, useState } from 'react';
import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  GridRowId,
} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import './Table.css';
import axios from 'axios';
import { Receipt, ReceiptUpdateReq } from '../types/Receipt';
import { Category, convertCategory } from '../types/Category';
import TableModify from './TableModify';

export interface TableReqs {
  id: GridRowId;
  store: string;
  category: Category;
  tAmount: number;
  date: Date;
  dateCreated: Date;
  dateModified: Date;
}

export interface TableProps<T extends TableReqs> {
  pageSize?: number;
  checkboxes?: boolean;
  rerender?: boolean;
}

export default function DataTable<T extends TableReqs>(props: TableProps<T>) {
  const userId = localStorage.getItem('user-id');
  const [selectedRows, setSelectedRows] = useState<TableReqs[]>([]);
  const [tableRows, settableRows] = useState<TableReqs[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [rowId, setRowId] = useState<GridRowId>();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const width_table = 95;

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [props.rerender]);

  function convertReceipt(data: Receipt[]): TableReqs[] {
    let returnValue: TableReqs[] = [];
    data.forEach(function (row) {
      const newRow = {
        id: row.id,
        dateCreated: row.createdAt,
        dateModified: row.updatedAt,
        store: row.store ? row.store : '',
        category: row.category ? convertCategory(row.category) : Category.OTHER,
        tAmount: row.total,
        date: row.date ? row.date : row.createdAt,
      };
      returnValue.push(newRow);
    });
    return returnValue;
  }

  const getData = () => {
    axios
      .get(`http://localhost:3000/api/receipts?userId=${userId}`)
      .then((res) => {
        let rows: TableReqs[] = convertReceipt(res.data);
        settableRows(rows);
      });
  };

  const deleteRows = (id?: GridRowId) => {
    let index = -1;
    if (id) {
      index = tableRows.findIndex((element) => element.id === id);
      if (index === -1) {
        console.log('How did you get here, no task found!');
      } else {
        axios.delete(`http://localhost:3000/api/receipts/` + id).then((res) => {
          console.log(res.data);
          getData();
        });
      }
    } else {
      index = tableRows.findIndex(
        (element) => element.id === selectedRows[0].id
      );
      if (index === -1) {
        console.log('How did you get here, no task found!');
      } else {
        selectedRows.forEach(function (data) {
          axios
            .delete(`http://localhost:3000/api/receipts/` + data.id)
            .then((res) => {
              console.log(res.data);
              getData();
            });
        });
      }
    }
  };

  const modifyRow = (data: ReceiptUpdateReq) => {
    if (tableRows.findIndex((element) => element.id === rowId) === -1) {
      console.log('How did you get here, no task found!');
    } else {
      //Maybe symbol to show loading and lock user out of other actions?
      axios
        .put(`http://localhost:3000/api/receipts/` + rowId, data)
        .then((res) => {
          console.log(res.data);
          getData();
          handleClose();
        });
    }
  };

  const columns = React.useMemo<GridColumns<TableReqs>>(
    () => [
      { field: 'id', headerName: 'ID', type: 'number', width: window.innerWidth*width_table*0.0005 },
      {
        field: 'date',
        headerName: 'Date',
        type: 'dateTime',
        width: window.innerWidth*width_table*0.001,
      },
      { field: 'store', headerName: 'Store', width: window.innerWidth*width_table*0.0015 },
      {
        field: 'category',
        headerName: 'Category',
        type: 'singleSelect',
        width: window.innerWidth*width_table*0.001,
      },
      {
        field: 'tAmount',
        headerName: 'Total Amount',
        type: 'number',
        width: window.innerWidth*width_table*0.001,
      },
      {
        field: 'dateCreated',
        headerName: 'Date Created',
        type: 'dateTime',
        width: window.innerWidth*width_table*0.002,
      },
      {
        field: 'dateModified',
        headerName: 'Date Modified',
        type: 'dateTime',
        width: window.innerWidth*width_table*0.002,
      },
      {
        field: 'actions',
        type: 'actions',
        width: window.innerWidth*width_table*0.001,
        getActions: (params) => [
          <GridActionsCellItem
            key = "deleteItem" 
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => {
              deleteRows(params.id);
            }}
          />,
          <GridActionsCellItem
            key = "editItem" 
            icon={<EditIcon />}
            label="Edit Entry"
            onClick={() => {
              setRowId(params.id);
              handleOpen();
            }}
            showInMenu
          />,
        ],
      },
    ],
    [deleteRows, handleOpen]
  );

  return (
    <div className="table_border" style={{width:`${width_table}%`}}>
      <DataGrid
        className="table"
        rows={tableRows}
        columns={columns}
        pageSize={props.hasOwnProperty('pageSize') ? props.pageSize : 5}
        checkboxSelection={
          props.hasOwnProperty('checkboxes') ? props.checkboxes : true
        }
        onSelectionModelChange={(ids) => {
          const selectedIDs = new Set(ids);
          const selectedRows = tableRows.filter((row) =>
            selectedIDs.has(row.id)
          );

          setSelectedRows(selectedRows);
        }}
        sx={{
          boxShadow: 2,
          border: 0,
          borderColor: 'primary.light',
          '& .MuiDataGrid-cell:hover': {
            color: 'primary.main',
          },
          '& .MuiCheckbox-root svg': {
            width: 16,
            height: 16,
            backgroundColor: "transparent",
            border: `1px solid #d9d9d9`,
            borderRadius: 2
          },
          '& .MuiDataGrid-columnHeader, .MuiDataGrid-columnHeaderCheckbox': {
            width: 16,
          },
        }}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TableModify
            receiptUpdateInfo={modifyRow}
            data={tableRows.find((element) => element.id === rowId)}
          ></TableModify>
        </Box>
      </Modal>
      <Button
        onClick={() => {
          deleteRows();
        }}
        disabled={selectedRows.length < 1 ? true : false}
      >
        Delete All Selected
      </Button>
    </div>
  );
}
