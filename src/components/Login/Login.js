import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useForm } from "react-hook-form";
import './Login.css';
import { Link, useHistory, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../../App";
import Header from "../Home/Header/Header";

import Google from "../../icons/google.png";
import Facebook from "../../icons/facebook.png";


if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}


const Login = () => {

    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        photo: ''
    });

    const { userDetail, orderDetail}  = useContext(UserContext);
    const [loggedInUser, setLoggedInUser] = userDetail;
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const [isNewUser, setIsNewUser] = useState(false);
    const { register, handleSubmit } = useForm();

    const onSubmit = data => {
        if (isNewUser && data.Email && data.Password) {
            console.log(isNewUser);
            firebase.auth().createUserWithEmailAndPassword(data.Email, data.Password)
                .then(userCredential => {
                    const newUserInfo = userCredential.user;
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setIsNewUser(newUserInfo);
                    handleResponse(newUserInfo, true);
                })
                .catch(error => {
                    const newUserInfo = {};
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setIsNewUser(newUserInfo);

                });
        }

        if (!isNewUser && data.Email && data.Password) {
            firebase.auth().signInWithEmailAndPassword(data.Email, data.Password)
                .then((userCredential) => {

                    const user = userCredential.user;
                    user.error = '';
                    user.success = true;
                    setIsNewUser(user);
                    handleResponse(user, true);
                })
                .catch((error) => {
                    const newUserInfo = {};
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setIsNewUser(newUserInfo);
                });
        }
    }



    const handleGoogleSignIn = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then((res) => {
                const { displayName, photoURL, email } = res.user;
                const signedInUser = {
                    isSignedIn: true,
                    name: displayName,
                    email: email,
                    photo: photoURL,
                    success: true
                };
                console.log(signedInUser)
                setUser(signedInUser);
                handleResponse(signedInUser, true)
            }).catch((error) => {
                console.log(error);
            });
    }


    const handleFbSignIn = () => {
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then((res) => {
                const { displayName, photoURL, email } = res.user;
                const signedInUser = {
                    isSignedIn: true,
                    name: displayName,
                    email: email,
                    photo: photoURL,
                    success: true
                };
                setUser(signedInUser);
                handleResponse(signedInUser, true)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleResponse = (res, redirect) => {
        setUser(res);
        setLoggedInUser(res);
        if (redirect) {
            history.replace(from);
        }
    }



    return (
        <div>
            <Header></Header>
            <div className="Login-form">
                {
                    isNewUser ? <h1>Create an account</h1> : <h1>Login</h1>
                }

                <form onSubmit={handleSubmit(onSubmit)}>
                    {
                        isNewUser && <input className="form-control" name="name" placeholder="Name" required ref={register} />
                    }
                    <br />
                    <input className="form-control" name="Email" placeholder="Email" ref={register} required />
                    <br />
                    <input className="form-control" placeholder="Password" name="Password" type="password" required ref={register({ required: true })} />
                    <br />
                    {
                        isNewUser && <input className="form-control" placeholder="Confirm Password" type="password" required name="Confirm Password" ref={register({ required: true })} />
                    }
                    <br />
                    <br />
                    {isNewUser ? <input className="form-control bg-success text-white" type="submit" value="Create an account" /> : <input className="form-control bg-success text-white" type="submit" value="Login" />}
                    {isNewUser ? <p>Already have an account? <Link style={{ textDecoration: 'none' }} onClick={() => setIsNewUser(!isNewUser)}>Login</Link></p> : <p>Don't have an account? <Link style={{ textDecoration: 'none' }} onClick={() => setIsNewUser(!isNewUser)}>Create an account.</Link></p>}
                </form>
                <p>user {user.email} loggedIn Successfully</p>
                <br />
                <div className="d-flex justify-content-center">
                    <button className="form-control w-75   text-black" onClick={handleGoogleSignIn}><img className="login-icon" src={Google}></img> Continue with Google</button>
                </div>
                <br />
                <div className="d-flex justify-content-center">
                    <button className="form-control w-75  text-black" onClick={handleFbSignIn}><img className="login-icon" src={Facebook}></img>Continue with Facebook</button>
                </div>
            </div>
        </div>
    );
};

export default Login;