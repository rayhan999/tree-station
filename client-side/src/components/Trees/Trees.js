import React from 'react';
import { Link } from 'react-router-dom';

const Trees = ({ event }) => {

    return (

        <div className="col mt-3">
            <div className="card panda-card-item h-100 shadow p-3 bg-white rounded border-0">
                <img src={event.imageURL} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h1 className="card-title" style={{ color: 'rgb(252, 97, 7)' }}>{event.name}</h1>

                </div>
                <div
                    className="card-footer  border-top-0 bg-white panda-card-footer d-flex justify-content-between">
                    <h5 id="price">$ {event.price}</h5>
                    <Link to={`/checkout/${event._id}`} >
                        <button className="btn" style={{ backgroundColor: 'rgb(252, 97, 7)', color: 'white' }}>Buy Now
                             </button>
                    </Link>
                </div>
            </div>
        </div >

    );
};

export default Trees;