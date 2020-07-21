import * as React from 'react'

interface RuleBuilderProps {
  name: string
}

export const RuleBuilder: React.FC<RuleBuilderProps> = ({ name }) => (
  <div role='heading' aria-level={1}>
    My First Component: {name}
  </div>
)
