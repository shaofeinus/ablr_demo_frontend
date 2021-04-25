import React from 'react'
import {Title} from '../../components/typography'
import SectionLayout from '../../components/sectionLayout'
import BlockField from '../../components/blockField'

class OtherInfoSection extends React.Component {
  render() {
    const {data} = this.props
    const {
      maritalStatus,
      marriedName,
      educationLevel,
      employmentSector
    } = data
    return (
      <div>
        <Title>
          Family
        </Title>
        <SectionLayout>
          <BlockField
            label={'Marital Status'}
            value={maritalStatus || 'No data'}
            isValid
          />
          <BlockField
            label={'Married Name'}
            value={marriedName || 'No data'}
            isValid
          />
        </SectionLayout>

        <Title>
          Education
        </Title>
        <SectionLayout>
          <BlockField
            label={'Education Level'}
            value={educationLevel || 'No data'}
            isValid
          />
        </SectionLayout>

        <Title>
          Employment
        </Title>
        <SectionLayout>
          <BlockField
            label={'Sector'}
            value={employmentSector || 'No data'}
            isValid
          />
        </SectionLayout>
      </div>
    )
  }
}

export default OtherInfoSection