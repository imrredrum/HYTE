import { CacheProvider } from '@emotion/react'
import { ThemeProvider } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import Head from 'next/head'
import { Layout } from '/components'
import theme from '/src/theme'
import getCache from '/src/getCache'

const clientSideEmotionCache = getCache()

const CustomApp = ({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}) => (
  <CacheProvider value={emotionCache}>
    <Head>
      <meta name='viewport' content='initial-scale=1, width=device-width' />
    </Head>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <style global jsx>{`
        #__next {
          width: 100vw;
          height: 100vh;
          display: flex;
          flex-flow: column nowrap;
        }
        a {
          color: inherit;
        }
      `}</style>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  </CacheProvider>
)

export default CustomApp
