import React from 'react'
import { QueryBuilderProps } from 'react-querybuilder'
import { Action, Actions } from '..'
import { Condition, ConditionData } from './Condition'

export type RuleData = {
  id: string
  conditions: ConditionData[]
}

export interface RuleProps {
  queryProps: QueryBuilderProps
  data: RuleData
  ridx: number
  dispatch: React.Dispatch<Actions>
}

export const Rule: React.FC<RuleProps> = ({
  queryProps,
  data,
  ridx,
  dispatch
}) => {
  // const [open, setOpen] = React.useState(false)
  let curentQuery = { json: '', sql: '' }

  // const handleConditionChange = (query: queryType) => {
  //   console.log('handleConditionChange: ' + JSON.stringify(query))
  //   curentQuery = query
  // }

  // const handleClose = () => {
  //   setOpen(false)
  // }

  // const handleSave = () => {
  //   dispatch({ type: Action.AddCondition, cidx: ridx, query: curentQuery })
  //   setOpen(false)
  //   console.log('handleClose: ' + JSON.stringify(curentQuery))
  // }

  return (
    <div>
      <label>Rule {ridx}</label>
      <button
        onClick={() => {
          dispatch({ type: Action.DeleteRule, ridx: ridx })
        }}
      >
        x
      </button>
      {data.conditions.map((condition, cidx) => (
        <Condition
          queryProps={queryProps}
          data={condition}
          ridx={ridx}
          cidx={cidx}
          dispatch={dispatch}
        />
      ))}
      <button
        onClick={() => {
          dispatch({
            type: Action.AddCondition,
            ridx: ridx,
            query: curentQuery
          })
        }}
      >
        Add Condition
      </button>

      {/* <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='max-width-dialog-title'
      >
        <DialogTitle id='max-width-dialog-title'>
          Condition Edititor
        </DialogTitle>
        <DialogContent>
          <ConditionsEditor
            query={defaultQuery}
            onChange={handleConditionChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave} color='primary'>
            Save
          </Button>
        </DialogActions>
      </Dialog> */}
    </div>
  )
}
