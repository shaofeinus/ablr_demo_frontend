import React from 'react'

function SectionLayout(props) {
  /**
   * A layout for each form section.
   */

  return (
    <div style={{
      padding: '0 16px 48px 16px'
    }}>
      {props.children}
    </div>
  )
}

export default SectionLayout