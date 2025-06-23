import { db } from '../firebase/config'; 

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from 'firebase/auth'

import { useState, useEffect } from 'react'

export const useAuthentication = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    // cleanup
    // deal with memory leak
    const [cancelled, setCancelled] = useState(false);

    const auth = getAuth();

    function checkIfIsCancelled() {
        if (cancelled) {
            return;
        }
    }

    const createUser = async (data) => {
        checkIfIsCancelled();

        setError(null);
        setLoading(true);

        try {
            const {user} = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );

            await updateProfile(user, {
                displayName: data.displayName
            });

            setLoading(false);

            return user;
        } catch (error) {
            console.log(error.message);
            console.log(typeof error.message);

            let errorMessage;

            if (error.message.includes('Password')) {
                errorMessage = "A senha precisa conter pelo menos 6 caractéres."
            } else if (error.message.includes('email-already')) {
                errorMessage = "E-mail já cadastrado."
            }else {
                errorMessage = "Ocorreu um erro inesperado, por favor tente novamente mais tarde."
            }

            setError(errorMessage);
            setLoading(false);
        }        
    };

    // Login
    const login = async (data) => {
        checkIfIsCancelled();

        setLoading(true);
        setError(false);

        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);
            setLoading(false);
        } catch (error) {
            let errorMessage;
           
            if (error.message.includes('user-not-found')) {
                errorMessage = "Usuário não encontrado."
            } else if (error.message.includes('wrong-password') || error.message.includes('invalid-credential')) {
                errorMessage = "E-mail ou senha está incorreto."
            }else {
                errorMessage = "Ocorreu um erro inesperado, por favor tente novamente mais tarde."
            }

            setError(errorMessage);
            setLoading(false);
        }
    }

    // Logout User
    const logout = () => {
        checkIfIsCancelled();

        signOut(auth);
    }

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return {
        auth,
        error,
        loading,
        createUser,
        login,
        logout,
    }

}