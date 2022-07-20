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
import './Table.css';
import axios from 'axios';

export enum Category { // TOMOVE, also used in Graphs.tsx for when you move
  GROCERIES = 'Groceries',
  ENTERTAINMENT = 'Entertainment',
  MEDICAL = 'Medical',
  TRANSPORTATION = 'Transportation',
  HOUSING = 'Housing',
  UTILITIES = 'Utilities',
  OTHER = 'Other',
}

export function convertCategory(value: string): Category {
  // TOMOVE as well
  if (value.toUpperCase() === 'GROCERIES' || value.toUpperCase() === 'FOOD') {
    return Category.GROCERIES;
  } else if (
    value.toUpperCase() === 'ENTERTAINMENT' ||
    value.toUpperCase() === 'FUN'
  ) {
    return Category.ENTERTAINMENT;
  } else if (
    value.toUpperCase() === 'MEDICAL' ||
    value.toUpperCase() === 'HEALTH'
  ) {
    return Category.MEDICAL;
  } else if (
    value.toUpperCase() === 'TRANSPORTATION' ||
    value.toUpperCase() === 'CAR'
  ) {
    return Category.TRANSPORTATION;
  } else if (
    value.toUpperCase() === 'HOUSING' ||
    value.toUpperCase() === 'LIVING'
  ) {
    return Category.HOUSING;
  } else if (value.toUpperCase() === 'UTILITIES') {
    return Category.UTILITIES;
  }
  return Category.OTHER;
}

interface Receipts {
  //TOMOVE
  id: number;
  createdAt: Date;
  updatedAt: Date;
  store: string; //enum?
  category: string;
  total: number;
  date: Date;
}

interface TableReqs {
  id: GridRowId;
  dateCreated: Date;
  dateModified: Date;
  store: string; //enum?
  category: Category;
  tAmount: number;
  date: Date;
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
        category: convertCategory(row.category),
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

  const modifyRow = (id?: GridRowId) => {
    let index = -1;
    if (id) {
      index = tableRows.findIndex((element) => element.id === id);
    } else {
      index = tableRows.findIndex(
        (element) => element.id === selectedRows[0].id
      );
    }
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

  const columns = React.useMemo<GridColumns<TableReqs>>(
    () => [
      { field: 'id', headerName: 'ID', type: 'number', width: 70 },
      {
        field: 'date',
        headerName: 'Date',
        type: 'dateTime',
        width: 230,
      },
      {
        field: 'dateCreated',
        headerName: 'Date Created',
        type: 'dateTime',
        width: 230,
      },
      {
        field: 'dateModified',
        headerName: 'Date Modified',
        type: 'dateTime',
        width: 230,
      },
      { field: 'store', headerName: 'Store', width: 100 },
      {
        field: 'category',
        headerName: 'Category',
        type: 'singleSelect',
        width: 100,
      },
      {
        field: 'tAmount',
        headerName: 'Total Amount',
        type: 'number',
        width: 130,
      },
      {
        field: 'actions',
        type: 'actions',
        width: 80,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => {
              deleteRows(params.id);
            }}
          />,
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit Entry"
            onClick={() => {
              modifyRow(params.id);
            }}
            showInMenu
          />,
        ],
      },
    ],
    [deleteRows, modifyRow]
  );

  return (
    <div style={{ height: 400, width: '100%' }}>
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
        }}
      />
      <Button
        onClick={() => {
          deleteRows();
        }}
        disabled={selectedRows.length < 2 ? true : false}
      >
        Delete All Selected
      </Button>
    </div>
  );
}
