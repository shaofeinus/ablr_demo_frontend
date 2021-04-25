import React from 'react'
import {Title} from '../../components/typography'
import SectionLayout from '../../components/sectionLayout'
import BlockField from '../../components/blockField'

class PersonalSection extends React.Component {
  render() {
    const {
      data
    } = this.props
    const {
      nric,
      name,
      sex,
      dateOfBirth,
      countryOfBirth,
      residentialStatus,
      nationality,
      race
    } = data
    return (
      <div>
        <Title>
          Personal Info
        </Title>
        <SectionLayout>
          <BlockField
            label={'NRIC/FIN'}
            value={nric}
            isValid
          />
          <BlockField
            label={'Principle Name'}
            value={name}
            isValid
          />
          <BlockField
            label={'Sex'}
            value={sex}
            isValid
          />
          <BlockField
            label={'Date of Birth'}
            value={dateOfBirth ? dateOfBirth.format('DD MMM YYYY') : ''}
            isValid
          />
          <BlockField
            label={'Country of Birth'}
            value={countryOfBirth}
            isValid
          />
          <BlockField
            label={'Residential Status'}
            value={residentialStatus}
            isValid
          />
          <BlockField
            label={'Nationality'}
            value={nationality}
            isValid
          />
          <BlockField
            label={'Race'}
            value={race}
            isValid
          />
        </SectionLayout>
      </div>
    )
  }
}

export default PersonalSection