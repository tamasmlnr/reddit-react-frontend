import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const resetValue = (shouldReset) => {
    if (shouldReset) {setValue('')}
  }

  return {
    value,
    type,
    onChange,
    resetValue
  }
}