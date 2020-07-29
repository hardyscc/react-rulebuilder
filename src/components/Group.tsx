import React from 'react'
import { QueryBuilderProps } from 'react-querybuilder'
import { Action, ActionContext } from '../context/ActionContext'
import { Rule, RuleData } from './Rule'

export type GroupData = {
  id: string
  rules: RuleData[]
}

export interface GroupProps {
  queryProps: QueryBuilderProps
  data: GroupData
  gidx: number
}

export const Group: React.FC<GroupProps> = ({ queryProps, data, gidx }) => {
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
  const { dispatch } = React.useContext(ActionContext)

  return (
    <div>
      <label>Group {gidx}</label>
      <button
        onClick={() => {
          dispatch({ type: Action.DeleteGroup, gidx: gidx })
        }}
      >
        x
      </button>
      {data.rules.map((rule, ridx) => (
        <Rule queryProps={queryProps} data={rule} gidx={gidx} ridx={ridx} />
      ))}
      <button
        onClick={() => {
          dispatch({
            type: Action.AddRule,
            gidx: gidx,
            query: curentQuery
          })
        }}
      >
        Add Rule
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
