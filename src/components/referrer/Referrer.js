import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import _ from 'lodash'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'

const Referrer = () => {
  const router = useRouter()

  const [open, setOpen] = useState(true)
  const [content, setContent] = useState('')

  const handleClose = () => setOpen(false)

  const checkReferrer = useCallback(
    referrer => {
      switch (referrer) {
        case 'twitch':
          setContent(
            'As a sign of our thanks, take this 20% off coupon code: IBP2021'
          )
          break

        default:
          break
      }
      router.push({
        pathname: router.pathname,
        query: _.omit(router.query, 'referrer'),
        shallow: true,
      })
    },
    [router]
  )

  useEffect(() => {
    if (_.get(router, ['query', 'referrer'], ''))
      checkReferrer(_.get(router, ['query', 'referrer'], ''))
  }, [router, checkReferrer])

  return (
    Boolean(content) && (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Thanks for visiting us!</DialogTitle>
        <DialogContent>
          <DialogContentText>{content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Dismiss</Button>
        </DialogActions>
      </Dialog>
    )
  )
}

export default Referrer
