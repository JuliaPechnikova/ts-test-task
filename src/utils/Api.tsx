let base64 = require('base-64');

type content = {
  baseUrl: string
}

type appointmentRange = {
  from: string,
  to: string
}

type userData = {
  password: string,
  username: string
}

class Api {
  _baseUrl: string

  constructor(content: content) {
    this._baseUrl = content.baseUrl;
  }

  private _setHeaders(userData: userData){
    return {
      'Accept': 'application/json',
      'Authorization': 'Basic ' + base64.encode(`${userData.username}:${userData.password}`),
      'Content-Type': 'application/json'
    }
  }

  private _checkResponse(res: Response){
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  private _checkResponseAuth(res: Response){
    if (res.ok) {
      return res;
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  public getEvents(appointmentRange: appointmentRange){
    const storeUsername = JSON.parse(localStorage.getItem('username')||'');
    const storePassword = JSON.parse(localStorage.getItem('password')||'');
    return fetch(`${this._baseUrl}api/appointments?From=${appointmentRange.from}&To=${appointmentRange.to}`, {
      method: 'GET',
      headers: this._setHeaders({username: storeUsername, password: storePassword})
    })
    .then(this._checkResponse)
  }

  public auth(userData: userData) {
    return fetch(`${this._baseUrl}api/login`, {
      method: 'POST',
      headers: this._setHeaders(userData)
    })
    .then(this._checkResponseAuth)
  }
}

const api = new Api({
  baseUrl: 'http://localhost:8010/proxy/'
  // baseUrl: 'http://192.168.102.231:8080/'
});

export default api;