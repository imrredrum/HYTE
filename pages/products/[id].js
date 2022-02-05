import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
// import { useRouter } from 'next/router'

const Product = ({ product }) => {
  const [pick, setPick] = useState({})
  const [amount, setAmount] = useState(0)

  return (
    <>
      <Head>
        <title>{product.name} | HYTE</title>
        <meta name='description' content={product.brief} />
      </Head>
      <div>Name: {product.name}</div>
      <div>Id: {product.id}</div>
      <div>Brief: {product.brief}</div>
      <Image src={product.cover} layout='fill' alt={product.cover} />
      <div>
        Price:{' '}
        {new Intl.NumberFormat('en', {
          style: 'currency',
          currency: 'USD',
        }).format(product.price)}
      </div>
      <div>Description: {product.description}</div>
    </>
  )
}

export async function getServerSideProps(context) {
  // Fetch data from external API
  await new Promise(r => setTimeout(r, 100))

  const data = {
    id: context.params.id,
    name: 'Revolt 3',
    brief: 'Premium ITX Small Form Factor Case',
    cover:
      'https://cdn11.bigcommerce.com/s-k28u1tc9ki/images/stencil/640w/products/117/502/HYTE-revolt-white-0__11194.1637394183.jpg',
    gallery: [
      'https://cdn11.bigcommerce.com/s-k28u1tc9ki/images/stencil/640w/products/117/502/HYTE-revolt-white-0__11194.1637394183.jpg',
    ],
    price: 129.99,
    stock: 10000,
    spec: {
      color: [
        { id: 1, name: 'White' },
        { id: 2, name: 'Black' },
      ],
      addons: [
        { id: 1, preview: 'No Power Supply' },
        { id: 2, preview: 'With 700W Power Supply' },
      ],
    },
    description:
      "We designed REVOLT 3 to be a compact ITX case unlike any other. Access your PC from nearly any angle to upgrade and modify. There's a place for everything - including the latest graphics cards!* With its clean design and attention to detail, this case will be sure to turn heads wherever you take it.\n ● Separate airflow paths for processor and graphics cooling.\n ● Vertical GPU orientation - no riser cables :)\n ● Pop-out handle and accessory holders, for maximum portability.\n ● Radiator door swings open for easy upgrades\n ● Front I/O for a clean and simple setup\n Once you open the REVOLT 3 and feel how sleek and sturdy it is, you'll be itching to get all your hardware in here. We can't wait to see what kind of creativity you put into building out this tiny dream machine!",
  }

  // Pass data to the page via props
  return { props: { product: data } }
}

export default Product
