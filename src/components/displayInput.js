import React from 'react'
import {Row, Col, Input} from 'antd'
import {EditOutlined} from '@ant-design/icons'

class DisplayInput extends React.Component {
  /**
   * A component that toggles between a text display and an input.
   */

  constructor(props) {
    super(props)
    const {
      value
    } = this.props
    this.state = {
      state: 'display', // or 'input'
      inputValue: value
    }
    this.inputRef = React.createRef()
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({
        inputValue: this.props.value
      })
    }
  }

  clickEdit() {
    this.setState({
      state: 'input'
    }, () => this.inputRef.current.focus())
  }

  changeValue(onChangeValue) {
    const {
      inputValue
    } = this.state
    onChangeValue(inputValue)
    this.setState({
      state: 'display'
    })
  }

  render() {
    const {
      value,
      onChangeValue
    } = this.props
    const {
      state,
      inputValue
    } = this.state
    return (
      <div>
        {
          state === 'display' ?
            <Row align={'middle'}>
              <Col flex={'auto'}>
                {value}
              </Col>
              <Col flex={'none'}>
                <a onClick={() => this.clickEdit()}>
                  <EditOutlined/>
                </a>
              </Col>
            </Row> :
            <Input
              ref={this.inputRef}
              value={inputValue}
              onChange={(e) => this.setState({
                inputValue: e.target.value
              })}
              onBlur={() => this.changeValue(onChangeValue)}
              onPressEnter={() => this.changeValue(onChangeValue)}
            />
        }
      </div>
    )
  }

}

export default DisplayInput