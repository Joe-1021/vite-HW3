import { useState } from 'react'
import axios from 'axios'
//import './App.css'

const host = 'https://todolist-api.hexschool.io'

const SignUp =()=>{
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [nickname,setNickname]=useState('');
  const [message,setMessage]=useState('')
  console.log('註冊');
  //console.log(form)
  const signUp = async()=>{
    try {
      const res = await axios.post(`${host}/users/sign_up`,{
        email,password,nickname
      });
      console.log(res);
      setMessage('註冊成功，你的UID:'+res.data.uid);
      setEmail('');
      setPassword('');
      setNickname('');
    } catch (error) {
      console.log(error.response.data.message);
      setMessage('註冊失敗'+error.response.data.message)
    }
    
  }


return (
  <>
    <div>
      <h2>註冊</h2>
      <input type="email" name="email" value={email} placeholder='Email'onChange={(e)=>setEmail(e.target.value)}/>
      <input type="password" name="password" value={password} placeholder='Password' onChange={(e)=>setPassword(e.target.value)}/>
      <input type="text" name='nickname'value={nickname} placeholder='Nickname' onChange={(e)=>setNickname(e.target.value)}/>
      <button onClick={signUp}>Sign Up</button>
      {message}
    </div>
  </>
)
}

const SignIn =()=>{
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [token,setToken]=useState('');

  const signIn = async()=>{
    console.log('登入');
    try {
      const res = await axios.post(`${host}/users/sign_in`,{
      email:email,
      password:password
    });
      console.log(res.data.token);
      setToken(res.data.token);
      setEmail('');
      setPassword('')
    } catch (error) {
      console.log(error);
      setToken(error.response.data.message)
    }
    
  }

  return<>
  <h2>登入</h2>
  <input type="email" name="email" value={email}  placeholder='Email'onChange={(e)=>setEmail(e.target.value)}/>
  <input type="password" name="password" value={password} placeholder='password'onChange={(e)=>setPassword(e.target.value)}/>
  <button onClick={signIn}>Sign In</button>
  <br />
  Token: {token}
  </>
}

const Checkout =()=>{

  const [token,setToken]=useState('');
  const [message,setMessage]=useState('')

  const checkout = async()=>{
    try {
      const res = await axios.get(`${host}/users/checkout`,{
        headers:{
          authorization:token
        }
      });
      console.log(res);
      setMessage('驗證成功');
      setToken('')
    } catch (error) {
      console.log(error.response.data.message);
      setMessage(error.response.data.message)
    }
    
  }

  return <>
    <h2>驗證</h2>
     <input type="text" name="token" onChange={(e)=>setToken(e.target.value)}/>
     <button onClick={checkout}>驗證</button>
     <br/>
     {message}
  </>
}


function App() {
  return (
    <>
      <SignUp/>
      <SignIn/>
      <Checkout />
    </>
  )
}

export default App
