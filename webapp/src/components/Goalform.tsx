// import Goaltask, { ITask } from './Goaltask';
import React, { useState, ChangeEvent, useEffect } from 'react';
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
import Switch from 'react-switch';

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
  const [checked, setChecked] = useState<boolean>(false);
  const handleOpenCreate = () => setOpenCreate(true);
  const handleCloseCreate = () => setOpenCreate(false);
  const handleOpenModify = () => setOpenModify(true);
  const handleCloseModify = () => setOpenModify(false);

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
      handleCloseCreate();
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
          handleCloseModify();
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
          handleCloseModify();
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
      { field: 'id', headerName: 'ID', type: 'number', width: 70 },
      { field: 'taskName', headerName: 'Task', width: 200 },
      { field: 'taskDescription', headerName: 'Description', width: 350 },
      {
        field: 'deadline',
        headerName: 'Goal Date',
        type: 'dateTime',
        width: 230,
      },
      {
        field: 'completed',
        headerName: 'Completed',
        type: 'boolean',
        width: 100,
      },
      {
        field: 'actions',
        type: 'actions',
        width: 80,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<CheckIcon />}
            label="Complete Goal"
            onClick={() => {
              completeTask(params.id);
            }}
            showInMenu
          />,
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit Goal"
            onClick={() => {
              setRowId(params.id);
              handleOpenModify();
            }}
            showInMenu
          />,
          <GridActionsCellItem
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
    [completeTask, handleOpenModify, handleOpenCreate, deleteTask]
  );

  return (
    <div className="App">
      <div className="header">
        <Button2
          buttonStyle="btn--extra"
          buttonSize="btn--medium"
          onClick={handleOpenCreate}
        >
          Add Goal
        </Button2>
        {/* <label>
          <Switch onChange={() => {setChecked(!checked)}} checked={checked} />
        </label> */}
        <Modal
          open={openCreate}
          onClose={handleCloseModify}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <GoalModals create={true} goalsCreateInfo={addTask}></GoalModals>
          </Box>
        </Modal>
      </div>
      <div style={{ height: 400, width: '50%', margin: 'auto' }}>
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
          onClose={handleCloseModify}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
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
          disabled={selectedRows.length < 2 ? true : false}
        >
          Delete All Selected
        </Button>
      </div>
    </div>
  );
};

export default Goalform;
