import { render } from '@testing-library/react'
import { nanoid } from 'nanoid'
import * as React from 'react'
import { RuleBuilder } from '../../index'
import { RuleBuilderData } from '../RuleBuilder'

const init: RuleBuilderData = {
  groups: [
    {
      id: nanoid(),
      rules: [
        {
          id: nanoid(),
          priority: 100,
          condition: { id: nanoid(), rules: [], combinator: 'and', not: false },
          consequence: {
            id: nanoid(),
            rules: [],
            combinator: 'and',
            not: false
          },
          function: 'R.next()'
        }
      ]
    }
  ]
}
test('Renders', async () => {
  const { getByText } = render(
    <RuleBuilder
      inputData={init}
      queryProps={{
        fields: [{ name: 'name', label: 'Name' }],
        onQueryChange: () => {}
      }}
    />
  )
  expect(getByText('AND')).toBeInTheDocument()
})
