import React from 'react';

const Drawer = () => {
    return (
        <div>

            {/* <header className="bmd-layout-header">
                    <div className="navbar navbar-light bg-faded">
                        <button className="navbar-toggler" type="button" data-toggle="drawer" data-target="#dw-s1">
                            <span className="sr-only">Toggle drawer</span>
                            <i className="material-icons">menu</i>
                        </button>
                        <ul className="nav navbar-nav">
                            <li className="nav-item">Title</li>
                        </ul>
                    </div>
                </header> */}
            <div id="dw-s1" className="bmd-layout-drawer bg-faded">
                <header>
                    <a className="navbar-brand">Title</a>
                </header>
                <ul className="list-group">
                    <a className="list-group-item">Link 1</a>
                    <a className="list-group-item">Link 2</a>
                    <a className="list-group-item">Link 3</a>
                </ul>
            </div>
            {/* <main className="bmd-layout-content">
                    <div className="container">
                        <p>Main content</p>
                    </div>
                </main> */}
        </div>

    );
};

export default Drawer;