import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {Col, Row} from 'antd'
import Landing from './landing'
import MyInfoSignUp from './myInfoSignUp'
import Callback from './callback'
import Error from './error'
import Success from './success'

import 'antd/dist/antd.css'

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      myInfoSignUpData: null,
      errorMessage: ''
    }
    this.setMyInfoSignUpData = this.setMyInfoSignUpData.bind(this)
    this.setErrorMessage = this.setErrorMessage.bind(this)
  }

  setMyInfoSignUpData(data, callback) {
    this.setState(
      {myInfoSignUpData: data},
      callback
    )
  }

  setErrorMessage(message, callback) {
    this.setState(
      {errorMessage: message},
      callback
    )
  }

  render() {
    const {
      myInfoSignUpData,
      errorMessage
    } = this.state
    return (
      <Router>
        <Row>
          <Col flex={'auto'}/>
          <Col flex={'800px'} style={{padding: '12px 48px'}}>
            <Switch>
              <Route path={'/myinfo-signup'}>
                <MyInfoSignUp data={myInfoSignUpData}/>
              </Route>
              <Route path={'/callback'}>
                <Callback
                  setMyInfoSignUpData={this.setMyInfoSignUpData}
                  setErrorMessage={this.setErrorMessage}
                />
              </Route>
              <Route path={'/error'}>
                <Error message={errorMessage}/>
              </Route>
              <Route path={'/success'}>
                <Success/>
              </Route>
              <Route path={'/'}>
                <Landing setErrorMessage={this.setErrorMessage}/>
              </Route>
            </Switch>
          </Col>
          <Col flex={'auto'}/>
        </Row>
      </Router>
    )
  }
}

export default App
