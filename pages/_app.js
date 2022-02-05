import CssBaseline from '@mui/material/CssBaseline'
import { Layout } from '../components'

function MyApp({ Component, pageProps }) {
  return (
    <>
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
    </>
  )
}

export default MyApp
