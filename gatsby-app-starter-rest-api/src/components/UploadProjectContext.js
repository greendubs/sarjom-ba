import React from 'react'

export const UploadProjectContext = React.createContext()

export class UploadProjectProvider extends React.Component {
  state = {
    userId: '',
    orgId: '',
    projectName: '',
    projectType: '',
    projectId: '',
    rawFileLinks: [],
    rawFileType: '',
    metaFileLinks: [],
    metaFileType: '',
    metaFileHeaders: {},
    metaJoinColumns: {},
    metaSelectColumns: {},
    metaFileIds: {},
    rawDataIndexes: [],
    dataTypes: [],
    license: '',

    token: '',
    tokenId: '',
    rawFileNames: [],
    metaFileNames: [],
  }

  setStart = (user, org, name, tok, tokId) => {
    this.setState({
      userId: user,
      orgId: org,
      projectName: name,
      token: tok,
      tokenId: tokId,
    })
  }

  setRawFileLinks = links => {
    this.setState({
      rawFileLinks: links,
    })
  }

  setMetaFileLinks = links => {
    this.setState({
      metaFileLinks: links,
    })
  }

  setRawFileNames = names => {
    this.setState({
      rawFileNames: names,
    })
  }

  setMetaFileNames = names => {
    this.setState({
      metaFileNames: names,
    })
  }

  setMetaFileHeaders = headers => {
    this.setState({
      metaFileHeaders: headers,
    })
  }

  setMetaFileIds = ids => {
    this.setState({
      metaFileIds: ids,
    })
  }

  setMetaJoinColumns = columns => {
    this.setState({
      metaJoinColumns: columns,
    })
  }

  setMetaSelectColumns = columns => {
    this.setState({
      metaSelectColumns: columns,
    })
  }

  setDataTypes = types => {
    this.setState({
      dataTypes: types,
    })
  }

  setLicense = lic => {
    this.setState({
      license: lic,
    })
  }

  setRawFileType = type => {
    this.setState({
      rawFileType: type,
    })
  }

  setMetaFileType = type => {
    this.setState({
      metaFileType: type,
    })
  }

  setProjectType = type => {
    this.setState({
      projectType: type,
    })
  }

  setProjectId = id => {
    this.setState({
      projectId: id,
    })
  }

  setRawDataIndexes = names => {
    this.setState({
      rawDataIndexes: names,
    })
  }

  clearProject = () => {
    this.setState({
      userId: '',
      orgId: '',
      projectName: '',
      projectId: '',
      rawFileLinks: [],
      rawFileType: '',
      projectType: '',
      metaFileLinks: [],
      metaFileHeaders: {},
      metaFileIds: {},
      metaJoinColumns: {},
      metaSelectColumns: {},
      metaFileType: '',
      rawDataIndexes: [],
      dataTypes: [],
      license: '',

      token: '',
      tokenId: '',
      rawFileNames: [],
      metaFileNames: [],
    })
  }

  componentDidUpdate() {
    //console.log(this.state)
  }

  render() {
    const { children } = this.props
    return (
      <UploadProjectContext.Provider
        value={{
          ...this.state,
          setStart: this.setStart,
          setRawFileLinks: this.setRawFileLinks,
          setMetaFileLinks: this.setMetaFileLinks,
          setRawFileNames: this.setRawFileNames,
          setMetaFileNames: this.setMetaFileNames,
          setMetaFileHeaders: this.setMetaFileHeaders,
          setMetaFileIds: this.setMetaFileIds,
          setMetaJoinColumns: this.setMetaJoinColumns,
          setMetaSelectColumns: this.setMetaSelectColumns,
          setDataTypes: this.setDataTypes,
          setLicense: this.setLicense,
          setRawFileType: this.setRawFileType,
          setMetaFileType: this.setMetaFileType,
          setProjectType: this.setProjectType,
          setProjectId: this.setProjectId,
          setRawDataIndexes: this.setRawDataIndexes,
          clearProject: this.clearProject,
        }}
      >
        {children}
      </UploadProjectContext.Provider>
    )
  }
}
