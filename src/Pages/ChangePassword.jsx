import React, { useState } from 'react'
import classes from './ChangePassword.module.css';
import md5 from "md5";
import { NavLink } from 'react-router-dom';
import { Button } from '@mui/material';

const ChangePassword = () => {
    const [passwordDetail, setPasswordDetail] = useState({
        oldPassword : '',
        newPassword : '', 
        confirmPassword : '',
    })

    const [passwordError, setPasswordError] =  useState({
        oldPassword : '',
        newPassword : '',
        confirmPassword : '',
    })

    const [passwordSuccess, setPasswordSuccess] = useState('');
    const validate = () => {
        let errors = {};

        // Check for errors in newPassword and confirmPassword
        if (passwordDetail.oldPassword.trim() === '') {
            errors.oldPassword = 'Old password is required.';
        }
        if (passwordDetail.newPassword.trim() === '') {
            errors.newPassword = 'New password is required.';
        }

        if (passwordDetail.confirmPassword.trim() === '') {
            errors.confirmPassword = 'Confirm password is required.';
        } else if (passwordDetail.confirmPassword !== passwordDetail.newPassword) {
            errors.confirmPassword = 'Passwords do not match.';
        }

        setPasswordError(errors);
        return Object.keys(errors).length === 0;

    };

    const onPasswordChange=(e)=>{
        const {name, value} = e.target;

        setPasswordDetail(prevState=>({
            ...prevState, 
            [name] : value
        }))

        setPasswordError(prevState => ({
            ...prevState,
            [name]: ''
        }));
    }
    const handlePasswordSubmit = async(e)=>{
        e.preventDefault();
        try{
            if(validate()){

                const response = await fetch(`https://redbluorange.in/school/app/apis/changepassword`, {
                    method :'POST', 
                    body : JSON.stringify({
                        userid: localStorage.getItem('userid'),
                        password: md5(passwordDetail.newPassword),
                        accesskey: "7411189f74e25c6b2f135182edfc7030"
                    })
                })
                const data = await response.json();
                if(data.status === 200){
                    setPasswordSuccess(data.message)
                }
                setTimeout(()=>{
                    setPasswordSuccess('');
                }, 5000)
                console.log(data);
                setPasswordDetail({
                    oldPassword: '',
                    newPassword: '', 
                    confirmPassword: '',
                });
            }
        }catch(error){
            console.log(error);
        }
        
    }
  return (
    <div className={`${classes['changepass-section']}}`}>
        <div className="row">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3 col-sm-4">
                    <div className={classes['profilelinks']}>
                    <ul className={classes["promenue"]}>
                        <li>
                            <NavLink to='/order'>My orders</NavLink>
                        </li>
                        <li>
                            <NavLink to='/shop'>My Wishlist</NavLink>
                        </li>
                        <li>
                        <NavLink to='/changepassword'>Change Password</NavLink>
                        </li>
                        <li>
                            <Button sx={{padding : "15px 20px", fontWeight:"500"}}>Logout</Button>
                        </li>
                    </ul>
                </div>
                    </div>
                    <div className="col-md-9 col-sm-8">
                        <div className={`row ${classes.passwordbgset}`}>
                            <form onSubmit={handlePasswordSubmit}>
                                <div className="col-md-12">
                                <div className={classes['form-group']}>
                                  <label htmlFor="">Old password : </label>
                                  <input type="password" className={classes['form-control']} name='oldPassword' value={passwordDetail.oldPassword} onChange={onPasswordChange}/>
                                  {passwordError.oldPassword && <p className={classes['error-message']}>{passwordError.oldPassword}</p>}
                                 </div>
                                </div>
                                <div className="col-md-12">
                                <div className={classes['form-group']}>
                                  <label htmlFor="">New Password : </label>
                                  <input type="password" className={classes['form-control']} name='newPassword' value={passwordDetail.newPassword} onChange={onPasswordChange}/>
                                  {passwordError.newPassword && <p className={classes['error-message']}>{passwordError.newPassword}</p>}
                                 </div>
                                </div>
                                <div className="col-md-12">
                                <div className={classes['form-group']}>
                                  <label htmlFor="">Confirm Password : </label>
                                  <input type="password" className={classes['form-control']} name='confirmPassword' value={passwordDetail.confirmPassword} onChange={onPasswordChange}/>
                                  {passwordError.confirmPassword && <p className={classes['error-message']}>{passwordError.confirmPassword}</p>}
                                  {passwordSuccess !== '' && <p>{passwordSuccess}</p>}
                                 </div>
                                </div>
                                <div className="col-md-12">
                                    <div className={classes['updatepassbtn']}>
                                        <button className={`btn ${classes['btnsubmit']}`}>
                                            Update Password
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ChangePassword