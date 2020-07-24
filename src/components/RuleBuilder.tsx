import { nanoid } from 'nanoid'
import * as React from 'react'
import { useReducer } from 'react'
import { QueryBuilderProps } from 'react-querybuilder'
import { Rule, RuleData } from './Rule'

const initData: RulesBuilderData = {
  rules: [
    {
      id: nanoid(),
      conditions: [
        {
          id: 'vNL6tqcpuvKiNtsgpzSrp',
          query: {
            json: '',
            sql: ''
            // json:
            //   '{"id":"g-0bdd63ef-c321-4aa2-9475-cd788ab315b6","rules":[{"id":"g-eb_uSpJbCV0ooLFoiQz4y","rules":[{"id":"r-7DH_6mkm0b7QJZcQ6kwBj","field":"sex","value":"","operator":"Female"},{"id":"r-AluDold9Z8KdCZ4WzRUtt","field":"menopause","value":"","operator":"true"}],"combinator":"&&","not":false},{"id":"g-JmdjyR9MGoTIxTAnXR1nB","rules":[{"id":"r-_pDb8LRXnlJR_ZmksKTjO","field":"sex","value":"","operator":"Male"},{"id":"r-sQCeLXjlJ-dLp8zRJzrYZ","field":"age","value":"50","operator":"<"}],"combinator":"&&","not":false}],"combinator":"||","not":false}',
            // sql:
            //   '"( ( ( sex == Female ) && ( menopause == true ) ) || ( ( sex == Male ) && ( age < 50 ) ) ) "'
          }
        }
      ]
    }
  ]
}

export type queryType = {
  json: string
  sql: string
}

export enum Action {
  AddRule,
  DeleteRule,
  AddCondition,
  DeleteCondition
}

export type Actions =
  | { type: Action.AddRule }
  | { type: Action.DeleteRule; ridx: number }
  | { type: Action.AddCondition; ridx: number; query: queryType }
  | { type: Action.DeleteCondition; ridx: number; cidx: number }

// const Reducer = (draft: RulesBuilderData, action: Actions): void => {
//   switch (action.type) {
//     case Action.AddGroup:
//       return void draft.groups.push({ id: nanoid(), rules: [] })
//     case Action.DeleteGroup:
//       return void draft.groups.splice(action.gidx, 1)
//     case Action.AddRule:
//       return void draft.groups[action.gidx].rules.push({
//         id: nanoid(),
//         query: action.query
//       })
//     case Action.DeleteRule:
//       return void draft.groups[action.gidx].rules.splice(action.ridx, 1)
//     default:
//       return void draft
//   }
// }
const reducer = (draft: RulesBuilderData, action: Actions) => {
  //  const r =  draft.rules[action.ridx].conditions.splice(action.cidx, 1);
  switch (action.type) {
    case Action.AddRule:
      return {
        ...draft,
        rules: [...draft.rules, { id: nanoid(), conditions: [] }]
      }
    case Action.DeleteRule:
      draft.rules.splice(action.ridx, 1)
      return {
        ...draft
      }
    case Action.AddCondition:
      draft.rules[action.ridx] = {
        id: draft.rules[action.ridx].id,
        conditions: [
          ...draft.rules[action.ridx].conditions,
          {
            id: nanoid(),
            query: action.query
          }
        ]
      }
      return { ...draft }
    case Action.DeleteCondition:
      draft.rules[action.ridx].conditions.splice(action.cidx, 1)
      return { ...draft }
    default:
      return draft
  }
}

export type RulesBuilderData = {
  rules: RuleData[]
}

type RuleBuilderProps = {
  queryProps: QueryBuilderProps
  inputData?: RulesBuilderData
}

export const RuleBuilder: React.FC<RuleBuilderProps> = ({
  queryProps,
  inputData
}) => {
  // const [root, dispatch] = useImmerReducer(Reducer, inputData)
  const [root, dispatch] = useReducer(reducer, inputData ?? initData)
  console.log(queryProps)

  return (
    <div>
      {root.rules.map((rule, ridx) => (
        <Rule
          queryProps={queryProps}
          data={rule}
          ridx={ridx}
          dispatch={dispatch}
        />
      ))}
      <button
        onClick={() => {
          dispatch({ type: Action.AddRule })
        }}
      >
        Add Rule
      </button>
      <button
        onClick={() => {
          console.log(`view the draft: ${JSON.stringify(root)}`)
        }}
      >
        View
      </button>
    </div>
  )

  // return (
  //   <div role='heading' aria-level={1}>
  //     <QueryBuilder {...queryProps} />
  //     consequence: <input></input>
  //   </div>
  // )
}
