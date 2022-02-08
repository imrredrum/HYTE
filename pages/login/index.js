import { LockOutlined as LockOutlinedIcon } from '@mui/icons-material'
import { Avatar, Box, Button, TextField, Typography } from '@mui/material'
import _ from 'lodash'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import { API_BASE } from '/config'
import { AuthContext } from '/src/context'

const Login = () => {
  const router = useRouter()
  const { auth, dispatch } = useContext(AuthContext)

  useEffect(() => {
    if (_.get(auth, 'isAuthed', false))
      router.replace(_.get(router, ['query', 'redirect'], '/'))
  }, [auth, router])

  const setUser = res => {
    dispatch({
      type: 'UPDATE',
      value: {
        isAuthed: true,
        user: {
          id: _.get(res, ['user', 'id'], 0),
          email: _.get(res, ['user', 'email'], ''),
          first_name: _.get(res, ['user', 'first_name'], ''),
          last_name: _.get(res, ['user', 'last_name'], ''),
        },
      },
    })
  }

  const handleSubmit = event => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    fetch(`${API_BASE}/user/login`, {
      method: 'POST',
      body: JSON.stringify({
        user: {
          email: data.get('email'),
          password: data.get('password'),
        },
      }),
    })
      .then(res => res.json())
      // without CORS support, this will never work
      .then(res => setUser(res))
      .catch(error => console.error('Error:', error))
  }

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography variant='h5'>Sign in</Typography>
      <Box component='form' onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          margin='normal'
          required
          fullWidth
          name='email'
          label='Email Address'
          type='email'
          id='email'
          autoComplete='email'
          autoFocus
        />
        <TextField
          margin='normal'
          required
          fullWidth
          name='password'
          label='Password'
          type='password'
          id='password'
          autoComplete='current-password'
        />
        <Button
          fullWidth
          type='submit'
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
      </Box>
    </Box>
  )
}

export default Login
