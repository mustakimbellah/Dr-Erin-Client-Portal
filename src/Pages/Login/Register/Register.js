import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import useTitle from '../../../hooks/useTitle';

const Register = () => {

    const { createUser, updateUserProfile } = useContext(AuthContext);

    const [error, setError] = useState("");

    useTitle('Register')

    const handleUpdateProfile = (name, photoURL) => {
        const profile = {
            displayName: name,
            photoURL: photoURL
        }
        updateUserProfile(profile)
            .then(() => { })
            .catch(error => console.error(error))
    }

    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const UserPhotoURL = form.UserPhotoURL.value;
        const email = form.email.value;
        const password = form.password.value;
        createUser(email, password)
            .then(result => {
                setError('');
                form.reset();
                handleUpdateProfile(name, UserPhotoURL);
            })
            .catch(error => {
                setError(error.message);
            });
    }

    return (
        <div className='container w-50'>
            <h2 className='text-center text-dark mb-3 fw-bolder'>Register</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control type='text' name='name' placeholder="Full Name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Photo URL</Form.Label>
                    <Form.Control type="text" name='UserPhotoURL' placeholder="Photo URL" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name='email' placeholder="Enter email" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name='password' placeholder="Password" />
                </Form.Group>
                <Button className="w-100 mb-5" variant="primary" type="submit">
                    Register
                </Button>
                <br />
                <strong className='text-danger'>{error}</strong>

                <p className='mb-5'>Already have an account? <Link to={'/login'}>Sign In</Link></p>

            </Form>
        </div>
    );
};

export default Register;