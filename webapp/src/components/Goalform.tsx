import React, { useState, useEffect } from 'react';
import './Goalform.css';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import { Goal, GoalCreateReq, GoalUpdateReq } from '../types/Goal';
import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  GridRowId,
} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import Button from '@mui/material/Button';
import { Button as Button2 } from './Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import GoalModals from './GoalModals';

export interface IGoalFormProps {}

export interface ITask {
  taskName: string;
  taskDescription: string;
  deadline?: Date;
  id: number;
  completed: boolean;
}

export const Goalform: React.FC<IGoalFormProps> = () => {
  const userId = localStorage.getItem('user-id');
  const [goalList, setGoalList] = useState<ITask[]>([]);
  const [selectedRows, setSelectedRows] = useState<ITask[]>([]);
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
    height: window.innerHeight*0.4,
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

  function convertGoals(data: Goal[]): ITask[] {
    let returnValue: ITask[] = [];
    data.forEach(function (goal) {
      const newTask = {
        taskName: goal.goalName,
        taskDescription: goal.goalDesc ? goal.goalDesc : '',
        deadline: goal.targetDate,
        id: goal.id,
        completed: goal.completed,
      };
      returnValue.push(newTask);
    });
    return returnValue;
  }

  const getData = () => {
    axios
      .get(`http://localhost:3000/api/goals?userId=${userId}`)
      .then((res) => {
        let goals: ITask[] = convertGoals(res.data);
        setGoalList(goals);
      });
  };

  const addTask = (data: GoalCreateReq): void => {
    axios.post(`http://localhost:3000/api/goals/`, data).then((res) => {
      console.log(res.data);
      getData();
      toggleCreate();
    });
  };

  const modifyTask = (data: GoalUpdateReq): void => {
    if (goalList.findIndex((element) => element.id === rowId) === -1) {
      console.log('How did you get here, no task found!');
    } else {
      //Maybe symbol to show loading and lock user out of other actions?
      axios
        .put(`http://localhost:3000/api/goals/` + rowId, data)
        .then((res) => {
          console.log(res.data);
          getData();
          toggleModify();
        });
    }
  };

  const completeTask = (id: GridRowId) => {
    if (goalList.findIndex((element) => element.id === id) === -1) {
      console.log('How did you get here, no task found!');
    } else {
      //Maybe symbol to show loading and lock user out of other actions?
      axios
        .put(`http://localhost:3000/api/goals/` + id, { completed: true })
        .then((res) => {
          console.log(res.data);
          getData();
        });
    }
  };
  const deleteTask = (id?: GridRowId) => {
    let index = -1;
    if (id) {
      index = goalList.findIndex((element) => element.id === id);
      if (index === -1) {
        console.log('How did you get here, no task found!');
      } else {
        axios.delete(`http://localhost:3000/api/goals/` + id).then((res) => {
          console.log(res.data);
          getData();
        });
      }
    } else {
      index = goalList.findIndex(
        (element) => element.id === selectedRows[0].id
      );
      if (index === -1) {
        console.log('How did you get here, no task found!');
      } else {
        selectedRows.forEach(function (data) {
          axios
            .delete(`http://localhost:3000/api/goals/` + data.id)
            .then((res) => {
              console.log(res.data);
              getData();
            });
        });
      }
    }
  };

  const columns = React.useMemo<GridColumns<ITask>>(
    () => [
      { field: 'id', headerName: 'ID', type: 'number', width: window.innerWidth*width_table*0.0005 },
      { field: 'taskName', headerName: 'Task', width: window.innerWidth*width_table*0.002 },
      { field: 'taskDescription', headerName: 'Description', width: window.innerWidth*width_table*0.0043 },
      {
        field: 'deadline',
        headerName: 'Goal Date',
        type: 'dateTime',
        width: window.innerWidth*width_table*0.001,
      },
      {
        field: 'completed',
        headerName: 'Completed',
        type: 'boolean',
        width: window.innerWidth*width_table*0.0007,
      },
      {
        field: 'actions',
        type: 'actions',
        width: window.innerWidth*width_table*0.0005,
        getActions: (params) => [
          <GridActionsCellItem
            key="complete"
            icon={<CheckIcon />}
            label="Complete Goal"
            onClick={() => {
              completeTask(params.id);
            }}
            showInMenu
          />,
          <GridActionsCellItem
            key="edit"
            icon={<EditIcon />}
            label="Edit Goal"
            onClick={() => {
              setRowId(params.id);
              toggleModify();
            }}
            showInMenu
          />,
          <GridActionsCellItem
            key="delete"
            icon={<DeleteIcon />}
            label="Delete Goal"
            onClick={() => {
              deleteTask(params.id);
            }}
            showInMenu
          />,
        ],
      },
    ],
    [completeTask, toggleModify, toggleCreate, deleteTask]
  );

  return (
    <div className="App">
      <div className="header">
        <Button2
          buttonStyle="btn--extra"
          buttonSize="btn--medium"
          onClick={toggleCreate}
        >
          Add Goal
        </Button2>
        <Modal
          open={openCreate}
          onClose={toggleCreate}
        >
          <Box sx={style}>
            <GoalModals create={true} goalsCreateInfo={addTask}></GoalModals>
          </Box>
        </Modal>
      </div>
      <div className="table_border" style={{width:`${width_table}%`}}>
        <DataGrid
          className="table"
          rows={goalList}
          columns={columns}
          pageSize={5}
          checkboxSelection={true}
          onSelectionModelChange={(ids) => {
            const selectedIDs = new Set(ids);
            const selectedRows = goalList.filter((row) =>
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
            <GoalModals
              create={false}
              goalsUpdateInfo={modifyTask}
              data={goalList.find((element) => element.id === rowId)}
            ></GoalModals>
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

export default Goalform;
