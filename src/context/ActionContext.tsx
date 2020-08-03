import { nanoid } from 'nanoid'
import React, { createContext, Dispatch, useReducer } from 'react'
import { RuleGroupType } from 'react-querybuilder'
import { RuleBuilderData } from '../components/RuleBuilder'

const initData: RuleBuilderData = {
  groups: [
    {
      rules: [
        {
          priority: 100,
          condition: { id: nanoid(), rules: [], combinator: 'and', not: false },
          consequence: {
            field: 'Score Type',
            value: 'T'
          },
          function: 'R.next()'
        }
      ]
    }
  ]
}

export enum Action {
  AddGroup,
  DeleteGroup,
  AddRule,
  DeleteRule,
  UpdateRule
}

export type Actions =
  | { type: Action.AddGroup }
  | { type: Action.DeleteGroup; gidx: number }
  | {
      type: Action.AddRule
      gidx: number
      priority: number
      condition?: RuleGroupType
      consequence?: RuleGroupType
      function: string
    }
  | { type: Action.DeleteRule; gidx: number; ridx: number }
  | {
      type: Action.UpdateRule
      gidx: number
      ridx: number
      priority?: number
      condition?: RuleGroupType
      consequenceField?: string
      consequenceValue?: string
      function?: string
    }

const reducer = (draft: RuleBuilderData, action: Actions) => {
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
        rules: [
          ...draft.groups[action.gidx].rules,
          {
            priority: 100 - action.gidx,
            condition: {
              id: nanoid(),
              rules: [],
              combinator: 'and',
              not: false
            },
            consequence: {
              field: 'scoreType',
              value: 'T'
            },
            function: 'R.next()'
          }
        ]
      }
      return { ...draft }
    case Action.DeleteRule:
      draft.groups[action.gidx].rules.splice(action.ridx, 1)
      return { ...draft }
    case Action.UpdateRule:
      draft.groups[action.gidx].rules[action.ridx] = {
        ...draft.groups[action.gidx].rules[action.ridx],
        condition:
          action.condition ??
          draft.groups[action.gidx].rules[action.ridx].condition,
        consequence: {
          field:
            action.consequenceField ??
            draft.groups[action.gidx].rules[action.ridx].consequence.field,
          value:
            action.consequenceValue ??
            draft.groups[action.gidx].rules[action.ridx].consequence.value
        },
        function:
          action.function ??
          draft.groups[action.gidx].rules[action.ridx].function
      }
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
