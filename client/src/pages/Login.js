import { useRef, useState, useEffect, useContext } from 'react';
import  { Home } from "./Home"
import AuthContext from "../context/AuthProvider";


import axios from '../api/axios';
const LOGIN_URL = '/api/login'

export  function Login() {

    const { setAuth } = useContext(AuthContext); 
    const userRef = useRef(); 
    const errRef = useRef(); 

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {

        const response = await axios.post(LOGIN_URL, 
            JSON.stringify({email: user, password : pwd}),
            {
                headers: {'Content-type':'application/json'},
                withCredentials : true
            }
        )
        console.log(JSON.stringify(response?.data))
        const accessToken = response?.data?.token;
        const role = response?.data?.role;
        setAuth({user,pwd,role,accessToken})
        setUser('');
        setPwd('');
        setSuccess(true);

        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response')
            } else if (err.response?.status === 400) {
                setErrMsg('Email ou mot de passe manquant')
            } else if (err.response?.status === 401) {
                setErrMsg('Email ou mot de passe incorrect')
                console.log(errMsg)
            } else {
                setErrMsg('Login failed')
            }
            errRef.current.focus()
        }


        

    }

    return (
        <>
            {success ? (
                <Home/>
            ) : (
         
        <div className="container">
        <div className='modal'>
            <div className="login__title-container">
                <img src="../images/logo.png" alt="" />
                <div className="login__title-text">Intranet</div>
            </div>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <form className="form" onSubmit = {handleSubmit}>
                <div className="form__container-item">
                    <label className="form__label"> email</label>
                    <input
                     className="form__input"
                     id = "email"
                     ref={userRef}
                     onChange={(e) => setUser(e.target.value)}
                     value = {user}
                     required
                     >
                     

                     </input>
                </div>
                <div className="form__container-item">
                    <label className="form__label">mot de passe</label>
                    <input className="form__input"
                    type="password"
                    id = "password"
                    onChange={(e) => setPwd(e.target.value)}
                    value = {pwd}
                    required
                    >

                    </input>
                </div>
                <button className="form__validate">Valider</button>
                <div className="form__forgot">Mot de passe oublié?</div>
            </form>
        </div>
        </div>
            )}
            </>
    )

}