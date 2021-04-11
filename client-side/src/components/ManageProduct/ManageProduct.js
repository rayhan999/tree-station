import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ProductTable from '../ProductTable/ProductTable';
import { useHistory } from "react-router-dom";
import Sidebar from '../Sidebar/Sidebar';
import Spinner from '../Spinner/Spinner';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        marginBottom: '10px'
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));


const ManageProduct = () => {
    const history = useHistory();
    const classes = useStyles();
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetch('https://rocky-falls-32573.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setEvents(data))
    }, [])
    return (
        <div className={classes.root}>
            <Sidebar></Sidebar>
            < main className={classes.content} >
                <h1>Manage Products</h1>
                <br />
                <table class="table table-striped text-center">
                    <thead>
                        <tr style={{ backgroundColor: 'rgb(252, 97, 7)', color: 'white' }}>
                            <th scope="col">Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>

                    {
                        events.length === 0 && <Spinner></Spinner>
                    }
                    {
                        events.map(event => <ProductTable event={event}></ProductTable>)
                    }

                </table>


            </main >
        </div>
    );
};

export default ManageProduct;