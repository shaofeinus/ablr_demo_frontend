import React from 'react'
import {withRouter} from 'react-router'
import {LoadingOutlined} from '@ant-design/icons'
import {fetchPersonalData} from '../../api'
import {verifyState} from '../../storage'

class Callback extends React.Component {

  componentDidMount() {
    const {
      setMyInfoSignUpData,
      setErrorMessage,
      history
    } = this.props
    const params = new URLSearchParams(this.props.location.search)
    const code = params.get('code')
    const state = params.get('state')
    if (code && state && verifyState(state)) {
      fetchPersonalData(code)
        .then((data) => setMyInfoSignUpData(
          data,
          () => history.push('/myinfo-signup')
        ))
        .catch((error) => setErrorMessage(
          typeof error === 'string' ? error : '',
          () => history.push('/error')
        ))
    } else {
      setErrorMessage(
        'invalid response from MyInfo',
        () => history.push('/error')
      )
    }
  }

  render() {
    return (
      <div style={{textAlign: 'center', paddingTop: '64px'}}>
        <div>
          Please wait while we retrieve your data...
        </div>
        <div>
          <LoadingOutlined/>
        </div>
      </div>
    )
  }
}

export default withRouter(Callback)