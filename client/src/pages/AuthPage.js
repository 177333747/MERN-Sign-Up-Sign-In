import React, {useState, useEffect, useContext} from 'react'
import { AuthContext } from '../context/AuthContext'
import {useHttp} from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'


export const AuthPage = () => {
    const auth = useContext(AuthContext)
  const message =  useMessage()
  const{loading, request, error, clearError} = useHttp()
  const [form, setForm] = useState({
      email: '', password: ''
  })

 useEffect(() => {
    
     message(error)
     clearError()
 }, [error,message, clearError])

 useEffect(()=>{
    window.M.updateTextFields()
 }, [])

  const changeHandler = event =>{
      setForm({...form, [event.target.name]: event.target.value})
  }

  const registerHandler = async() => {
      try{
        const data= await request('/api/auth/register', 'POST', {...form})
        message(data.message)
    }catch(e){}
  }

  const loginHandler = async() => {
    try{
      const data= await request('/api/auth/login', 'POST', {...form})
      auth.login(data.token, data.userId)
  }catch(e){}
}

  return (
    <div className="row text-align: center "style={{paddingTop: '18rem' }} >
      <div className="col s4 offset-s4 ">
        
        <div className="card blue darken-4">
          <div className="card-content white-text">
            <span className="card-title"></span>
            <div>

              <div className="input-field">
                <input
                  placeholder="Type email"
                  id="email"
                  type="text"
                  name="email"
                  className="blue-input"
                  value={form.email}
                  onChange={changeHandler}/>
                <label htmlFor="email">Email</label>
              </div>

              <div className="input-field">
                <input
                  placeholder="Type password"
                  id="password"
                  type="password"
                  name="password"
                  className="blue-input"
                  value={form.password}
                  onChange={changeHandler} />
                <label htmlFor="email">Password</label>
              </div>

            </div>
          </div>
          <div className="card-action">
            <button
              className="btn yellow darken-3"
              style={{marginRight: 10}}
              disabled={loading}
              onClick={loginHandler}>
              Sign In
            </button>
            <button
              className="btn blue darken-2"
              onClick={registerHandler}
              disabled={loading}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}