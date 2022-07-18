import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridRowId } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import './Table.css';
import axios from 'axios';

interface Receipts { //TOMOVE
  id: number,
  createdAt: Date,
  updatedAt: Date,
  store: string, //enum?
  category: string, //enum for sure TODO
  total: number,
  date: Date,
}

interface TableReqs {
  id: GridRowId,
  dateCreated: Date,
  dateModified: Date,
  store: string, //enum?
  category: string, //enum for sure TODO
  tAmount: number,
  date: Date,
}

// Eventually add a union type instead like User | Receipt | Item | ... when I get around to building backend for those
// Until then TableReqs will do, it pretty much just forces it to have an id

export interface TableProps<T extends TableReqs> {
  pageSize?: number;
  checkboxes?: boolean;
}

export default function DataTable<T extends TableReqs>(props: TableProps<T>) {
  let userId = 1;
  const [selectedRows, setSelectedRows] = useState<TableReqs[]>([]);
  const [tableRows, settableRows] = useState<TableReqs[]>([]);
  const table2Columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'date',
      headerName: 'Date',
      type: 'Date',
      width: 230,
    },
    {
      field: 'dateCreated',
      headerName: 'Date Created',
      type: 'Date',
      width: 230,
    },
    {
      field: 'dateModified',
      headerName: 'Date Modified',
      type: 'Date',
      width: 230,
    },
    { field: 'store', headerName: 'Store', width: 100 },
    { field: 'category', headerName: 'Category', width: 100 }, //change to ENUM here too
    {
      field: 'tAmount',
      headerName: 'Total Amount',
      type: 'number',
      width: 130,
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  function convertGoals(data: Receipts[]): TableReqs[] {
    let returnValue: TableReqs[] = [];
    data.forEach(function (row) {
      const newRow = {
        id: row.id,
        dateCreated: row.createdAt,
        dateModified: row.updatedAt,
        store: row.store,
        category: row.category,
        tAmount: row.total,
        date: row.date,
      };
      returnValue.push(newRow);
    });
    return returnValue;
  }

  const getData = () => {
    axios
      .get(`http://localhost:3000/api/receipts?userId=${userId}`)
      .then((res) => {
        let rows: TableReqs[] = convertGoals(res.data);
        settableRows(rows);
      });
  };

  const deleteRows = () => {
    let index = tableRows.findIndex(
      (element) => element.id === selectedRows[0].id
    );
    if (index === -1) {
      console.log('How did you get here, no task found!');
    } else {
      axios
        .delete(`http://localhost:3000/api/receipts/` + tableRows[index].id)
        .then((res) => {
          console.log(res.data);
          getData();
        });
    }
  };

  const modifyRow = () => {
    let index = tableRows.findIndex(
      (element) => element.id === selectedRows[0].id
    );
    if (index === -1) {
      console.log('How did you get here, no task found!');
    } else {
      axios
        .put(`http://localhost:3000/api/receipts/` + tableRows[index].id, {
          // store: "",
          category: 'Modified-Category',
          total: 1234,
        })
        .then((res) => {
          console.log(res.data);
          getData();
        });
    }
  };

  return (
    <div style={{ height: 400, width: '91%' }}>
      <DataGrid
        className="table"
        rows={tableRows}
        columns={table2Columns}
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
        }}
      />
      <Button
        onClick={deleteRows}
        disabled={selectedRows.length < 1 ? true : false}
      >
        Delete
      </Button>
      <Button
        onClick={modifyRow}
        disabled={selectedRows.length !== 1 ? true : false}
      >
        Modify
      </Button>
    </div>
  );
}
