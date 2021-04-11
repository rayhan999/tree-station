import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { UserContext } from '../../App';
import { Link, useHistory } from "react-router-dom";
import Spinner from '../Spinner/Spinner';

const CheckOut = () => {
    const { id } = useParams();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [selectedProduct, setSelectedProduct] = useState([]);
    const history = useHistory();
    useEffect(() => {
        fetch(`https://rocky-falls-32573.herokuapp.com/products/${id}`)
            .then(res => res.json())
            .then(data => setSelectedProduct(data))
    }, [id])
    // console.log(new Date().toLocaleString());

    const handleCheckOut = () => {
        // console.log(data);
        const eventData = {
            name: selectedProduct.name,
            price: selectedProduct.price,
            imageURL: selectedProduct.imageURL,
            email: loggedInUser.email,
            date: new Date().toLocaleString(),

        };
        // console.log(eventData);
        const url = `https://rocky-falls-32573.herokuapp.com/addCheckOut`;

        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(eventData)
        })
            .then(res => console.log('server side response', res))
            .then(res => history.replace({ pathname: "/orders" }))

    };
    return (
        <div className='container mb-5 mt-5 pt-5' >
            {
                selectedProduct.length === 0 && <Spinner></Spinner>
            }
            {/* <Header></Header> */}
            {/* <h1>{id}</h1>
            <h1>{loggedInUser.email}</h1>
            <h1>{selectedProduct.name}</h1> */}
            <br />
            {
                selectedProduct.length !== 0 &&
                <div>
                    <table class="table table-striped text-center">
                        <thead>
                            <tr style={{ backgroundColor: 'rgb(252, 97, 7)', color: 'white' }}>
                                <th scope="col">Name</th>
                                <th scope="col">Price</th>
                                <th scope="col">Image</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{selectedProduct.name}</td>
                                <td>{selectedProduct.price}</td>
                                <td>
                                    <img src={selectedProduct.imageURL} className="card-image m-auto" style={{ display: 'flex', height: '100px', width: '100px' }} alt="" />
                                </td>

                            </tr>
                        </tbody>
                    </table>
                    <button className="btn btn-success float-right text-bold" style={{ backgroundColor: 'rgb(252, 97, 7)', color: 'white', border: 'none' }} onClick={handleCheckOut}>CheckOut</button>
                </div>
            }
        </div>
    );
};

export default CheckOut;