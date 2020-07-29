import { nanoid } from 'nanoid'
import React, { createContext, Dispatch, useReducer } from 'react'
import { RuleBuilderData } from '../components/RuleBuilder'

const initData: RuleBuilderData = {
  groups: [
    {
      id: nanoid(),
      rules: [
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
  AddGroup,
  DeleteGroup,
  AddRule,
  DeleteRule
}

export type Actions =
  | { type: Action.AddGroup }
  | { type: Action.DeleteGroup; gidx: number }
  | { type: Action.AddRule; gidx: number; query: queryType }
  | { type: Action.DeleteRule; gidx: number; ridx: number }

const reducer = (draft: RuleBuilderData, action: Actions) => {
  //  const r =  draft.rules[action.gidx].rules.splice(action.ridx, 1);
  switch (action.type) {
    case Action.AddGroup:
      return {
        ...draft,
        groups: [...draft.groups, { id: nanoid(), rules: [] }]
      }
    case Action.DeleteGroup:
      draft.groups.splice(action.gidx, 1)
      return {
        ...draft
      }
    case Action.AddRule:
      draft.groups[action.gidx] = {
        id: draft.groups[action.gidx].id,
        rules: [
          ...draft.groups[action.gidx].rules,
          {
            id: nanoid(),
            query: action.query
          }
        ]
      }
      return { ...draft }
    case Action.DeleteRule:
      draft.groups[action.gidx].rules.splice(action.ridx, 1)
      return { ...draft }
    default:
      return draft
  }
}

const ActionContext = createContext<{
  root: RuleBuilderData
  dispatch: Dispatch<Actions>
}>({
  root: initData,
  dispatch: () => null
})

const ActionProvider: React.FC<{ inputData?: RuleBuilderData }> = ({
  inputData,
  children
}) => {
  const [root, dispatch] = useReducer(reducer, inputData ?? initData)

  return (
    <ActionContext.Provider value={{ root, dispatch }}>
      {children}
    </ActionContext.Provider>
  )
}

export { ActionProvider, ActionContext }
