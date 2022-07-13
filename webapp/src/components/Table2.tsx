import * as React from 'react';
import { DataGrid, GridColDef, GridRowId } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

interface TableReqs {
  id: GridRowId;
}

// Eventually add a union type instead like User | Receipt | Item | ... when I get around to building backend for those
// Until then TableReqs will do, it pretty much just forces it to have an id

export interface TableProps<T extends TableReqs> {
  cols: GridColDef[];
  rows: T[];
  pageSize?: number;
  checkboxes?: boolean;
}

export default function DataTable<T extends TableReqs>(props: TableProps<T>) {
  const [selectedRows, setSelectedRows] = React.useState<TableReqs[]>([]);

  const deleteRows = () => {
    console.log('Delete: ' + selectedRows);
  };

  const modifyRow = () => {
    console.log('Modify: ' + selectedRows);
  };

  return (
    <div style={{ height: 400, width: '80%' }}>
      <DataGrid
        rows={props.rows}
        columns={props.cols}
        pageSize={props.hasOwnProperty('pageSize') ? props.pageSize : 5}
        checkboxSelection={
          props.hasOwnProperty('checkboxes') ? props.checkboxes : true
        }
        onSelectionModelChange={(ids) => {
          const selectedIDs = new Set(ids);
          const selectedRows = props.rows.filter((row) =>
            selectedIDs.has(row.id)
          );

          setSelectedRows(selectedRows);
        }}
      />
      <Button onClick={deleteRows}>Delete</Button>
      <Button
        onClick={modifyRow}
        disabled={selectedRows.length > 1 ? true : false}
      >
        Modify
      </Button>
    </div>
  );
}
