import { Box, Button, Flex, FormControl, FormLabel, Input, Text, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useErrorToast } from '../shared/toast';
import useInput from '../../hook/useInput';
import useAuthStore from '../../store/useAuthStore';
import AppDivider from '../shared/AppDivider';

export default function LoginPage() {
    const { value: email, onInput: onEmailInput } = useInput('')
    const { value: password, onInput: onPasswordInput } = useInput('')
    const [submittingLogin, setSubmittingLogin] = useState(false)
    const login = useAuthStore(state => state.login)
    const errorToast = useErrorToast()
    const fetchCurrentUser = useAuthStore(state => state.fetchCurrentUser)

    const onFormSubmit = async (e) => {
        e.preventDefault()
        setSubmittingLogin(true)
        const token = await login({ email, password })
        if (!token) {
            errorToast({
                title: 'Login failed',
                description: 'Email and password do not match.',
            })
            setSubmittingLogin(false)
            return
        }
        const user = await fetchCurrentUser()
        if (!user) {
            errorToast({
                title: 'Fetch error',
                description: 'Cannot fetch login user.',
            })
            setSubmittingLogin(false)
            return
        }
        setSubmittingLogin(false)

    }

    return (
        <Flex direction='column' align='center' justifySelf='center' justify='center' width={400} mx='auto' boxShadow='xl' mt={5} p={5}>
            <Helmet title='Login' />
            <Text fontSize='3xl' fontWeight={600}>Sign In</Text>
            <Box width='100%' p={2}>
                <form onSubmit={onFormSubmit}>
                    <FormControl id="email">
                        <FormLabel>Email</FormLabel>
                        <Input type='email' value={email} onInput={onEmailInput} required />
                    </FormControl>
                    <FormControl id="password">
                        <FormLabel>Password</FormLabel>
                        <Input type='password' value={password} onInput={onPasswordInput} required />
                    </FormControl>
                    <Box height={5}></Box>
                    <Button isLoading={submittingLogin} type="submit" width='100%' colorScheme='yellow'>Sign In</Button>
                </form>
            </Box>
            <Box height={5}></Box>
            <AppDivider />
            <Box height={5}></Box>
            <Text align='center'>Don't have an account? Sign up <Link id="link2" to='/register'><Text display='inline' color='yellow.500'>here</Text></Link></Text>
        </Flex>
    )
}