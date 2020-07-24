import { render } from '@testing-library/react'
import * as React from 'react'
import { RuleBuilder } from '../../index'

test('Renders', async () => {
  const { getByText } = render(
    <RuleBuilder
      queryProps={{
        fields: [{ name: 'name', label: 'Name' }],
        onQueryChange: () => {}
      }}
    />
  )
  expect(getByText('AND')).toBeInTheDocument()
})
