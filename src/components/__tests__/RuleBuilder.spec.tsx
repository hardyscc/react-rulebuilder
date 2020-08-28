import { render } from '@testing-library/react'
import * as React from 'react'
import { RuleBuilder } from '../../index'
import { RuleBuilderData } from '../RuleBuilder'

const init: RuleBuilderData = {
  groups: [
    {
      rules: [
        {
          priority: 100,
          condition: {
            id: 'WAvAcVo0Y323O68K_KZZ5',
            rules: [
              {
                id: 'g-eaW_4_2WdEW1kWQlmRFXr',
                rules: [
                  {
                    id: 'g-yvTu8G90d2kou5Tazr-jZ',
                    rules: [
                      {
                        id: 'r-mlO27RKqJ9MwOnhmCQuGY',
                        field: 'sex',
                        value: '',
                        operator: 'Female'
                      },
                      {
                        id: 'r-_Na0STlWhPqFu7flxogGc',
                        field: 'sex',
                        value: '',
                        operator: 'Unknown'
                      }
                    ],
                    combinator: '||',
                    not: false
                  },
                  {
                    id: 'r-0eaI59adBCF39l_jvX3cg',
                    field: 'menopause',
                    value: '',
                    operator: 'true'
                  }
                ],
                combinator: '&&',
                not: false
              },
              {
                id: 'g-01B4azfk0c74zd6_TzeTj',
                rules: [
                  {
                    id: 'r-sFRrMjcrptr_2Mr53VCVY',
                    field: 'sex',
                    value: '',
                    operator: 'Male'
                  },
                  {
                    id: 'r-OYjcKt18A74C5PgpLemen',
                    field: 'age',
                    value: '50',
                    operator: '<'
                  }
                ],
                combinator: '&&',
                not: false
              }
            ],
            combinator: '||',
            not: false
          },
          consequence: {
            field: 'scoreType',
            value: 'Z'
          },
          flow: 'R.next()'
        }
      ],
      groupDefination: 'scoreType'
    },
    {
      rules: [
        {
          priority: 99,
          condition: {
            id: 'g0OJKXjd8lbeGTg4UVlD6',
            rules: [
              {
                id: 'r-e_KMbg-rAI4Gc3dDz5OnK',
                field: 'scoreType',
                value: '',
                operator: 'Z'
              },
              {
                id: 'r-wlAtR8KgeubGpQFF_sRSy',
                field: 'age',
                value: '19',
                operator: '<='
              },
              {
                id: 'r-V6Qg4jurMiZcr-t6yNlvR',
                field: 'zscore',
                value: '-2',
                operator: '>'
              }
            ],
            combinator: '&&',
            not: false
          },
          consequence: {
            field: 'impression',
            value: 'Normal bone mineral density for chronologic age.'
          },
          flow: 'R.stop()'
        }
      ],
      groupDefination: 'impression'
    }
  ]
}
test('Renders', async () => {
  const { getAllByText } = render(
    <>
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
        onRulesChange={() => {}}
        controlClassnames={{ flow: 'none' }}
      />
    </>
  )
  console.log(getAllByText('Score Type'))

  expect(getAllByText('Score Type')[0]).toBeInTheDocument()
})
