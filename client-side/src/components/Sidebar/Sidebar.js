import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AddBoxIcon from '@material-ui/icons/AddBox';
import BorderColorSharpIcon from '@material-ui/icons/BorderColorSharp';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withRouter } from "react-router-dom";



const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({

    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
    }
}));

const Sidebar = props => {
    // console.log(props);
    const { history } = props;
    const classes = useStyles();
    const itemsList = [
        {
            text: "Dashboard",
            icon: <DashboardIcon />,
            onClick: () => history.push("/admin")
        },
        {
            text: "Add Product",
            icon: <AddBoxIcon />,
            onClick: () => history.push("/admin/addProduct")
        },
        {
            text: "Manage Product",
            icon: <BorderColorSharpIcon />,
            onClick: () => history.push("/admin/manageProduct")
        }
    ];
    return (
        <div>
            <CssBaseline />
            {/* <Header position="fixed" className={classes.appBar}></Header> */}
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <List>
                    {itemsList.map((item, index) => {
                        const { text, icon, onClick } = item;
                        return (
                            <ListItem button key={text} onClick={onClick}>
                                {icon && <ListItemIcon>{icon}</ListItemIcon>}
                                <ListItemText primary={text} />
                            </ListItem>
                        );
                    })}
                </List>
            </Drawer>
        </div>
    );
};

export default withRouter(Sidebar);