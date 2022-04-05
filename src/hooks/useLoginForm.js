import { useState } from "react";

export default function useForm(initialUserState) {

    const [values, setValues] = useState(initialUserState());
    const [errors, setErrors] = useState({});
    const [user, setUser] = useState(initialUserState)

    const handleInputChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
        setUser({...user, [name]: value })
    }

    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        user
    }
}