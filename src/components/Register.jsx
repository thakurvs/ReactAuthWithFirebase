import React, { useState, useEffect, useRef } from 'react'
import { faCheck, faTimes, faInfoCircle, faL } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase-config";
import Loader from './Loader';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();
  
    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);
  
    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);
  
    const [errMsg, setErrMsg] = useState('');
    const[loading, setLoading] = useState(false);

    // this useEffect will let the user focus on current input field
    useEffect(() => {
        userRef.current.focus();
    }, []);

    //this useEffect will test the userName if it's valid or not using REGEX
    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user]);

    //this useEffect will test the validation of email
    useEffect(()=> {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email]);

    //this useEffcet will test the password validation
    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password));
    }, [password]);

    useEffect(() => {
        setErrMsg('');
    }, [user, email, password]);

    const handleRegister = async (e) => {
        e.preventDefault();
        setErrMsg("");
        setLoading(true);

        if (!validName) {
            setErrMsg('Invalid username. Please try again.');
            userRef.current.focus();
            return;
        }
        if (!validPassword) {
            setErrMsg('Invalid password. Please try again.');
            return;
        }
        if (!validEmail) {
            setErrMsg('Please enter a valid email address.');
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const username = userCredential.user;

            // Update user profile with the username
            await updateProfile(username, { displayName: user });
            alert("Registration successful!");
            setLoading(false);
            setUser('');
            setEmail('');
            setPassword('');
        } catch (err) {
            setLoading(false);
            setErrMsg(err.message);
            errRef.current.focus();
        }
    };

    return (
        <>

        {loading && (
            <Loader text="Creating Your Account..." />
        )}
        
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Register</h1>
            <form onSubmit={handleRegister}>
                <label htmlFor='username'>
                Username:
                <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
                </label>
                <input
                type='text'
                id='username'
                ref={userRef}
                autoComplete='off'
                onChange={(e) => setUser(e.target.value)} 
                value={user}
                required
                aria-invalid={validName ? "false" : "true"}
                aria-describedby='uidnote'
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
                />
                <p id='uidnote' className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                4 to 24 characters.<br />
                Must begin with a letter.<br />
                Letters, numbers, underscores, hyphens allowed.
                </p>

                <label htmlFor="email">
                Email:
                <FontAwesomeIcon icon={faCheck} className={validEmail  ? "valid" : "hide"} />
                <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
                </label>
                <input 
                type='email'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-invalid={validEmail ? "false" : "true"}
                aria-describedby="confirmnote"
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
                />
                <p id="confirmnote" className={email && emailFocus && !validEmail ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Invalid email format. Make sure it includes '@' and a valid domain (e.g., example@mail.com).<br />
                    Email must contain only letters, numbers, and valid special characters before <span aria-label="at symbol">@</span>.<br />
                    Please enter a valid email with a proper domain extension (e.g., .com, .net, .org).<br />
                </p>

                <label htmlFor='password'>
                Password:
                <FontAwesomeIcon icon={faCheck} className={validPassword ? "valid" : "hide"} />
                <FontAwesomeIcon icon={faTimes} className={validPassword || !password ? "hide" : "invalid"} />
                </label>
                <input 
                type='password'
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                aria-invalid={validPassword ? "false" : "true"}
                aria-describedby='pwdnote'
                onFocus={() => setPasswordFocus(true)}
                onBlur={() => setPasswordFocus(false)}
                />
                <p id="pwdnote" className={password && passwordFocus && !validPassword ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    8 to 24 characters.<br />
                    Must include uppercase and lowercase letters, a number and a special character.<br />
                    Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                </p>

                <button>Sign Up</button>
            </form>
            <p>
                Already registered?<br />
                <span className="line">
                    {/*put router link here*/}
                    <a href="/login">Sign In</a>
                </span>
            </p>
            </section>
        </>
    );
};

export default Register;
