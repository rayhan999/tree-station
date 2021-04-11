import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Sidebar from '../Sidebar/Sidebar';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));


const AdminHome = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Sidebar></Sidebar>
            < main className={classes.content} >
                <h1 className="mt-5">Welcome to Admin Home</h1>

            </main >
        </div>
    );
};

export default AdminHome;