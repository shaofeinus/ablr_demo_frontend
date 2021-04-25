import React from 'react'
import {Title} from '../../components/typography'
import SectionLayout from '../../components/sectionLayout'
import BlockField from '../../components/blockField'
import DisplayInput from '../../components/displayInput'

class ContactSection extends React.Component {

  render() {
    const {
      data,
      onChangeMobile,
      onChangeEmail
    } = this.props
    const {
      mobile,
      email,
      block,
      street,
      building,
      floorUnit,
      postalCode,
      housingType,
      mobileErrorMessage,
      emailErrorMessage
    } = data
    return (
      <div>
        <Title>
          Contact Info
        </Title>
        <SectionLayout>
          <BlockField
            label={'Mobile Number'}
            value={
              <DisplayInput
                value={mobile}
                onChangeValue={(value) => onChangeMobile(value)}
              />
            }
            isValid={!mobileErrorMessage}
            errorMessage={mobileErrorMessage}
          />
          <BlockField
            label={'Email'}
            value={
              <DisplayInput
                value={email}
                onChangeValue={(value) => onChangeEmail(value)}
              />
            }
            isValid={!emailErrorMessage}
            errorMessage={emailErrorMessage}
          />
        </SectionLayout>
        <Title>
          Registered Address
        </Title>
        <SectionLayout>
          <BlockField
            label={'Block Number'}
            value={block || 'No data'}
            isValid
          />
          <BlockField
            label={'Street Name'}
            value={street || 'No data'}
            isValid
          />
          <BlockField
            label={'Building Name'}
            value={building || 'No data'}
            isValid
          />
          <BlockField
            label={'Floor & Unit No'}
            value={floorUnit || 'No data'}
            isValid
          />
          <BlockField
            label={'Postal Code'}
            value={postalCode || 'No data'}
            isValid
          />
          <BlockField
            label={'Type of Housing'}
            value={housingType || 'No data'}
            isValid
          />
        </SectionLayout>
      </div>
    )
  }
}

export default ContactSection