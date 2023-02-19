import '../App.css';
import LoginButton from './auth/LoginButton';
import './Background.css';
import { Typography } from '@mui/material';

function Background() {
  return (
    <div className="backg-container">
      <video src="/videos/test2.mp4" autoPlay loop muted />
      <Typography variant="h1" color="#FFF">
        Checkout
      </Typography>
      <Typography variant="h6" color="#FFF">
        Managing money made easy
      </Typography>
      <div className="backg-btns">
        <LoginButton />
      </div>
    </div>
  );
}

export default Background;
