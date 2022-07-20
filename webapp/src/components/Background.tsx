import '../App.css';
import LoginButton from './auth/LoginButton';
import './Background.css';

function Background() {
  return (
    <div className="backg-container">
      <video src="/videos/test2.mp4" autoPlay loop muted />
      <h1>BASE PAGE</h1>
      <p>Please Login</p>
      <div className="backg-btns">
        <LoginButton />
      </div>
    </div>
  );
}

export default Background;
