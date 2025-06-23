import { useState, useEffect, useReducer } from 'react'
import { db } from '../firebase/config'
import { collection, addDoc, Timestamp } from 'firebase/firestore'

const initialState = {
    loading: null,
    error: null,
}

const insertReducer = (state, action) => {
    switch (action.type) {
        case "LOADING":            
            return {loading: true, error: null};
        case "INSERTED_POST":            
            return {loading: false, error: null};
        case "ERROR":            
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

export const useInsertPost = (docCollection) => {

    const [response, dispatch] = useReducer(insertReducer, initialState);

    // deal with memory leak
    const [cancelled, setCancelled] = useState(false);

    const checkCancelBeforeDispatch = (action) => {
        if (!cancelled) {
            dispatch(action);
        }
    }

    const insertPost = async (postData) => {
        checkCancelBeforeDispatch({
            type: 'LOADING'
        });

        try {
            const newPost = {
                ...postData,
                createdAt: Timestamp.now()
            };

            const insertedPost = await addDoc(
                collection(db, docCollection),
                newPost
            );

            checkCancelBeforeDispatch({
                type: 'INSERTED_POST',
                payload: insertedPost
            });
        } catch (error) {
            
            checkCancelBeforeDispatch({
                type: 'ERROR',
                payload: error.message
            });
        }
    }

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return { insertPost, response };
}