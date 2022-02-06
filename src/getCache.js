import createCache from '@emotion/cache'

const getCache = () => createCache({ key: 'css', prepend: true })

export default getCache
