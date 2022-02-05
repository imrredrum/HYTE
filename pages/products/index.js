import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material'
import _ from 'lodash'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import style from './products.module.scss'

const ProductCard = ({ id = 0, name = '', cover = '', price = 0 }) => (
  <Card className={style.productCard}>
    <Link href='/products/[id]' as={`/products/${id}`} passHref>
      <CardActionArea component='a'>
        <CardMedia className={style.imageWrapper}>
          <Image
            src={cover}
            priority
            layout='fill'
            objectFit='cover'
            alt={name}
          />
        </CardMedia>
        <CardContent>
          <Typography gutterBottom variant='h3'>
            {name}
          </Typography>
          <Typography variant='body1' color='text.secondary'>
            {new Intl.NumberFormat('en', {
              style: 'currency',
              currency: 'USD',
            }).format(price)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Link>
  </Card>
)

const Products = ({ products }) => {
  return (
    <>
      <Head>
        <title>Products List | HYTE</title>
      </Head>
      <Typography className={style.pageTitle} variant='h1' align='center'>
        Products List
      </Typography>
      <Grid
        container
        spacing={{ xs: 4, sm: 2, md: 4 }}
        pl={{ xs: 4, sm: 2, md: 4 }}
        pr={{ xs: 4, sm: 2, md: 4 }}
      >
        {products.map(p => (
          <Grid item xs={12} sm={6} md={4} key={_.get(p, 'id', 0)}>
            <ProductCard {...p} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export async function getServerSideProps() {
  // Fetch data from external API
  await new Promise(r => setTimeout(r, 100))

  const data = [
    {
      id: 1,
      name: 'Revolt 3',
      cover:
        'https://cdn11.bigcommerce.com/s-k28u1tc9ki/images/stencil/640w/products/117/502/HYTE-revolt-white-0__11194.1637394183.jpg',
      price: 129.99,
    },
    {
      id: 2,
      name: 'Revolt 3',
      cover:
        'https://cdn11.bigcommerce.com/s-k28u1tc9ki/images/stencil/640w/products/117/502/HYTE-revolt-white-0__11194.1637394183.jpg',
      price: 129.99,
    },
    {
      id: 3,
      name: 'Revolt 3',
      cover:
        'https://cdn11.bigcommerce.com/s-k28u1tc9ki/images/stencil/640w/products/117/502/HYTE-revolt-white-0__11194.1637394183.jpg',
      price: 129.99,
    },
    {
      id: 4,
      name: 'Revolt 3',
      cover:
        'https://cdn11.bigcommerce.com/s-k28u1tc9ki/images/stencil/640w/products/117/502/HYTE-revolt-white-0__11194.1637394183.jpg',
      price: 129.99,
    },
    {
      id: 5,
      name: 'Revolt 3',
      cover:
        'https://cdn11.bigcommerce.com/s-k28u1tc9ki/images/stencil/640w/products/117/502/HYTE-revolt-white-0__11194.1637394183.jpg',
      price: 129.99,
    },
    {
      id: 6,
      name: 'Revolt 3',
      cover:
        'https://cdn11.bigcommerce.com/s-k28u1tc9ki/images/stencil/640w/products/117/502/HYTE-revolt-white-0__11194.1637394183.jpg',
      price: 129.99,
    },
    {
      id: 7,
      name: 'Revolt 3',
      cover:
        'https://cdn11.bigcommerce.com/s-k28u1tc9ki/images/stencil/640w/products/117/502/HYTE-revolt-white-0__11194.1637394183.jpg',
      price: 129.99,
    },
  ]

  // Pass data to the page via props
  return { props: { products: data } }
}

export default Products
