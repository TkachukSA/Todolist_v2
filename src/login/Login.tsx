import React from 'react'
import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, TextField, Button, Grid} from '@material-ui/core'
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {loginTC} from "./auth-reducer";
import {AppRootStateType} from "../app/store";
import { Redirect } from 'react-router-dom';

export const Login = () => {

    const isLiginIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch=useDispatch()



    const formik = useFormik({
        validate: (values)=>{
            if(!values.email){
                return {
                    email: 'email is reqired'
                }
            }
            if (!values.password) {
                return {
                    password: 'password is reqired'
                }
            }
        },

        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        onSubmit: values => {
            dispatch(loginTC(values));
        },

    })
    if(isLiginIn){
        return  <Redirect to={'/'}/>
    }
    return <Grid container justify="center">
        <Grid item xs={4}>
            <form onSubmit={formik.handleSubmit}>
            <FormControl>
                <FormLabel>
                    <p>To log in get registered
                        <a href={'https://social-network.samuraijs.com/'}
                           target={'_blank'}>here
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
                        {...formik.getFieldProps('email')}
                    />

                    { formik.errors.email? <div style={{color: 'red'}}>{formik.errors.email}</div>: null}
                    <TextField
                        type="password"
                        label="Password"
                        margin="normal"
                        {...formik.getFieldProps('password')}
                    />
                    { formik.errors.password? <div style={{color: 'red'}}>{formik.errors.password}</div>: null}
                    <FormControlLabel
                        label={'Remember me'}
                        control={<Checkbox
                            checked={formik.values.rememberMe}
                            {...formik.getFieldProps('rememberMe')}
                        />}
                    />
                    <Button type={'submit'} variant={'contained'} color={'primary'}>Login</Button>
                </FormGroup>

            </FormControl>
            </form>
        </Grid>
    </Grid>
}
