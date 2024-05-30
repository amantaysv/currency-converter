import CurrencyAPI from '@everapi/currencyapi-js'
import { Container, InputAdornment, Stack, TextField } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import { ChangeEvent, useEffect, useState } from 'react'
import { KgFlagIcon } from './icons/KgFlagIcon'
import { UkFlagIcon } from './icons/UkFlagIcon'
import { UsFlagIcon } from './icons/UsFlagIcon'

export const App = () => {
  const [gpbGiftCardNominal, setGpbNominal] = useState('32')
  const [usdGiftCardPrice, setUsdPrice] = useState('37.09')

  const [exchangeRateUsdToKgs, setExchangeRateKgs] = useState('')

  const [gbpValue, setGbpValue] = useState('')

  const exchangeRateGbpToUsd = (+usdGiftCardPrice / +gpbGiftCardNominal).toFixed(2)

  const usdValue = Number((+gbpValue * +exchangeRateGbpToUsd).toFixed(2)) || ''
  const kgsResult = Math.round(+gbpValue * +exchangeRateGbpToUsd * +exchangeRateUsdToKgs)

  const handleChangeNominal = (event: ChangeEvent<HTMLInputElement>) => {
    console.log('handleChangeNominal ~ event:', event)
    setGpbNominal(event.target.value)
  }
  const handleChangeUsdPrice = (event: ChangeEvent<HTMLInputElement>) => {
    setUsdPrice(event.target.value)
  }

  const changeGbpValue = (event: ChangeEvent<HTMLInputElement>) => {
    console.log('changeGbpValue ~ event:', event)
    setGbpValue(event.currentTarget.value)
  }

  const changeUsdValue = (event: ChangeEvent<HTMLInputElement>) => {
    setGbpValue((+event.currentTarget.value / +exchangeRateGbpToUsd).toFixed(2))
  }

  const changeExchangeRateKgs = (event: ChangeEvent<HTMLInputElement>) => {
    setExchangeRateKgs(event.currentTarget.value)
  }

  const client = new CurrencyAPI(import.meta.env.VITE_CURRENCYAPI_KEY)

  useEffect(() => {
    client
      .latest({
        base_currency: 'USD',
        currencies: 'KGS',
      })
      .then(
        (response: {
          data: {
            [key: string]: {
              code: string
              value: number
            }
          }
          meta: { last_updated_at: string }
        }) => {
          setExchangeRateKgs(response.data.KGS.value.toFixed(2))
        }
      )
  }, [])

  return (
    <Container maxWidth='sm'>
      <Stack gap={2} minHeight='100svh' justifyContent='center'>
        <Grid2 container spacing={2}>
          <Grid2 xs={12}>
            <Stack direction='row' gap={1}>
              <TextField
                type='number'
                label='Game Price GBP'
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start' sx={{ fontSize: '20px' }}>
                      <UkFlagIcon />
                    </InputAdornment>
                  ),
                }}
                onChange={changeGbpValue}
                value={gbpValue}
              />
              <TextField
                type='number'
                label='Game Price GBP'
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start' sx={{ fontSize: '20px' }}>
                      <UsFlagIcon />
                    </InputAdornment>
                  ),
                }}
                value={usdValue}
                onChange={changeUsdValue}
              />
              <TextField
                type='number'
                label='Game Price GBP'
                fullWidth
                disabled
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start' sx={{ fontSize: '20px' }}>
                      <KgFlagIcon />
                    </InputAdornment>
                  ),
                }}
                value={kgsResult}
              />
            </Stack>
          </Grid2>
          <Grid2 xs={12}>
            <TextField
              type='number'
              label='Exchange rate USD to KGS'
              fullWidth
              onChange={changeExchangeRateKgs}
              value={exchangeRateUsdToKgs}
            />
          </Grid2>
          <Grid2 xs={12}>
            <Stack direction='row' gap={1}>
              <TextField
                type='number'
                label='GBP Gift Card nominal'
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start' sx={{ fontSize: '20px' }}>
                      <UkFlagIcon />
                    </InputAdornment>
                  ),
                }}
                value={gpbGiftCardNominal}
                onChange={handleChangeNominal}
              />
              <TextField
                type='number'
                label='USD Gift Card price'
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start' sx={{ fontSize: '20px' }}>
                      <UsFlagIcon />
                    </InputAdornment>
                  ),
                }}
                value={usdGiftCardPrice}
                onChange={handleChangeUsdPrice}
              />
              <TextField
                type='number'
                label='KGS Gift Card price'
                fullWidth
                disabled
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start' sx={{ fontSize: '20px' }}>
                      <KgFlagIcon />
                    </InputAdornment>
                  ),
                }}
                value={Math.round(+usdGiftCardPrice * +exchangeRateUsdToKgs)}
              />
            </Stack>
          </Grid2>
        </Grid2>
      </Stack>
    </Container>
  )
}
