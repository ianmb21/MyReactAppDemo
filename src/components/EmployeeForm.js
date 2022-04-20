import React, { useState, useEffect, useRef } from "react";
import { Grid, TextField, withStyles, FormControl, InputLabel, Select, MenuItem, Button, FormHelperText } from "@material-ui/core";
import useForm from "../hooks/useEmployeeForm";
import { connect } from "react-redux";
import * as actions from "../actions/employee";
import {logout} from "../actions/login";
import { useToasts } from "react-toast-notifications";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            minWidth: 230,
        }
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 230,
    },
    smMargin: {
        margin: theme.spacing(1)
    }
})

const initialFieldValues = {
    fullName: '',
    mobile: '',
    email: '',
    age: '',
    position: '',
    address: ''
}

const EmployeeForm = ({ classes, ...props }) => {

    //toast msg.
    const { addToast } = useToasts()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.userLogin.user)

    //validate
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('fullName' in fieldValues)
            temp.fullName = fieldValues.fullName ? "" : "This field is required."
        if ('mobile' in fieldValues)
            temp.mobile = fieldValues.mobile ? "" : "This field is required."
        if ('position' in fieldValues)
            temp.bloodGroup = fieldValues.position ? "" : "This field is required."
        if ('email' in fieldValues)
            temp.email = (/^$|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues, validate, props.setCurrentId)

    //material-ui select
    const inputLabel = useRef(null);
    const [labelWidth, setLabelWidth] = useState(0);
    useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    useEffect(() => {
        if (!user) {
            navigate("/")
        }
    })

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            const onSuccess = () => {
                resetForm()
                addToast("Submitted successfully", { appearance: 'success' })
            }
            if (props.currentId == 0)
                props.createEmployee(values, onSuccess)
            else
                props.updateEmployee(props.currentId, values, onSuccess)
        }
    }

    useEffect(() => {
        if (props.currentId != 0) {
            setValues({
                ...props.employeeList.find(x => x.id == props.currentId)
            })
            setErrors({})
        }
    }, [props.currentId])

    const handleLogout = () => {
        dispatch(logout())
    }

    return (
        <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <TextField
                        name="fullName"
                        variant="outlined"
                        label="Full Name"
                        value={values.fullName}
                        onChange={handleInputChange}
                        {...(errors.fullName && { error: true, helperText: errors.fullName })}
                    />
                    <TextField
                        name="email"
                        variant="outlined"
                        label="Email"
                        value={values.email}
                        onChange={handleInputChange}
                        {...(errors.email && { error: true, helperText: errors.email })}
                    />
                    <FormControl variant="outlined"
                        className={classes.formControl}
                        {...(errors.position && { error: true })}
                    >
                        <InputLabel ref={inputLabel}>Position</InputLabel>
                        <Select
                            name="position"
                            value={values.position}
                            onChange={handleInputChange}
                            labelWidth={labelWidth}
                        >
                            <MenuItem value="">Select Position</MenuItem>
                            <MenuItem value="Developer">Developer</MenuItem>
                            <MenuItem value="Manager">Manager</MenuItem>
                        </Select>
                        {errors.position && <FormHelperText>{errors.position}</FormHelperText>}
                    </FormControl>
                </Grid>
                <Grid item xs={6}>

                    <TextField
                        name="mobile"
                        variant="outlined"
                        label="Mobile"
                        value={values.mobile}
                        onChange={handleInputChange}
                        {...(errors.mobile && { error: true, helperText: errors.mobile })}
                    />
                    <TextField
                        name="age"
                        variant="outlined"
                        label="Age"
                        value={values.age}
                        onChange={handleInputChange}
                    />
                    <TextField
                        name="address"
                        variant="outlined"
                        label="Address"
                        value={values.address}
                        onChange={handleInputChange}
                    />
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            className={classes.smMargin}
                        >
                            Submit
                        </Button>
                        <Button
                            variant="contained"
                            className={classes.smMargin}
                            onClick={resetForm}
                        >
                            Reset
                        </Button>
                        {/* <Button
                            variant="contained"
                            className={classes.smMargin}
                            onClick={handleLogout}
                        >
                            Logout
                        </Button> */}
                    </div>
                </Grid>
            </Grid>
        </form>
    );
}


const mapStateToProps = state => ({
    employeeList: state.employee.list
})

const mapActionToProps = {
    createEmployee: actions.create,
    updateEmployee: actions.update
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(EmployeeForm));