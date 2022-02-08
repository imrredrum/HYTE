import HomeIcon from '@mui/icons-material/Home'
import { Breadcrumbs, Link } from '@mui/material'
import _ from 'lodash'

const CustomBreadcrumbs = ({ breadcrumbs = [] }) => (
  <div role='presentation'>
    <Breadcrumbs pt={2} pb={2}>
      <Link
        {...{
          sx: { display: 'flex', alignItems: 'center' },
          color: _.size(breadcrumbs) ? 'inherit' : 'text.primary',
          underline: 'hover',
          href: '/',
        }}
      >
        <HomeIcon sx={{ mr: 0.5 }} fontSize='inherit' />
        Home
      </Link>
      {_.map(breadcrumbs, ({ name = '', href = '' }, index, arr) => (
        <Link
          {...{
            color: _.chain(arr)
              .size()
              .eq(index + 1)
              .value()
              ? 'text.primary'
              : 'inherit',
            underline: _.isEmpty(href) ? 'none' : 'hover',
            href: _.isEmpty(href) ? false : href,
          }}
          key={index}
        >
          {name}
        </Link>
      ))}
    </Breadcrumbs>
  </div>
)

export default CustomBreadcrumbs
