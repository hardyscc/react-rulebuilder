import { render } from '@testing-library/react'
import { nanoid } from 'nanoid'
import * as React from 'react'
import { RuleBuilder } from '../../index'
import { RuleBuilderData } from '../RuleBuilder'

const init: RuleBuilderData = {
  groups: [
    {
      rules: [
        {
          priority: 100,
          condition: { id: nanoid(), rules: [], combinator: 'and', not: false },
          consequence: {
            field: 'scoreType',
            value: 'T'
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
      consequenceFields={[
        { value: 'scoreType', label: 'Score Type' },
        { value: 'impression', label: 'Impression' }
      ]}
      queryProps={{
        fields: [{ name: 'age', label: 'Age' }],
        onQueryChange: () => {}
      }}
      getRuleJson={() => {}}
    />
  )
  console.log(getByText)

  expect(getByText('AND')).toBeInTheDocument()
})
