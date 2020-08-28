import { nanoid } from 'nanoid'
import React from 'react'
import { Action, ActionContext } from '../context/ActionContext'
import { ConfigContext } from '../context/ConfigContext'
import { Rule, RuleData } from './Rule'

export type GroupData = {
  rules: RuleData[]
  groupDefination?: string
}

export interface GroupProps {
  data: GroupData
  gidx: number
}

export const Group: React.FC<GroupProps> = ({ data, gidx }) => {
  const { dispatch } = React.useContext(ActionContext)
  const { controlElements, translations, controlClassnames, consequenceFields } = React.useContext(ConfigContext)

  return (
    <controlElements.groupTag
      className={controlClassnames.group}
      label="Group"
      gidx={gidx}
    >
      <controlElements.groupDefinationInput
        value={data.groupDefination}
        handleOnChange={v => {
          dispatch({
            type: Action.UpdateGroup,
            gidx: gidx,
            groupDefination: v
          })
        }}
        title={translations.groupDefination.title + `-${gidx}`}
        className={controlClassnames.groupDefination}
        type="select"
        values={[{ value: undefined, label: 'Please select' }, ...consequenceFields]}
        label={translations.groupDefination.label}
      />
      <controlElements.removeGroup
        className={controlClassnames.removeGroup}
        handleOnClick={() => {
          dispatch({ type: Action.DeleteGroup, gidx: gidx })
        }}
        label={translations.removeGroup.label}
        title={translations.removeGroup.title + `-${gidx}`}
      />
      {data.rules.map((rule, ridx) => (
        <Rule key={'rule' + ridx} data={rule} parent={data} gidx={gidx} ridx={ridx} />
      ))}
      <controlElements.addRule
        className={controlClassnames.addRule}
        handleOnClick={() => {
          dispatch({
            type: Action.AddRule,
            gidx: gidx,
            priority: 100,
            condition: {
              id: nanoid(),
              rules: [],
              combinator: 'and',
              not: false
            },
            consequence: {
              id: nanoid(),
              rules: [],
              combinator: 'and',
              not: false
            },
            flow: 'R.next()'
          })
        }}
        label={translations.addRule.label}
        title={translations.addRule.title + `-${gidx}`}
      />
    </controlElements.groupTag>
  )
}
