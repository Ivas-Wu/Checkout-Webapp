import { useAuth0 } from '@auth0/auth0-react';
import '../../App.css';
import IndexPage from '../HomeWidget/index';
import { Welcome } from './pages.styled';
import { UserCreateReq } from '../../types/User';
import { Reminder } from '../../types/Reminder';
import React, { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import { Box } from '@mui/material';
import Notifications from '@mui/icons-material/Notifications';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';

export interface IHomePageProps {}


export interface AlertInfo {
  reminderName: string;
  reminderDesc: string;
  date: string;
}

const Home: React.FC<IHomePageProps> = () => {
  const { user } = useAuth0();
  const [alertsModalShow, setAlertsModalShow] = useState(false);
  const [alertsToShow, setAlertsToShow]= useState<AlertInfo[]>([]);
  const handleAlertsClose = () => setAlertsModalShow(false);
  const handleAlertsOpen = () => setAlertsModalShow(true);
  const userId = localStorage.getItem('user-id');

  function convertReminderstoAlerts(data: Reminder[]): AlertInfo[] {
    let returnValue: AlertInfo[] = [];
    data.forEach(function (reminder) {
      const newTask = {
        reminderName: reminder.reminderName,
        reminderDesc: reminder.reminderDesc ? reminder.reminderDesc : '',
        date: reminder.date ? reminder.date.toString() : new Date().toLocaleDateString()
      };
      returnValue.push(newTask);
    });
    return returnValue;
  }

  const style = {
    position: 'relative',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: window.innerWidth*0.3,
    height: window.innerHeight*0.1,
    bgcolor: '#F1FCFF',
    boxShadow: 24,
    pb: 2,
    padding: '4%',
    paddingTop: '2%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  };

  useEffect(() =>{
    if (userId){
      checkAlerts(userId, false);
    }
  },[]);


  const checkAlerts = async (uid: string, popup: boolean = true) => {
    axios(`http://localhost:3000/api/reminders/alerts?userId=` + uid)
    .then((res) => {
      if (res.data.length !== 0) {
        let alerts: AlertInfo[] = convertReminderstoAlerts(res.data);
        setAlertsToShow(alerts);
        if (popup) {
          setAlertsModalShow(true);
        }
      }
    })
  }

  useEffect(() => {
    if (!userId) {

      const fetchUserDb = async () => {
        axios
          .get(`http://localhost:3000/api/users?email=${user?.email}`)
          .then((res) => {
            if (res.data.length === 0) {
              let data : UserCreateReq = {
                email: user?.email || "",
              }
              axios
                .post(`http://localhost:3000/api/users`, data)
                .then((res) => {
                  localStorage.setItem('user-id', res.data[0].id.toString());
                  checkAlerts(res.data[0].id.toString());
                })
            } else {
              localStorage.setItem('user-id', res.data[0].id.toString());
              checkAlerts(res.data[0].id.toString());
            }
          });
      };

      fetchUserDb().catch(console.error);
    }
  }, [user?.email]);

  const pages = [
    ['videos/goals.gif', 'Goals and Reminders', '/goals'],
    ['videos/information.gif', 'Receipt Management', '/receipts'],
    ['videos/stats2.gif', 'Statistics and Budgeting', '/stats'],
  ];

  let alertRows = alertsToShow.map(a => <div style={{marginTop: "15px"}}> <b>{a['reminderName']}:</b> {a['reminderDesc']} <b> is due on {a['date']}</b> </div>)
  return (
    <>
      <div style={{background:"#F1FCFF", display: "flex", flexDirection: "row", justifyContent: "center"}}>
        <Welcome>Welcome back, {user?.name} </Welcome>
        <IconButton style={{ backgroundColor: "#F1FCFF"}} onClick={handleAlertsOpen}>
          {alertsToShow.length != 0 ? <NotificationsActiveIcon color='primary'/> : <Notifications color='action'/>}
        </IconButton>
      </div>
      <Modal
        open={alertsModalShow}
        onClose={handleAlertsClose}
      >
         <Box sx={style}>
          <div>
            {alertsToShow.length === 0 ? <>No Reminders to Show</> : <>
            <div style={{textAlign: "center"}}> Reminders </div>
            {alertRows}
            </>}
          </div>
        </Box>
      </Modal>
      <IndexPage pages={pages} /> 
      <div style={{background:"#F1FCFF"}}>&nbsp;</div>
    </>
  );
};

export default Home;
