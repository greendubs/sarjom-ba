import React from 'react'
import { UploadProjectContext } from './UploadProjectContext'
import CompleteForm from './common/CompleteForm'

export default class ProjectUploaded extends React.Component {
  static contextType = UploadProjectContext

  componentDidMount() {
    this.context.clearProject()
  }

  render() {
    return (
      <>
        <CompleteForm
          title="Project Created!"
          breadCrumbLink="/app/collect"
          breadCrumbText="Collect Data"
          paraOne="Your data is ont its way!"
          paraTwo="Depending on the size of your files, it may take 24-48 hours to complete data transformation. You will receive a UNIQUE URL to download the datafiles (or preview as CSV) and also a secure API to connect to external system for plotting data for analysis and publications."
          dashboardLink="/app/collect"
          dashboardText="Back to Dashboard"
        />
      </>
    )
  }
}
