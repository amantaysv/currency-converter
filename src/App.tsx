import { Container, InputAdornment, Stack, TextField } from '@mui/material'
import { useState } from 'react'
import { KgFlagIcon } from './icons/KgFlagIcon'
import { TrFlagIcon } from './icons/TrFlagIcon'
import { UsFlagIcon } from './icons/UsFlagIcon'

const usdToTrl = 29
const ustToKgs = 90

const trlToUsd = 0.035
const trlToKgs = 3

const kgsToUsd = 0.011213
const kgsToTrl = 0.323447

const calcValue = (val1: string, val2: number): string => {
  return Number((+val1 * val2).toFixed(2)).toString()
}

export const App = () => {
  const [usdVal, setUsdVal] = useState('')
  const [trlVal, setTrlVal] = useState('')
  console.log('App ~ trlVal:', trlVal)
  const [kgsVal, setKgsVal] = useState('')

  const calcUsdVal = () => {
    if (trlVal) return calcValue(trlVal, trlToUsd)
    if (kgsVal) return calcValue(kgsVal, kgsToUsd)
    return usdVal.toString()
  }

  const calcTrlVal = () => {
    if (usdVal) return calcValue(usdVal, usdToTrl)
    if (kgsVal) return calcValue(kgsVal, kgsToTrl)
    return trlVal.toString()
  }

  const calcKgsVal = () => {
    if (usdVal) return calcValue(usdVal, ustToKgs)
    if (trlVal) return calcValue(trlVal, trlToKgs)
    return kgsVal.toString()
  }

  const usdChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsdVal(e.currentTarget.value)
    setTrlVal('')
    setKgsVal('')
  }

  const trlChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsdVal('')
    setTrlVal(e.currentTarget.value)
    setKgsVal('')
  }

  const kgsChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsdVal('')
    setTrlVal('')
    setKgsVal(e.currentTarget.value)
  }

  return (
    <Container maxWidth='sm'>
      <Stack gap={2} minHeight='100svh' justifyContent='center'>
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <UsFlagIcon />
              </InputAdornment>
            ),
          }}
          type='number'
          value={calcUsdVal()}
          onChange={usdChangeHandler}
        />
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <TrFlagIcon />
              </InputAdornment>
            ),
          }}
          type='number'
          value={calcTrlVal()}
          onChange={trlChangeHandler}
        />
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position='start' sx={{ fontSize: '20px' }}>
                <KgFlagIcon />
              </InputAdornment>
            ),
          }}
          type='number'
          value={calcKgsVal()}
          onChange={kgsChangeHandler}
        />
      </Stack>
    </Container>
  )
}
