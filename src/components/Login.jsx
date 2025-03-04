import { useRef, useState, useEffect } from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Loader from './Loader';

const Login = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/"

    const emailRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        emailRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [email, password]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrMsg("");
        setLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert("Login successful!");
            setLoading(false);
            setEmail('');
            setPassword('');
            navigate(from, { replace: true });
        } catch (err) {
            setLoading(false);
            setErrMsg(err.message);
            errRef.current.focus();
        }
    };

    return (
        <>

            {loading && (
                <Loader text="Logging You In..." />
            )}
            
            <section>
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <h1>Sign In</h1>
                <form onSubmit={handleLogin}>
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="email" 
                        id='email'
                        ref={emailRef}
                        autoComplete='off'
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                    />
                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password"
                        id='password' 
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                    />
                    <button>Sign In</button>
                </form>
                <p>
                    Need an Account?<br />
                    <span className="line">
                        <Link to="/register">Sign Up</Link>
                    </span>
                </p>
            </section>
        </>
    );
};

export default Login;
