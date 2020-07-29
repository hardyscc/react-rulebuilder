import * as React from 'react'
import { QueryBuilderProps } from 'react-querybuilder'
import { Action, ActionContext, ActionProvider } from '../context/ActionContext'
import { Group, GroupData } from './Group'

// const initData: RuleBuilderData = {
//   rules: [
//     {
//       id: nanoid(),
//       rules: [
//         {
//           id: 'vNL6tqcpuvKiNtsgpzSrp',
//           query: {
//             json: '',
//             sql: ''
//             // json:
//             //   '{"id":"g-0bdd63ef-c321-4aa2-9475-cd788ab315b6","rules":[{"id":"g-eb_uSpJbCV0ooLFoiQz4y","rules":[{"id":"r-7DH_6mkm0b7QJZcQ6kwBj","field":"sex","value":"","operator":"Female"},{"id":"r-AluDold9Z8KdCZ4WzRUtt","field":"menopause","value":"","operator":"true"}],"combinator":"&&","not":false},{"id":"g-JmdjyR9MGoTIxTAnXR1nB","rules":[{"id":"r-_pDb8LRXnlJR_ZmksKTjO","field":"sex","value":"","operator":"Male"},{"id":"r-sQCeLXjlJ-dLp8zRJzrYZ","field":"age","value":"50","operator":"<"}],"combinator":"&&","not":false}],"combinator":"||","not":false}',
//             // sql:
//             //   '"( ( ( sex == Female ) && ( menopause == true ) ) || ( ( sex == Male ) && ( age < 50 ) ) ) "'
//           }
//         }
//       ]
//     }
//   ]
// }

// export type queryType = {
//   json: string
//   sql: string
// }

// export enum Action {
//   AddGroup,
//   DeleteGroup,
//   AddRule,
//   DeleteRule
// }

// export type Actions =
//   | { type: Action.AddGroup }
//   | { type: Action.DeleteGroup; gidx: number }
//   | { type: Action.AddRule; gidx: number; query: queryType }
//   | { type: Action.DeleteRule; gidx: number; ridx: number }

// const Reducer = (draft: GroupsBuilderData, action: Actions): void => {
//   switch (action.type) {
//     case Action.AddGroup:
//       return void draft.groups.push({ id: nanoid(), rules: [] })
//     case Action.DeleteGroup:
//       return void draft.groups.splice(action.gidx, 1)
//     case Action.AddGroup:
//       return void draft.groups[action.gidx].rules.push({
//         id: nanoid(),
//         query: action.query
//       })
//     case Action.DeleteGroup:
//       return void draft.groups[action.gidx].rules.splice(action.gidx, 1)
//     default:
//       return void draft
//   }
// }
// const reducer = (draft: RuleBuilderData, action: Actions) => {
//   //  const r =  draft.rules[action.gidx].rules.splice(action.ridx, 1);
//   switch (action.type) {
//     case Action.AddGroup:
//       return {
//         ...draft,
//         rules: [...draft.rules, { id: nanoid(), rules: [] }]
//       }
//     case Action.DeleteGroup:
//       draft.rules.splice(action.gidx, 1)
//       return {
//         ...draft
//       }
//     case Action.AddRule:
//       draft.rules[action.gidx] = {
//         id: draft.rules[action.gidx].id,
//         rules: [
//           ...draft.rules[action.gidx].rules,
//           {
//             id: nanoid(),
//             query: action.query
//           }
//         ]
//       }
//       return { ...draft }
//     case Action.DeleteRule:
//       draft.rules[action.gidx].rules.splice(action.ridx, 1)
//       return { ...draft }
//     default:
//       return draft
//   }
// }

export type RuleBuilderData = {
  groups: GroupData[]
}

export type RuleBuilderProps = {
  queryProps: QueryBuilderProps
  inputData?: RuleBuilderData
}

export const RuleBuilder: React.FC<RuleBuilderProps> = ({
  queryProps,
  inputData
}) => {
  // const [root, dispatch] = useImmerReducer(Reducer, inputData)
  // const [root, dispatch] = useReducer(reducer, inputData ?? initData)
  console.log(queryProps)
  console.log(inputData)

  return (
    <ActionProvider inputData={inputData}>
      <RuleComponent queryProps={queryProps} />
    </ActionProvider>
  )

  // return (
  //   <div role='heading' aria-level={1}>
  //     <QueryBuilder {...queryProps} />
  //     consequence: <input></input>
  //   </div>
  // )
}

const RuleComponent: React.FC<RuleBuilderProps> = ({ queryProps }) => {
  const { root, dispatch } = React.useContext(ActionContext)

  return (
    <div>
      {root.groups.map((group, gidx) => (
        <Group queryProps={queryProps} data={group} gidx={gidx} />
      ))}
      <button
        onClick={() => {
          dispatch({ type: Action.AddGroup })
        }}
      >
        Add Group
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
}
