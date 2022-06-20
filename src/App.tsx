import React from 'react';
import { Main } from './components/Main/Main';
import { Header } from './components/Header/Header';
import api from './utils/Api';
import { Login } from './components/Login/Login';
import { Route, Routes, Navigate, useNavigate} from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { Events } from './interfaces';
import { userData, appointmentRange} from './type';

function App() {

  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = React.useState<boolean>(false);
  const [dayEvents, setDayEvents] = React.useState<Events[]>([]);
  const [loadMessage, setLoadMessage] = React.useState<string>("Выберите дату события");

  React.useEffect(() => {
    authCheck();
  }, [])

  function authCheck() {
    const storeUsername = localStorage.getItem('username');
    const storePassword = localStorage.getItem('password');
    if (storeUsername && storePassword){
      api.auth({username: JSON.parse(storeUsername), password: JSON.parse(storePassword)})
      .then((res) => {
        if (res){
          setLoggedIn(true);
          navigate('/');
        }
      })
      .catch(() => {
        setLoggedIn(false);
      })
    } else {
      setLoggedIn(false);
    }
  } 

  function handleUpdateUserLogin(userData: userData){
    api.auth(userData)
    .then((res) => {
      if (res.status === 200) {
        setLoggedIn(true);
        navigate('/');
        localStorage.setItem('username', JSON.stringify(userData.username));
        localStorage.setItem('password', JSON.stringify(userData.password));
      }
    })
    .catch(err => {
      return console.log(`Ошибка авторизации: ${err}`);
    });
  }

  function handleGetEvents(appointmentRange: appointmentRange){
    // setLoadMessage("Загружаю...")
    api.getEvents(appointmentRange)
    .then((events) => {
      if (events.Days !== null){setDayEvents(events.Days)}
      else {setDayEvents([]); setLoadMessage("Нет данных за указанный период");}
    })
    .catch(err => console.log(`Ошибка инициализации данных: ${err}`))
    // .finally(() => {
    //   if (dayEvents.length === 0) {setLoadMessage("Нет данных за указанный период");}
    //   else {setLoadMessage("");}})
  }


  function handleClickExit(){
    localStorage.clear();
    setLoadMessage("Выберите дату события");
    setDayEvents([]);
    setLoggedIn(false);
  }

  return (
    <Routes>
      <Route path="/" element = { 
        <>
          <Header onClick={handleClickExit}/>
          <ProtectedRoute 
            path="/signin"
            loggedIn={loggedIn}
            component={<Main loadMessage={loadMessage} onGetEvents={handleGetEvents} dayEvents={dayEvents}/>} />
        </>} />
      <Route path="/signin" element = { <Login onAuth={handleUpdateUserLogin} /> }/>
      <Route path="*" element = {loggedIn ? <Navigate to="/" /> : <Navigate to="/signin" />} />
    </Routes>
  )
}

export default App;
