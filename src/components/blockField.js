import React from 'react'
import {Row, Col, Tooltip} from 'antd'
import {CheckCircleOutlined, CloseCircleOutlined} from '@ant-design/icons'
import {Content, Label} from './typography'

class BlockField extends React.Component {
  /**
   * A field that has a label at the top and a value at the bottom.
   */

  render() {
    const {
      label,
      value,
      isValid,
      errorMessage
    } = this.props
    return (
      <div style={{paddingBottom: '16px'}}>
        <div style={{paddingBottom: '8px'}}>
          <Label>
            {label}
          </Label>
        </div>
        <Row
          align={'middle'}
          gutter={12}
          style={{flexWrap: 'nowrap'}}
        >
          <Col flex={'auto'}>
            <Content bold>
              {value}
            </Content>
          </Col>
          {
            isValid !== undefined &&
            <Col flex={'none'}>
              {
                isValid ?
                  <CheckCircleOutlined style={{color: 'green'}}/> :
                  (
                    errorMessage ?
                      <Tooltip
                        placement={'right'}
                        title={errorMessage}
                        defaultVisible
                      >
                        <a>
                          <CloseCircleOutlined style={{color: 'red'}}/>
                        </a>
                      </Tooltip> :
                      <CloseCircleOutlined style={{color: 'green'}}/>
                  )
              }
            </Col>
          }
        </Row>
      </div>
    )
  }
}

export default BlockField