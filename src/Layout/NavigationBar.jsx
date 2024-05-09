import React from 'react'
import { NavLink } from 'react-router-dom'
import classes from '../Pages/OrderPage.module.css'
import { Button } from '@mui/material'

function NavigationBar() {
  return (
    <>
          {/* <div className="row"> */}
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
                {/* </div> */}
    </>
  )
}

export default NavigationBar