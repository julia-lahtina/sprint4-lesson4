import React from 'react'
import Grid from '@mui/material/Grid'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useFormik } from 'formik'
import { dividerClasses } from '@mui/material'

type ErrorsType = {
    email?: string,
    password?: string
}

export const Login = () => {

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validate: (values) => {
            const errors: ErrorsType = {};
            const isNotValid = !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email);

            if (!values.email.length) {
                errors.email = 'Required'
            } else if (isNotValid) {
                errors.email = 'email is not valid'
            }

            if (!values.password) {
                errors.password = 'Required'
            } else if (values.password.length < 5) {
                errors.password = 'the password should be longer then 4 symbols'
            }

            return errors;
        },
        onSubmit: values => {
            alert(JSON.stringify(values))
        },
    })

    console.log(formik.errors)

    return (
        <Grid container justifyContent={'center'}>
            <Grid item justifyContent={'center'}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormLabel>
                            <p>
                                To log in get registered
                                <a href={'https://social-network.samuraijs.com/'} target={'_blank'}>
                                    here
                                </a>
                            </p>
                            <p>or use common test account credentials:</p>
                            <p>Email: free@samuraijs.com</p>
                            <p>Password: free</p>
                        </FormLabel>
                        <FormGroup>
                            <TextField
                                label="Email"
                                margin="normal"
                                name='email'
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                error={!!formik.errors.email}
                            />
                            {formik.errors.email && <div style={{ 'color': 'red' }}>{formik.errors.email}</div>}
                            <TextField
                                type="password"
                                label="Password"
                                margin="normal"
                                name='password'
                                onChange={formik.handleChange}
                                value={formik.values.password}
                                error={!!formik.errors.password}
                            />
                            {formik.errors.password && <div style={{ 'color': 'red' }}>{formik.errors.password}</div>}
                            <FormControlLabel
                                label={'Remember me'}
                                name='rememberMe'
                                control={<Checkbox />}
                                onChange={formik.handleChange}
                                checked={formik.values.rememberMe}
                            />
                            <Button type={'submit'} variant={'contained'} color={'primary'}>
                                Login
                            </Button>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Grid>

    )
}