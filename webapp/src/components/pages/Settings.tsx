import '../../App.css';
import React from 'react';
import { Welcome, Body } from './pages.styled';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

export interface ISettingsPagePros {}

const Settings: React.FC<ISettingsPagePros> = () => {
    const style = {
        width: window.innerWidth*0.8,
    }
  return (
    <>
      <Welcome>Settings Page TODO</Welcome>
      <Box
        component="form"
        sx={{
            width: window.innerWidth*0.8,
            height: window.innerHeight*0.8,
            marginLeft: window.innerWidth*0.01,
            marginRight: window.innerWidth*0.01,
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            required
            id="standard-required"
            label="Required"
            defaultValue="Test Required"
            variant="standard"
            style = {style}
          />
          <TextField
            disabled
            id="standard-disabled"
            label="Disabled"
            defaultValue="Disabled Test"
            variant="standard"
            style = {style}
          />
          <TextField
            id="standard-password-input"
            label="Password"
            type="password"
            autoComplete="password Test"
            variant="standard"
            style = {style}
          />
          <TextField
            id="standard-read-only-input"
            label="Read Only"
            defaultValue="ReadOnly"
            InputProps={{
              readOnly: true,
            }}
            variant="standard"
            style = {style}
          />
          <TextField
            id="standard-number"
            label="Number"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            variant="standard"
            style = {style}
          />
          <TextField
            id="standard-search"
            label="Search field"
            type="search"
            variant="standard"
            style = {style}
          />
          <TextField
            id="standard-helperText"
            label="Helper text"
            defaultValue="Testing"
            helperText="Explain"
            variant="standard"
            style = {style}
          />
        </div>
        <Typography id="input-slider" gutterBottom>
          Honestly IDK
        </Typography>
        <Slider
          defaultValue={50}
          aria-label="Default"
          valueLabelDisplay="auto"
        />
      </Box>
    </>
  );
};

export default Settings;
