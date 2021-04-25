import React from 'react'

function Title(props) {
  return (
    <div
      style={{
        fontSize: '18px',
        fontWeight: '500',
        marginBottom: '12px'
      }}
    >
      {props.children}
    </div>
  )
}

function Label(props) {
  return (
    <div
      style={{
        color: 'grey',
        fontSize: '14px',
        fontWeight: '400'
      }}
    >
      {props.children}
    </div>
  )
}

function Content(props) {
  const {
    bold
  } = props
  return (
    <div
      style={{
        fontSize: '14px',
        fontWeight: bold ? '500' : '400'
      }}
    >
      {props.children}
    </div>
  )
}

export {Title, Label, Content}