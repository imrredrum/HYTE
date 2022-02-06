import { Box } from '@mui/material'
import ReactMarkdown from 'react-markdown'

const CustomImage = props => <img {...props} style={{ maxWidth: '100%' }} />

const Home = () => (
  <Box>
    <ReactMarkdown components={{ img: CustomImage }}>{`### Programming Task:

Create a basic product listing page with React + Next.js and a login form.

This is a programming task, we’re not asking you to design a beautiful web page. It’s made to help us assess your skills against some tasks the job will require. Some areas we are assessing include:

- Code quality
- Project and code structure
- Optimisation (Loading speeds, SEO, dynamic viewports etc)

The task can be split into 3 sections:

- Login / Authentication
- Product listing page
- Referral based discount popup

### Login / Authentication

There should be an option to login on the web app. You can implement it however you like but once logged in the user’s name should always be visible on the app. User info should persist through refreshes of the web app.

Test account credentials:

- Email: \`**********\`
- Password: \`**********\`

API calls for the login form:

Base API url: \`**********\`

### Product listing page

#### The product page should list the following product for sale

##### Name

Revolt 3

##### Short description

Premium ITX Small Form Factor Case

##### Price

$129.99

##### Long Description

We designed REVOLT 3 to be a compact ITX case unlike any other. Access your PC from nearly any angle to upgrade and modify. There's a place for everything - including the latest graphics cards!* With its clean design and attention to detail, this case will be sure to turn heads wherever you take it.

- Separate airflow paths for processor and graphics cooling.
- Vertical GPU orientation - no riser cables :)
- Pop-out handle and accessory holders, for maximum portability.
- Radiator door swings open for easy upgrades
- Front I/O for a clean and simple setup

Once you open the REVOLT 3 and feel how sleek and sturdy it is, you'll be itching to get all your hardware in here. We can't wait to see what kind of creativity you put into building out this tiny dream machine!

##### Image

![Revolt 3](https://cdn11.bigcommerce.com/s-k28u1tc9ki/images/stencil/640w/products/117/502/HYTE-revolt-white-0__11194.1637394183.jpg)

#### Requirements

Create a basic store listing page for the above product, making it responsive to different viewports

It should also include normal product page functions such as

- Buy now button
- Quantity selector
- Color selector
- Meta tags, page titles for the product etc

_* The selectors should work and update values but the buy button or any other functionality related to the product list page is not required_

### Referral based discount popup

The product listing page should take an optional referrer query string. If for example we wanted to offer a discount to users when they click on a link from Twitch.tv it would contain twitch as the referrer parameter.

When there is a referrer query string there should be a pop up, either in the corner of the screen or as a modal.

#### Pop up content

##### Title

Thanks for visiting us!

##### Body

As a sign of our thanks, take this 20% off coupon code: IBP2021

_* The pop up should contain a close button to dismiss the pop up._

### Submission

Leave a README with instructions if there are additional steps needed to test your app apart from the basics

Once finished make sure it’s live on a GitHub repository. Private or Public, the choice is yours but make sure [Oliyy](https://github.com/Oliyy) has access rights.
`}</ReactMarkdown>
  </Box>
)

export default Home
