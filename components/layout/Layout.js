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
import style from './Layout.module.scss'
import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Logo } from '/assets/svgs'

const Header = props => {
  const [anchorElNav, setAnchorElNav] = useState(null)
  const [anchorElUser, setAnchorElUser] = useState(null)

  const handleOpenNavMenu = event => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
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
              id='menu-appbar'
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
            <Tooltip title='Open settings'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt='' src='' />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
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
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign='center'>logout</Typography>
              </MenuItem>
            </Menu>
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
      <footer className={style.footer}>
        copyright © RuM. all rights reserved
      </footer>
      <ScrollTop className={style.scrollTop}>
        <Fab size='small'>
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </>
  )
}

export default Layout
