import React, { useEffect } from "react"
import { Button, Card, CardContent, TextField, Typography } from "@material-ui/core"
import { useNavigate } from "react-router"
import * as actions from "../actions/login";
import useForm from "../hooks/useLoginForm";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "react-redux";

const initialUserState = () => ({
    username: '',
    password: ''
})

/* const Login = ({ classes, ...props }) => { */
export default function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        user
    } = useForm(initialUserState);

    const handleLogin = e => {
        e.preventDefault();
        if (validateFields())
        console.log(values);
            const { username, password } = user;

            dispatch(
            actions.login(username, password)
            )
            .then(() => {
                const loggedInUser = JSON.parse(localStorage.getItem('user'));
        
                navigate(`/Employee`);
            })
            .catch(() => {
                //setLoading(false);
            });
    }

    const validateFields = () => {
        let temp = {}
        temp.username = values.username != "" ? "" : "This field is required."
        temp.password = values.password != "" ? "" : "This field is required."
        setErrors(temp)
        return Object.values(temp).every(x => x == "")
    }

    return (
            <Card sx={{ width: 400 }}>
                <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" sx={{ my: 3 }}>
                        Login
                    </Typography>
                        <form noValidate autoComplete="off" onSubmit={handleLogin}>
                            <TextField
                                label="Username"
                                name="username"
                                value={values.username}
                                onChange={handleInputChange}
                                variant="outlined"
                                {...(errors.username && { error: true, helperText: errors.username })} />
                            <TextField
                                label="Password"
                                name="password"
                                type='password'
                                value={values.password}
                                onChange={handleInputChange}
                                variant="outlined"
                                {...(errors.password && { error: true, helperText: errors.password })} />
                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                sx={{ width: '90%' }}>Submit</Button>
                        </form>
                </CardContent>
            </Card>


    )
}

/* const mapStateToProps = state => ({
    loggedUser: state.login.user
}) */

/* const mapActionToProps = {
    loginUser: actions.login,
    logoutUser: actions.logout
}

export default connect(mapStateToProps, mapActionToProps)(Login); */