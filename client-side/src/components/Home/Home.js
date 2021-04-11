import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Spinner from '../Spinner/Spinner';
import Trees from '../Trees/Trees';
import './Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";

const Home = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetch('https://rocky-falls-32573.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setEvents(data))
    }, [])
    return (
        <div className='container mb-5 mt-5 ' >
            <h1 style={{ color: 'white' }}>.</h1>
            <div class="container d-flex justify-content-center">
                <input type="text" placeholder="Search something" />
                <button id="searchbtn" type="button"><FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon></button>
            </div>
            {/* <Header></Header> */}
            {
                events.length === 0 && <Spinner></Spinner>
            }
            <div className="row row-cols-1 row-cols-md-3  d-flex justify-content-center" >


                {
                    events.map(event => <Trees event={event}></Trees>)
                }

            </div>
        </div>
    );
};

export default Home;