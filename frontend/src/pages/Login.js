import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useUserDetails } from '../context/UserContext';
import { Redirect, useLocation } from 'react-router';

const useStyles = makeStyles({
    root: {
        height: '100vh',
        display: 'grid',
        placeItems: 'center',
    },
    card: {
        width: '450px',
        height: '40%',
        display: 'grid',
        gridAutoRows: '1fr 4fr',
        '&>*': {
            width: '100%',
        },
    },
    header: {
        display: 'grid',
        placeItems: 'center',
    },
    form: {
        display: 'grid',
        placeItems: 'start center',
        '& > div': {
            display: 'grid',
            placeItems: 'center',
        },
    },
    input: {
        width: '300px',
        marginTop: '1.5rem',
        marginBottom: '1.5rem',
    },
    submit: {
        marginTop: '1rem',
        width: '300px',
    },
});

function Login(props) {
    const classes = useStyles();
    const [formData, setFormData] = useState({});
    const { setUserDetails } = useUserDetails();
    const [redirect, setRedirect] = useState(false);
    const { state } = useLocation();

    const onSubmit = (e) => {
        e.preventDefault();
        authenticate(formData);
    };

    const authenticate = (payload) => {
        fetch('/api/auth/login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                setUserDetails(res);
                setRedirect(true);
            })
            .catch((err) => console.log(err));
    };

    const onChange = (type, value) => {
        let newFormData = { ...formData };
        newFormData[type] = value;
        setFormData(newFormData);
    };

    if (redirect) {
        return <Redirect to={state && state.from ? state.from : '/'} />;
    }

    return (
        <div className={classes.root}>
            <Paper className={classes.card} elevation={2}>
                <div className={classes.header}>
                    <h2>ACME Dashboard Login</h2>
                </div>
                <form className={classes.form} onSubmit={onSubmit}>
                    <div>
                        <TextField
                            className={classes.input}
                            label='Username'
                            variant='outlined'
                            name='username'
                            onChange={(e) =>
                                onChange('username', e.target.value)
                            }
                            required
                        />
                        <TextField
                            className={classes.input}
                            type='password'
                            label='Password'
                            variant='outlined'
                            name='password'
                            onChange={(e) =>
                                onChange('password', e.target.value)
                            }
                            required
                        />
                        <Button
                            className={classes.submit}
                            variant='contained'
                            color='primary'
                            type='submit'
                        >
                            Submit
                        </Button>
                    </div>
                </form>
            </Paper>
        </div>
    );
}

export default Login;
