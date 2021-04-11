import React from 'react';

const OrderCard = ({ order }) => {
    return (
        <div className="col mt-3">
            <div className="card panda-card-item h-100 shadow p-3 bg-white rounded border-0">
                <img src={order.imageURL} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h1 className="card-title" style={{ color: 'rgb(252, 97, 7)' }}>{order.name}</h1>
                    {/* <h5 id="price">$ {order.price}</h5>
                    <h5 id="date">Purchase Date: <br />{order.date}</h5> */}
                    <table>
                        {/* <tr>
                            <td>Name</td>
                            <td>:</td>
                            <td>{order.name}</td>

                        </tr> */}
                        <tr>
                            <td>Price</td>
                            <td>:</td>
                            <td>{order.price}</td>

                        </tr>
                        <tr>
                            <td>Purchase Date</td>
                            <td>:</td>
                            <td>{order.date}</td>
                        </tr>
                    </table>
                </div>
                <div
                    className="card-footer  border-top-0 bg-white panda-card-footer d-flex justify-content-between">


                </div>
            </div>
        </div >
    );
};

export default OrderCard;