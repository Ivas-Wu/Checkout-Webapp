import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import { Reminder, ReminderCreateReq, ReminderUpdateReq } from '../types/Reminder';
import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  GridRowId,
} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import Button from '@mui/material/Button';
import { Button as Button2 } from './Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import ReminderModals from './ReminderModals';

export interface IReminderFormProps {}

export interface IReminderTask {
  taskName: string;
  taskDescription: string;
  date?: Date;
  id: number;
  alertMe: boolean;
  alertAt?: number;
}

export const Reminderform: React.FC<IReminderFormProps> = () => {
  const userId = localStorage.getItem('user-id');
  const [reminderList, setReminderList] = useState<IReminderTask[]>([]);
  const [selectedRows, setSelectedRows] = useState<IReminderTask[]>([]);
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [rowId, setRowId] = useState<GridRowId>();
  const [openModify, setOpenModify] = useState<boolean>(false);
  const width_table = 95;

  const toggleCreate = () => {
    setOpenCreate((wasCreateVisible) => !wasCreateVisible);
  };

  const toggleModify = () => {
    setOpenModify((wasModifyVisible) => !wasModifyVisible);
  };

  const style = {
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: window.innerWidth*0.5,
    height: window.innerHeight*0.5,
    bgcolor: '#F1FCFF',
    boxShadow: 24,
    pb: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  useEffect(() => {
    getData();
  }, []);

  function convertReminders(data: Reminder[]): IReminderTask[] {
    let returnValue: IReminderTask[] = [];
    data.forEach(function (reminder) {
      const newTask = {
        taskName: reminder.reminderName,
        taskDescription: reminder.reminderDesc ? reminder.reminderDesc : '',
        date: reminder.date,
        id: reminder.id,
        alertMe: reminder.alertMe,
        alertAt: reminder.alertAt,
      };
      returnValue.push(newTask);
    });
    return returnValue;
  }

  const getData = () => {
    axios
      .get(`http://localhost:3000/api/reminders?userId=${userId}`)
      .then((res) => {
        let reminders: IReminderTask[] = convertReminders(res.data);
        setReminderList(reminders);
        console.log(reminderList);
      });
  };

  const addTask = (data: ReminderCreateReq): void => {
    axios.post(`http://localhost:3000/api/reminders/`, data).then((res) => {
      console.log(res.data);
      getData();
      toggleCreate();
    });
  };

  const modifyTask = (data: ReminderUpdateReq): void => {
    if (reminderList.findIndex((element) => element.id === rowId) === -1) {
      console.log('How did you get here, no task found!');
    } else {
      //Maybe symbol to show loading and lock user out of other actions?
      axios
        .put(`http://localhost:3000/api/reminders/` + rowId, data)
        .then((res) => {
          console.log(res.data);
          getData();
          toggleModify();
        });
    }
  };

  const deleteTask = (id?: GridRowId) => {
    let index = -1;
    if (id) {
      index = reminderList.findIndex((element) => element.id === id);
      if (index === -1) {
        console.log('How did you get here, no task found!');
      } else {
        axios.delete(`http://localhost:3000/api/reminders/` + id).then((res) => {
          console.log(res.data);
          getData();
        });
      }
    } else {
      index = reminderList.findIndex(
        (element) => element.id === selectedRows[0].id
      );
      if (index === -1) {
        console.log('How did you get here, no task found!');
      } else {
        selectedRows.forEach(function (data) {
          axios
            .delete(`http://localhost:3000/api/reminders/` + data.id)
            .then((res) => {
              console.log(res.data);
              getData();
            });
        });
      }
    }
  };

  const columns = React.useMemo<GridColumns<IReminderTask>>(
    () => [
      // { field: 'id', headerName: 'ID', type: 'number', width: window.innerWidth*width_table*0.0005 },
      { field: 'taskName', headerName: 'Title', width: window.innerWidth*width_table*0.002 },
      { field: 'taskDescription', headerName: 'Description', width: window.innerWidth*width_table*0.00355 },
      {
        field: 'date',
        headerName: 'Reminder Date',
        type: 'dateTime',
        width: window.innerWidth*width_table*0.001,
      },
      {
        field: 'alertMe',
        headerName: 'Urgent',
        type: 'boolean',
        width: window.innerWidth*width_table*0.0007,
      },
      {
        field: 'alertAt',
        headerName: 'Remind Me In',
        type: 'number',
        width: window.innerWidth*width_table*0.00085,
      },
      {
        field: 'actions',
        type: 'actions',
        width: window.innerWidth*width_table*0.0005,
        getActions: (params) => [
          <GridActionsCellItem
            key="edit"
            icon={<EditIcon />}
            label="Edit Reminder"
            onClick={() => {
              setRowId(params.id);
              toggleModify();
            }}
            showInMenu
          />,
          <GridActionsCellItem
            key="delete"
            icon={<DeleteIcon />}
            label="Delete Reminder"
            onClick={() => {
              deleteTask(params.id);
            }}
            showInMenu
          />,
        ],
      },
    ],
    [toggleModify, toggleCreate, deleteTask]
  );

  return (
    <div className="App">
      <div className="header">
        <Button2
          buttonStyle="btn--extra"
          buttonSize="btn--medium"
          onClick={toggleCreate}
        >
          Add Reminder
        </Button2>
        <Modal
          open={openCreate}
          onClose={toggleCreate}
        >
          <Box sx={style}>
            <ReminderModals create={true} remindersCreateInfo={addTask}></ReminderModals>
          </Box>
        </Modal>
      </div>
      <div className="table_border" style={{width:`${width_table}%`}}>
        <DataGrid
          className="table"
          rows={reminderList}
          columns={columns}
          pageSize={5}
          checkboxSelection={true}
          onSelectionModelChange={(ids) => {
            const selectedIDs = new Set(ids);
            const selectedRows = reminderList.filter((row) =>
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
        <Modal
          open={openModify}
          onClose={toggleModify}
        >
          <Box sx={style}>
            <ReminderModals
              create={false}
              remindersUpdateInfo={modifyTask}
              data={reminderList.find((element) => element.id === rowId)}
            ></ReminderModals>
          </Box>
        </Modal>
        <Button
          onClick={() => {
            deleteTask();
          }}
          disabled={selectedRows.length < 1 ? true : false}
        >
          Delete All Selected
        </Button>
      </div>
    </div>
  );
};

export default Reminderform;
