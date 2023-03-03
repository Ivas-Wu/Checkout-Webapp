import React, { ChangeEvent, useEffect, useState } from 'react';
import { ReminderUpdateReq, ReminderCreateReq } from '../types/Reminder';
import 'react-widgets/styles.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { IReminderTask } from './ReminderForm';
import TextField from '@mui/material/TextField';
import Button from './Button';
import Checkbox from '@mui/material/Checkbox';

interface ITableModifyProps {
  create: boolean;
  remindersCreateInfo?: (data: ReminderCreateReq) => void;
  remindersUpdateInfo?: (data: ReminderUpdateReq) => void;
  data?: IReminderTask;
}

export const TableModify: React.FC<ITableModifyProps> = ({
  create,
  remindersCreateInfo,
  remindersUpdateInfo,
  data,
}: ITableModifyProps) => {
  const [userId, setUserId] = useState<number | undefined>(undefined);
  const [reminderName, setReminderName] = useState<string | undefined>(
    undefined
  );
  const [reminderDesc, setReminderDesc] = useState<string | undefined>(
    undefined
  );
  const [targetDate, setTargetDate] = useState<Date | undefined>(undefined);
  const [alertMe, setAlertMe] = useState<boolean>(false);
  const [alertAt, setAlertAt] = useState<number>(0);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === 'useId') {
      setUserId(Number(event.target.value.replace(/[^0-9.]/g, '')));
    } else if (event.target.name === 'reminderName') {
      setReminderName(event.target.value);
    } else if (event.target.name === 'reminderDesc') {
      setReminderDesc(event.target.value);
    } else if (event.target.name === 'alertMe') {
      setAlertMe(!alertMe);
    } else if (event.target.name === 'alertAt') {
      setAlertAt(Number(event.target.value) >= 0 ? Number(event.target.value) : 0);
    }
  };

  const selectDateHandler = (d: Date) => {
    setTargetDate(d);
  };

  useEffect(() => {
    if (create) {
      setUserId(Number(localStorage.getItem('user-id')!));
      setTargetDate(new Date());
    } else {
      console.log(data);
      setReminderName(data?.taskName);
      setReminderDesc(data?.taskDescription);
      setTargetDate(new Date(data?.date!));
      setAlertMe(data?.alertMe ? data?.alertMe : alertMe);
      setAlertAt(data?.alertAt ? data?.alertAt : alertAt);
    }
  }, []);

  const onSubmitCreate = () => {
    let dataReturn: ReminderCreateReq = {
      userId: userId ? userId : Number(localStorage.getItem('user-id')!),
      reminderName: reminderName
        ? reminderName
        : 'Reminder Name was lost in transaction',
      reminderDesc: reminderDesc,
      date: targetDate,
      alertMe: alertMe,
      alertAt: alertMe ? alertAt : 0,
    };
    remindersCreateInfo!(dataReturn);
  };

  const onSubmitUpdate = () => {
    let dataReturn: ReminderUpdateReq = {
      reminderName: reminderName,
      reminderDesc: reminderDesc,
      date: targetDate,
      alertMe: alertMe,
      alertAt: alertMe ? alertAt : 0,
    };
    remindersUpdateInfo!(dataReturn);
  };

  return (
    <>
      <div>
        <TextField
          required
          id="standard-required"
          label={create ? 'Reminder Name...' : 'New Reminder Name...'}
          variant="standard"
          style={{ width: '100%' }}
          value={reminderName}
          name="reminderName"
          onChange={handleChange}
        />
        <TextField
          required
          id="standard-required"
          label={
            create ? 'Reminder Description...' : 'New Reminder Description...'
          }
          variant="standard"
          style={{ width: '100%' }}
          value={reminderDesc}
          name="reminderDesc"
          onChange={handleChange}
        />
        <div
          style={{
            marginTop: '3%',
            marginBottom: '3%',
          }}
        >
          <DatePicker
            dateFormat="yyyy/MM/dd"
            selected={targetDate}
            onChange={selectDateHandler}
            minDate={new Date()}
            todayButton={'Today'}
          />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '10% 90%' }}>
          <Checkbox value={alertMe} onChange={handleChange} name="alertMe" checked={alertMe}/>
          <TextField
            id="standard-number"
            label="Remind Me"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            variant="standard"
            style={{ width: '100%', marginLeft: '2%' }}
            value={alertAt}
            name="alertAt"
            onChange={handleChange}
            disabled={!alertMe}
          />
        </div>
        <Button
          buttonStyle="btn--extra"
          buttonSize="btn--small"
          onClick={create ? onSubmitCreate : onSubmitUpdate}
        >
          {create ? 'Create' : 'Modify'}
        </Button>
      </div>
    </>
  );
};

export default TableModify;
