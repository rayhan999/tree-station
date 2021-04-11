import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Link, useHistory } from "react-router-dom";


const ProductTable = ({ event }) => {
    const [deleted, setDeleted] = useState(false);
    let history = useHistory();
    console.log({ event });
    const deleteEvent = (id) => {
        // console.log(e);
        console.log(id)
        const url = `https://rocky-falls-32573.herokuapp.com/deleteProduct/${id}`;
        console.log(url)
        fetch(url, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => setDeleted(true))
        // .then(res => history.replace({ pathname: "/admin" }))
    }

    return (
        <tbody>

            {
                !deleted &&
                <tr>
                    <td>{event.name}</td>
                    <td>{event.price}</td>
                    <td>
                        <div class="btn-group">
                            <button className="btn btn-success">
                                <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                            </button>
                            <button className="btn btn-danger" onClick={() => deleteEvent(event._id)}>
                                <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                            </button>
                        </div>
                    </td>
                </tr>

            }


        </tbody>


    );
};

export default ProductTable;