import { CloseRounded as CloseRoundedIcon } from '@mui/icons-material'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  NativeSelect,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import _ from 'lodash'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Breadcrumbs } from '/src/components'
import style from './products.module.scss'

const Product = ({ product }) => {
  const {
    id = 0,
    name = '',
    brief = '',
    cover = '',
    price = 0,
    stock = 0,
    specs = [],
    description = '',
  } = product

  const router = useRouter()

  const [pick, setPick] = useState(
    _.chain(specs)
      .filter('required')
      .reduce(
        (acc, cur) =>
          _.set(
            acc,
            _.get(cur, 'key', ''),
            _.get(cur, ['options', 0, 'id'], null)
          ),
        {}
      )
      .value()
  )
  const [quantity, setQuantity] = useState(_.gt(stock, 0) ? 1 : 0)
  const [unitPrice, setUnitPrice] = useState(price)
  const [total, setTotal] = useState(quantity * unitPrice)

  const handleSpec = (target = '', value = null, required = false) => {
    if (!(required && _.isNull(value)))
      setPick(p => ({ ...p, [target]: value }))
  }

  const handleQuantity = e => setQuantity(_.toNumber(e.target.value))

  useEffect(() => {
    setUnitPrice(
      _.chain(pick)
        .reduce(
          (acc, value, key) =>
            _.chain(specs)
              .find({ key })
              .get('options', [])
              .find({ id: value })
              .get('markup', 0)
              .add(acc)
              .value(),
          0
        )
        .add(price)
        .value()
    )
  }, [price, specs, pick])

  useEffect(() => {
    setTotal(quantity * unitPrice)
  }, [quantity, unitPrice])

  const [open, setOpen] = useState(false)

  const handleClose = () => setOpen(false)

  const handleSubmit = () => setOpen(true)

  return (
    <>
      <Head>
        <title>{name} | HYTE</title>
        <meta name='description' content={brief} />
        <meta property='og:title' content={`${name} | HYTE`} />
        <meta property='og:type' content='product' />
        <meta
          property='og:url'
          content={`https://hostame_injected_from_ENV${router.asPath}`}
        />
        <meta property='og:image' content={cover} />
      </Head>
      <Breadcrumbs
        breadcrumbs={[
          {
            name: 'Products',
            href: '/products',
          },
          {
            name,
            href: `/products/${id}`,
          },
        ]}
      />
      <Typography className={style.productTitle} variant='h1'>
        {name}
      </Typography>
      <Typography className={style.productBrief} variant='caption'>
        {brief}
      </Typography>
      <Grid
        container
        direction={{ xs: 'column', md: 'row' }}
        wrap='nowrap'
        spacing={{ xs: 2, md: 4 }}
        pt={{ xs: 1, md: 2 }}
        pb={{ xs: 1, md: 2 }}
      >
        <Grid item md={5}>
          <Box className={style.imageWrapper}>
            <Image
              src={cover}
              priority
              layout='fill'
              objectFit='contain'
              alt={cover}
            />
          </Box>
        </Grid>
        <Grid item md={7}>
          {_.map(
            specs,
            ({ key = '', display = '', required = false, options = [] }) => (
              <Box key={key} pb={{ xs: 1, md: 2 }}>
                <Typography variant='subtitle1'>Select {display}:</Typography>
                <ToggleButtonGroup
                  value={_.get(pick, key, '')}
                  exclusive
                  size='small'
                  onChange={(_, value) => handleSpec(key, value, required)}
                >
                  {_.map(options, ({ id = 0, title = '' }) => (
                    <ToggleButton value={id} key={id}>
                      {title}
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
              </Box>
            )
          )}
          <Grid container pb={{ xs: 1, md: 2 }} alignItems='center' spacing={1}>
            <Grid item width={80}>
              <FormControl fullWidth variant='standard'>
                <InputLabel>Quantity</InputLabel>
                <NativeSelect value={quantity} onChange={handleQuantity}>
                  {_.map(Array(_.lt(stock, 5) ? stock : 5), (_, i) => (
                    <option key={i} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </NativeSelect>
              </FormControl>
            </Grid>
            <Grid item>
              <CloseRoundedIcon />
            </Grid>
            <Grid item xs>
              <FormControl variant='standard' disabled>
                <InputLabel>Unit Price</InputLabel>
                <Input
                  value={unitPrice}
                  startAdornment={
                    <InputAdornment position='start'>$</InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
          </Grid>
          <Box>
            <Typography variant='subtitle1'>Total:</Typography>
            <Typography variant='h3' className={style.total} gutterBottom>
              {new Intl.NumberFormat('en', {
                style: 'currency',
                currency: 'USD',
              }).format(total)}
            </Typography>
            <Button variant='contained' onClick={handleSubmit}>
              Buy NOW
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Divider />
      <Box sx={{ overflow: 'auto' }}>
        <ReactMarkdown>{description}</ReactMarkdown>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Order Detail</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {JSON.stringify({
              id,
              spec: _.pickBy(pick, (v, _k) => !_.isNull(v)),
              quantity,
            })}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Dismiss
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export async function getServerSideProps(context) {
  // Fetch data from external API
  await new Promise(r => setTimeout(r, 100))

  const data = {
    id: _.toNumber(context.params.id),
    name: 'Revolt 3',
    brief: 'Premium ITX Small Form Factor Case',
    cover:
      'https://cdn11.bigcommerce.com/s-k28u1tc9ki/images/stencil/640w/products/117/502/HYTE-revolt-white-0__11194.1637394183.jpg',
    price: 129.99,
    stock: 10000,
    specs: [
      {
        key: 'color',
        display: 'Color',
        required: true,
        options: [
          { id: 1, title: 'White', markup: 0 },
          { id: 2, title: 'Black', markup: 0 },
        ],
      },
      {
        key: 'addons',
        display: 'Add-Ons',
        required: false,
        options: [
          { id: 1, title: 'No Power Supply', markup: 0 },
          { id: 2, title: 'With 700W Power Supply', markup: 120 },
        ],
      },
    ],
    description: `
We designed REVOLT 3 to be a compact ITX case unlike any other. Access your PC from nearly any angle to upgrade and modify. There's a place for everything - including the latest graphics cards!* With its clean design and attention to detail, this case will be sure to turn heads wherever you take it.

- Separate airflow paths for processor and graphics cooling.
- Vertical GPU orientation - no riser cables :)
- Pop-out handle and accessory holders, for maximum portability.
- Radiator door swings open for easy upgrades
- Front I/O for a clean and simple setup

Once you open the REVOLT 3 and feel how sleek and sturdy it is, you'll be itching to get all your hardware in here. We can't wait to see what kind of creativity you put into building out this tiny dream machine!
    `,
  }

  // Pass data to the page via props
  return { props: { product: data } }
}

export default Product
