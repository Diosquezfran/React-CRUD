import React, { useEffect, useState } from "react";
import { db } from "../config/firebase";


const LinkForm = ({addOrEdditLinks, currentId, links}) => {
    const initialValues = {
        url: '',
        name: '',
        description: ''
    };
    const [values, setValues] = useState(initialValues);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name] : value
        })
    };

    const handleOnSubmit = (e) => {
        e.preventDefault(e);
        addOrEdditLinks(values);
        setValues({...initialValues});
    };

    const getLinkById = async (id) => {
        const doc = await db.collection('links').doc(id).get();
        setValues({...doc.data()});
    };

    useEffect(()=>{
        if(currentId === ''){
            setValues({...initialValues});
        }else{
            getLinkById(currentId);
        }
    },[currentId])

    return(
        <form className="card card-body" onSubmit={handleOnSubmit}>
            <div className="from-group input-group">
                <div className="input-group-text bg-light mb-1">
                    <i className="material-icons">insert_link</i>
                </div>
                <input
                    onChange={handleInputChange}
                    type="text"
                    className="form-control"
                    placeholder="https://someurl.com"
                    name="url"
                    value={values.url}
                />
            </div> 

            <div className="from-group input-group">
                <div className="input-group-text bg-light mb-1">
                    <i className="material-icons">create</i>
                </div>
                <input
                    onChange={handleInputChange}
                    type="text"
                    className="form-control"
                    placeholder="Website name"
                    name="name"
                    value={values.name}
                />
            </div>
            <div className="form-group">
                <textarea
                   onChange={handleInputChange}
                    name="description"
                    rows="3"
                    className="from-control"
                    placeholder="Write a description"
                    value={values.description}>
                </textarea>
            </div>
            <button className="btn btn-primary btn-block">
                {currentId === '' ? "Save" : "Update"}
            </button>
        </form>
    )
};

export default LinkForm;