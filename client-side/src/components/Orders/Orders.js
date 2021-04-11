import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../App';
import OrderCard from '../OrderCard/OrderCard';
import Spinner from '../Spinner/Spinner';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    useEffect(() => {
        fetch(`https://rocky-falls-32573.herokuapp.com/orders?email=` + loggedInUser.email)
            .then(res => res.json())
            .then(data => setOrders(data))
    }, [loggedInUser.email])
    return (
        <div className="container mb-5 mt-5 pt-5">
            {/* <Header></Header> */}
            <h1>Order History</h1>
            {
                orders.length === 0 && <Spinner></Spinner>
            }
            <p>Total {orders.length} orders</p>
            {/* <div className="card mb-3" style={{ maxWidth: '540px' }}> */}
            <div className="row row-cols-1 row-cols-md-3  d-flex justify-content-center" >
                {
                    orders.map(order => <OrderCard order={order}></OrderCard>)
                }

            </div >
        </div >
        // </div >
    );
};

export default Orders;