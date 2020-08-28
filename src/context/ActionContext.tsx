import { nanoid } from 'nanoid'
import React, { createContext, Dispatch, useReducer } from 'react'
import { RuleGroupType } from 'react-querybuilder'
import { RuleData } from '../components/Rule'
import { RuleBuilderData } from '../components/RuleBuilder'

const initData: RuleBuilderData = {
  groups: [
    {
      rules: []
    }
  ]
}

export enum Action {
  AddGroup,
  DeleteGroup,
  UpdateGroup,
  AddRule,
  DeleteRule,
  UpdateRule
}

export type Actions =
  | { type: Action.AddGroup }
  | { type: Action.DeleteGroup; gidx: number }
  | {
      type: Action.UpdateGroup
      gidx: number
      groupDefination?: string
    }
  | {
      type: Action.AddRule
      gidx: number
      priority: number
      condition?: RuleGroupType
      consequence?: RuleGroupType
      flow: string
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
      flow?: string
    }

const reducer = (draft: RuleBuilderData, action: Actions) => {
  switch (action.type) {
    case Action.AddGroup:
      return {
        ...draft,
        groups: [...draft.groups, { rules: [] }]
      }
    case Action.DeleteGroup:
      draft.groups.splice(action.gidx, 1)
      return {
        ...draft
      }
    case Action.UpdateGroup:
      draft.groups[action.gidx] = {
        rules: draft.groups[action.gidx].rules.map<RuleData>(rule => {
          return {
            ...rule,
            consequence: {
              ...rule.consequence,
              field: action.groupDefination ?? ''
            }
          }
        }),
        groupDefination: action.groupDefination
      }
      draft.groups[action.gidx].rules.map(
        rule => (rule.consequence.field = action.groupDefination ?? '')
      )
      return {
        ...draft
      }
    case Action.AddRule:
      draft.groups[action.gidx] = {
        ...draft.groups[action.gidx],
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
              field: draft.groups[action.gidx].groupDefination ?? '',
              value: ''
            },
            flow: 'R.next()'
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
        flow: action.flow ?? draft.groups[action.gidx].rules[action.ridx].flow
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
