import React from 'react';
import AddProduct from '../AddProduct/AddProduct';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import AdminHome from '../AdminHome/AdminHome';
import ManageProduct from '../ManageProduct/ManageProduct';
import Home from '../Home/Home';


const Admin = props => {

    return (
        <div >



            <Router>

                <Switch>
                    <Route exact path="/">
                        <Home></Home>
                    </Route>
                    <Route exact path="/admin">
                        <AdminHome></AdminHome>
                    </Route>
                    <Route path="/admin/addProduct">
                        <AddProduct></AddProduct>
                    </Route>
                    <Route path="/admin/manageProduct">
                        <ManageProduct></ManageProduct>
                    </Route>
                </Switch>
            </Router>

        </div>
    );
};

export default Admin;