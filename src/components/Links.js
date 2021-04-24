import React, { useEffect, useState } from "react";
import LinkForm from "./LinksForm";
import { toast } from "react-toastify";
import {db} from "../config/firebase";

const Links = () => {
    const [links, setLinks] = useState( [] );
    const [currentId, setCurrentId] = useState('');

    const addOrEdditLinks = async (linkObjet) => {
        if(currentId === ''){
            await db.collection('links').doc().set(linkObjet);
            toast('New link added', {
                type:"success",
                autoClose: 1500
            });
        }else{
            await db.collection('links').doc(currentId).update(linkObjet);
            toast('Link updated successfully', {
                type:"info",
                autoClose: 1500
            });
            setCurrentId('');
        }
    };

    const onDeleteLink = async(id) => {
        if (window.confirm('are you sure you want to delete this link?')){
            await db.collection('links').doc(id).delete();
            toast('Link delete successfully', {
                type:"error",
                autoClose: 1500
            });
        }
    };

    const getLinks = () => {
        db.collection('links').onSnapshot((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach((doc) => {
                docs.push({...doc.data(), id:doc.id});
            });
            setLinks(docs);
        });
    };

    useEffect ( () => {
        getLinks();
    },[])
     

    return(
        <div>
            <div className="col-md-8 p-2">
                <LinkForm {...{addOrEdditLinks, currentId, links}}/>
            </div>
            <div className="col-md-8 p-2">
                {links.map((link) => (
                    <div className="card mb-1" key={link.id}>
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <h4>{link.name}</h4>
                                <div>
                                    <i className="material-icons text-danger" onClick={() => onDeleteLink(link.id)}>close</i>
                                    <i className="material-icons" onClick={() => setCurrentId(link.id)}>create</i>
                                </div>                                
                            </div>
                            <p>{link.description}</p>
                            <a href={link.url} target="_blank">
                                Go to the website
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default Links;