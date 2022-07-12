import * as React from 'react';
import { DataGrid, GridColDef} from '@mui/x-data-grid';

interface TableReqs {
    id: Number
}

// Eventually add a union type instead like User | Receipt | Item | ... when I get around to building backend for those
// Until then TableReqs will do, it pretty much just forces it to have an id

export interface TableProps<T extends TableReqs> {
    cols: GridColDef[],
    rows: T[],
    pageSize?: number
    checkboxes?: boolean
}

export default function DataTable<T extends TableReqs>(props: TableProps<T> ) {
  return (
    <div style={{ height: 400, width: '50%' }}>
      <DataGrid
        rows={props.rows}
        columns={props.cols}
        pageSize={props.hasOwnProperty('pageSize') ? props.pageSize : 5}
        checkboxSelection={props.hasOwnProperty('checkboxes') ? props.checkboxes : true}
      />
    </div>
  );
}