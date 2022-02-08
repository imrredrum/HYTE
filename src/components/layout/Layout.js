import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Fab,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  useScrollTrigger,
  Zoom,
} from '@mui/material'
import {
  KeyboardArrowUp as KeyboardArrowUpIcon,
  Menu as MenuIcon,
} from '@mui/icons-material'
import _ from 'lodash'
import { useContext, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Logo } from '/src/assets/svgs'
import { AuthContext } from '/src/context'
import style from './Layout.module.scss'
import { useRouter } from 'next/router'

const User = () => {
  const [anchorElUser, setAnchorElUser] = useState(null)

  const handleOpenUserMenu = e => setAnchorElUser(e.currentTarget)

  const handleCloseUserMenu = () => setAnchorElUser(null)

  const { auth, dispatch } = useContext(AuthContext)
  const router = useRouter()

  const logout = () => dispatch({ type: 'CLEAR' })

  return _.get(auth, 'isAuthed', false) ? (
    <>
      <Tooltip title='User settings'>
        <>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar
                sx={{ width: 32, height: 32, mr: 1 }}
                alt={`${_.get(auth, ['user', 'first_name'], '')} ${_.get(
                  auth,
                  ['user', 'last_name'],
                  ''
                )}`}
                src={_.get(auth, ['user', 'cover'], '')}
              />
            </IconButton>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Button onClick={handleOpenUserMenu}>
              <Avatar
                sx={{ width: 32, height: 32, mr: 1 }}
                alt={`${_.get(auth, ['user', 'first_name'], '')} ${_.get(
                  auth,
                  ['user', 'last_name'],
                  ''
                )}`}
                src={_.get(auth, ['user', 'cover'], '')}
              />
              {_.get(auth, ['user', 'first_name'], '')}{' '}
              {_.get(auth, ['user', 'last_name'], '')}
            </Button>
          </Box>
        </>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem
          onClick={() => {
            logout()
            handleCloseUserMenu()
          }}
        >
          <Typography textAlign='center'>logout</Typography>
        </MenuItem>
      </Menu>
    </>
  ) : (
    <Link
      href={{
        pathname: '/login',
        query: { redirect: router.pathname },
      }}
      passHref
    >
      <Button sx={{ display: 'block' }} component='a' className={style.button}>
        Login
      </Button>
    </Link>
  )
}

const Header = props => {
  const [anchorElNav, setAnchorElNav] = useState(null)

  const handleOpenNavMenu = e => {
    setAnchorElNav(e.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  return (
    <AppBar position='sticky' {...props}>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Link href='/' title='HYTE' passHref>
            <Box
              className={style.logo}
              component='a'
              sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            >
              <Logo />
            </Box>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Link href='/products' passHref>
                  <Typography textAlign='center' component='a'>
                    Products
                  </Typography>
                </Link>
              </MenuItem>
            </Menu>
          </Box>

          <Link href='/' title='HYTE' passHref>
            <Box
              className={style.logo}
              component='a'
              sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            >
              <Logo />
            </Box>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Link href='/products' passHref>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, display: 'block' }}
                component='a'
                className={style.button}
              >
                Products
              </Button>
            </Link>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <User />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

const ScrollTop = ({ children, ...rest }) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  })

  const handleClick = () =>
    window.scroll({
      top: 0,
      behavior: 'smooth',
    })

  return (
    <Zoom in={trigger} {...rest}>
      <Box onClick={handleClick} role='presentation'>
        {children}
      </Box>
    </Zoom>
  )
}

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>HYTE</title>
        <meta
          name='description'
          content='Welcome to HYTE - Your Store for Custom PC Cases, PC Gaming Accessories, and more. Because Building a PC Should Be FUN'
        />
      </Head>
      <Header className={style.header} />
      <Container component='main' className={style.main} maxWidth='xl'>
        {children}
      </Container>
      <footer className={style.footer}>copyright © RuM. 2022</footer>
      <ScrollTop className={style.scrollTop}>
        <Fab color='secondary' size='small'>
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </>
  )
}

export default Layout
