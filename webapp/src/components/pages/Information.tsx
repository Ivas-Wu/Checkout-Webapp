import '../../App.css'
import React from "react";
import { Button } from '../Button'
import { Table } from "../Table";

export interface IInformationPageProps {};

const Information: React.FunctionComponent<IInformationPageProps> = props => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        columns: [
          {
            Header: "First Name",
            accessor: "firstName"
          },
          {
            Header: "Last Name",
            accessor: "lastName"
          }
        ]
      },
      {
        Header: "Info",
        columns: [
          {
            Header: "Age",
            accessor: "age"
          },
          {
            Header: "Visits",
            accessor: "visits"
          },
          {
            Header: "Status",
            accessor: "status"
          },
          {
            Header: "Profile Progress",
            accessor: "progress"
          }
        ]
      }
    ],
    []
  );
    
    const data = [{firstName: "alarm-e4qjx",
    lastName: "delivery-6qgu5",
    age: 17,
    visits: 41,
    progress: 31,
    status: "complicated",
    subRows: undefined}];

    return (
        <>
            <div>This is the Information Page</div>
            <Button
            buttonStyle='btn--extra'
            buttonSize='btn--medium'
            onClick={() => console.log('hey')} //popup here for infomration input
            >
            Add Value
            </Button>
            <Table columns={columns} data={data} />
        </>
    )
}

export default Information;