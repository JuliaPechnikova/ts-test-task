import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './Login.css';

import { userData } from '../../type';

interface LoginProps {
  onAuth(userData: userData) : void
}

export const Login: React.FC<LoginProps> = props => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    props.onAuth({
      password,
      username
    });
  }

  function handleUsernameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUsername(e.target.value);
  }
  
  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  return (
  <div className="login">
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: 300 },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <div className="login__form">
        <TextField
          required
          label="Логин"
          type="text"
          value={username}
          autoComplete="username"
          onChange={handleUsernameChange}
        />
        <TextField
          required
          label="Пароль"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <Button 
      type="submit"
      sx={{
        m: 1,
        mt: 2,
        width: 300,
      }} 
      variant="contained">Войти</Button>
    </Box>
  </div>);
}