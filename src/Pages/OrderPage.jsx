import React, { useEffect, useState } from 'react'
import classes from './OrderPage.module.css'
import VisibilityIcon from '@mui/icons-material/Visibility';
import { NavLink } from 'react-router-dom';
import { Button } from '@mui/material';
import NavigationBar from '../Layout/NavigationBar';
const OrderPage = () => {

    const [orders, setOrders] = useState([]);
    const [orderCount, setOrderCount] = useState(0)
    const getOrders = async()=>{
        try{
            const response = await fetch(`https://redbluorange.in/school/app/apis/orderlist`, {
            method : 'POST',
            body : JSON.stringify({
                userid : localStorage.getItem('userid'),
                accesskey : '7411189f74e25c6b2f135182edfc7030',
            }),
            headers : {
                'Content-Type' : 'application/json',
            }
        })
        const data = await response.json();
        if(response.status === 200){
            setOrderCount(data.ordercount);
            setOrders(data.orderlist);
            console.log(data);

        }
        }catch(error){
            console.log(error);
        }
        
    }

    useEffect(()=>{
        getOrders();
    }, [])
  return (
    <div className={classes['myorders-section']}>
        <div className="row">
            <div className="container-fluid">
                <div className="row">
                    {/* <div className="col-md-3 col-sm-4">
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
                    </div> */}
                    <NavigationBar />
                    <div className="col-md-9 col-sm-8">
                        <div className={classes['switchorderlist']}>Order Listing {orderCount > 0 ? `${orderCount}` : ''}</div>
                        <div className="table-responsive">
                            <div className={`${classes.pro} ${classes.scrolls}`}>
                                <tbody>
                                    <th>Sr No.</th>
                                    <th>Order No.</th>
                                    <th>Pg ref no.</th>
                                    <th>order date</th>
                                    <th>total amount</th>
                                    <th>order status</th>
                                    <th>payment status</th>
                                    <th>view</th>

                                    {/* <tr>
                                        <td>1</td>
                                        <td>AG-AB-202405-2983</td>
                                        <td>AG-AB-PG-202405-5690</td>
                                        <td>04-05-2024</td>
                                        <td>Rs. 1</td>
                                        <td>
                                            <center>
                                                <span className={`${classes.label} ${classes['label-primary']}`}>pending</span>
                                            </center>
                                        </td>
                                        <td>
                                        <center>
                                                <span className={`${classes.label} ${classes['label-success']}`}>pending</span>
                                            </center>
                                        </td>
                                        <td>
                                        <center>
                                                <span><VisibilityIcon/></span>
                                        </center>
                                        </td>
                                    </tr> */}
                                    {
                                         orders?.map((order, index)=>{
                                            return (
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{order.orderno}</td>
                                                <td>{order.pgrefno}</td>
                                                <td>{order.orderdate}</td>
                                                <td>Rs. {order.orderdate}</td>
                                                <td>
                                                    <center>
                                                        <span className={`${classes.label} ${classes['label-primary']}`}>{order.orderstatus}</span>
                                                    </center>
                                                 </td>
                                                <td>
                                                    <center>
                                                            <span className={`${classes.label} ${classes['label-success']}`}>{order.paymentstatus}</span>
                                                    </center>
                                                </td>
                                                <td>
                                                    <center>
                                                            <span><VisibilityIcon/></span>
                                                    </center>
                                                 </td>
                                            </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default OrderPage