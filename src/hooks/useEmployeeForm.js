import { SettingsInputSvideoRounded } from "@material-ui/icons";
import userEvent from "@testing-library/user-event";
import React, { useState, useEffect } from "react";

const useForm = (initialFieldValues, validate, setCurrentId, initialUserState) => {
    const [values, setValues] = useState(initialFieldValues)
    const [errors, setErrors] = useState({})
    const [user, setUser] = useState(initialUserState)

    const handleInputChange = e => {
        const { name, value } = e.target
        const fieldValue = { [name]: value }
        setValues({
            ...values,
            ...fieldValue
        })
        validate(fieldValue)
        setUser({...user, [name]: value })
    }

    const resetForm = () => {
        setValues({
            ...initialFieldValues
        })
        setErrors({})
        setCurrentId(0)
    }

    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm,
        user
    };
}

export default useForm;