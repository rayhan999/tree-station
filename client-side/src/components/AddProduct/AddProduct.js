import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { useForm } from "react-hook-form";
import Sidebar from '../Sidebar/Sidebar';
import Spinner from '../Spinner/Spinner';


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



const AddProduct = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [imageURL, setIMageURL] = useState(null);
    const [imageUploadTime, setImageUploadTime] = useState(false);
    const [insertSuccess, setInsertSuccess] = useState(false);
    const classes = useStyles();
    const handleFocus = (e) => {
        setInsertSuccess(false);

    }
    const onSubmit = data => {
        console.log(data);
        if (imageURL === null) {
            console.log('imageNull');
        } else {
            const eventData = {
                name: data.name,
                price: data.price,
                imageURL: imageURL
            };
            const url = `https://rocky-falls-32573.herokuapp.com/addProduct`;

            fetch(url, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(eventData)
            })
                .then(res => setInsertSuccess(true))
                .then(res => console.log('server side response', res))
        }
    };

    const handleImageUpload = event => {
        setImageUploadTime(true);
        console.log(event.target.files[0])
        const imageData = new FormData();
        imageData.set('key', '8890e04aeed687254767ab4f9796be5a');
        imageData.append('image', event.target.files[0]);

        axios.post('https://api.imgbb.com/1/upload',
            imageData)
            .then(function (response) {
                console.log(response.data.data.display_url);
                setImageUploadTime(false);
                setIMageURL(response.data.data.display_url);
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    return (
        <div className={classes.root}>
            <Sidebar></Sidebar>
            < main className={classes.content} >
                <h1 className="mt-5">Add Products</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <input className="form-control" name="name" id="pdName" placeholder="Name" ref={register} onFocus={handleFocus} />
                    </div>
                    <div className="mb-3">
                        <input className="form-control" name="price" id="price" placeholder="Price" ref={register} onFocus={handleFocus} />
                    </div>

                    <div className="mb-3">
                        <input type="file" name="image" className="form-control" id="image" onChange={handleImageUpload} />
                    </div>
                    {
                        imageUploadTime ? <Spinner></Spinner>
                            :

                            <input type="submit" className="btn  btn-block" value='Add Product' style={{ backgroundColor: 'rgb(252, 97, 7)', color: 'white' }} />
                    }
                </form>
                {
                    insertSuccess && <p className="text-success">Product Inserted Successfully</p>
                }
            </main >

        </div>

    );
};

export default AddProduct;