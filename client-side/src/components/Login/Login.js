
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useContext, useState } from 'react';
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import './Login.css';


if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}



const Login = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    photo: ''
  })
  const provider = new firebase.auth.GoogleAuthProvider();
  const handleSignIn = () => {
    firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        const { displayName, photoURL, email } = result.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL
        };
        //console.log('before', user);
        setUser(signedInUser);
        setLoggedInUser(signedInUser);
        //console.log('after', user);
        history.replace(from);

      })
      .catch(error => {
        //console.log(error);
        //console.log(error.message);
      })
  }
  const handleSignOut = () => {
    firebase.auth().signOut().then(() => {
      const signedOutUser = {
        isSignedIn: false,
        name: '',
        email: '',
        photo: '',
        error: '',
        success: false

      }
      setUser(signedOutUser);
    }).catch((error) => {
      // An error happened.
    });
  }

  const handleBlur = (e) => {
    //console.log(e.target.value);
    let isFieldValid = true;
    if (e.target.name === 'email') {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === 'password') {

      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;


    }
    if (e.target.name === 'name') {
      isFieldValid = e.target.value.length > 2;

    }
    if (e.target.name === 'confirmPassword') {

      if (e.target.value === user.password) {


        isFieldValid = true;
        //console.log(isFieldValid);
      }
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
      //console.log('user', user)
    }
  }
  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          //console.log(res);
          const newUserInfo = { ...user };
          newUserInfo.error = '';
          newUserInfo.success = true;
          setNewUser(false);
          setUser(newUserInfo);
          //console.log('username', user.name);
          updateUserName(user.name);
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });


    }
    if (!newUser && user.email && user.password) {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          //console.log(res);
          const newUserInfo = { ...user };
          newUserInfo.error = '';
          newUserInfo.success = true;
          newUserInfo.name = res.user.displayName;
          newUserInfo.isSignedIn = true;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          history.replace(from);
          //console.log('user info', res.user)
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }

    e.preventDefault();
  }
  const updateUserName = name => {
    var userProfile = firebase.auth().currentUser;
    //console.log('user profile', userProfile);
    userProfile.updateProfile({
      displayName: name
    }).then(function () {
      //console.log('user name updated successfully', userProfile)
    }).catch(function (error) {
      //console.log(error)
    });
  }


  return (
    <div className="login-container mt-5 pt-5">

      {
        newUser &&
        // ---------------------------------------------------------------------------------------------------------------
        <div className="container  " style={{ width: '450px' }}>
          <h1 className="text-center mb-3">Sign in</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input type="text" className="form-control" name="name" id="name" onBlur={handleBlur} placeholder='Name' />
            </div>
            <div className="mb-3">
              <input type="email" className="form-control" name="email" id="" aria-describedby="emailHelp" onBlur={handleBlur} placeholder='Email' />
            </div>
            <div className="mb-3">
              <input type="password" name="password" className="form-control" id="" onBlur={handleBlur} placeholder='Password' />
            </div>
            <div className="mb-3">
              <input type="password" name="confirmPassword" className="form-control" id="" onBlur={handleBlur} placeholder='Confirm password' />
            </div>
            <button type="submit" className="btn  btn-block" style={{ backgroundColor: 'rgb(252, 97, 7)', color: 'white' }}>Sign In</button>

          </form>
          {/* <p className="text-center mt-3">-----------Or-------------</p>
          <button className="btn btn-danger btn-block " onClick={handleSignIn} >
            <FontAwesomeIcon icon={faGoogle}></FontAwesomeIcon> &nbsp;&nbsp;&nbsp;&nbsp;
            Sign in with Google</button> */}
          <p className="text-center tw-bold pt-3">Already registered?<span onClick={() => setNewUser(!newUser)} style={{ cursor: 'default', color: 'rgb(252, 97, 7)' }}><u> Go to Login</u></span> </p>
          <p style={{ color: 'red' }}>{user.error}</p>
          {/* {user.success && <p style={{ color: 'green' }}>Success!</p>} */}
        </div>

      }
      {
        !newUser &&
        // <div className="container" style={{ width: '35%' }}>
        //   <form onSubmit={handleSubmit(onSubmit)}>
        //     <div className="mb-3">

        //       <input type="email" className="form-control" name="email" id="exampleInputEmail1" aria-describedby="emailHelp" ref={register({ required: true, pattern: /\S+@\S+\.\S+/ })} />
        //       {errors.email && <span>This field is required</span>}
        //     </div>
        //     <div className="mb-3">

        //       <input type="password" name="password" className="form-control" id="exampleInputPassword1" ref={register({ required: true, minLength: 6, pattern: /\d{1}/ })} />
        //       {errors.password && <span>This field is required</span>}
        //     </div>

        //     <button type="submit" className="btn btn-primary">Submit</button>
        //   </form>

        // -----------------------------------------------------------------------------------------------------------------------------
        <div className="container  " style={{ width: '450px' }}>
          <h1 className="text-center mb-3">Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input type="email" className="form-control" name="email" id="exampleInputEmail1" aria-describedby="emailHelp" onBlur={handleBlur} placeholder='Email' />
            </div>
            <div className="mb-3">
              <input type="password" name="password" className="form-control" id="exampleInputPassword1" onBlur={handleBlur} placeholder='Password' />
            </div>
            <button type="submit" className="btn  btn-block" style={{ backgroundColor: 'rgb(252, 97, 7)', color: 'white' }}>Login</button>

          </form>
          <p className="text-center mt-3">-----------Or-------------</p>
          <button className="btn btn-danger btn-block " onClick={handleSignIn}  >
            <FontAwesomeIcon icon={faGoogle}></FontAwesomeIcon> &nbsp;&nbsp;&nbsp;&nbsp;
            Sign in with Google</button>
          <p className="text-center tw-bold pt-3">New here? <span onClick={() => setNewUser(!newUser)} style={{ cursor: 'default', color: 'rgb(252, 97, 7)' }}><u> Go to register</u></span> </p>
          <p style={{ color: 'red' }}>{user.error}</p>
          {/* {user.success && <p style={{ color: 'green' }}>Success!</p>} */}
        </div>

        // ------------------------------------------------------------------------------------------------------------------------------


      }

    </div >
  );
};

export default Login;