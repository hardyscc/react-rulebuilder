import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import * as React from 'react'
import { RuleBuilder } from '../../index'

test('Renders', async () => {
  const { getByRole } = render(<RuleBuilder name='John' />)
  expect(getByRole('heading')).toHaveTextContent('My First Component: John')
})
