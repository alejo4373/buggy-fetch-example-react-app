// __tests__/fetch.test.js
import React from 'react'
import { render, fireEvent, waitForElement, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import axiosMock from 'axios'
import Fetch from '../fetch'

jest.mock('axios')

test('loads and displays greeting', async () => {
  const url = '/greeting'
  render(<Fetch url={url} />)

  axiosMock.get.mockResolvedValueOnce({
    data: { greeting: 'hello there' },
  })

  fireEvent.click(screen.getByText('Load Greeting'))

  // Original in example https://testing-library.com/docs/react-testing-library/example-intro
  // Test fails and console error about updates not wrapped in act(). See ./error.txt
  await waitFor(() => screen.getByRole('heading'))

  // Other suggested example with expect() inside waitFor's callback
  // Test fails and console error about updates not wrapped in act()
  // await waitFor(() => {
  //   expect(screen.getByRole('heading')).toBeInTheDocument()
  // })

  // Test passes and no complaint about updates not wrapped in act()
  // But docs suggest it is deprecated
  // https://testing-library.com/docs/dom-testing-library/api-async#waitforelement-deprecated-use-find-queries-or-waitfor
  // await waitForElement(() => screen.getByRole('heading'))

  // Preferred suggested approach 
  // Test passes and no complaint about updates not wrapped in act()
  // await screen.findByRole('heading')

  expect(axiosMock.get).toHaveBeenCalledTimes(1)
  expect(axiosMock.get).toHaveBeenCalledWith(url)
  expect(screen.getByRole('heading')).toHaveTextContent('hello there')
  expect(screen.getByRole('button')).toHaveAttribute('disabled')
})
