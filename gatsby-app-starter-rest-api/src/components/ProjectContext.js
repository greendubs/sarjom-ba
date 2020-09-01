import React from 'react'

export const ProjectContext = React.createContext();

export class ProjectProvider extends React.Component {
  state = {
    userId: "",
    orgId: "",
    projectName: "",
    description: "",
    documentLinks: [],
    bannerLink: [],    // change this to just string laters
    dataTypes: [],
    metaData: [],
    license: "",
    projectType: "",
    inviteKey:""
  }

  setStart = (user, org, name) => {
    console.log(user)
    this.setState({
      userId: user,
      orgId: org,
      projectName: name
    })
  }

  setDescription = (desc) => {
    this.setState({
      description: desc
    })
  }

  setDocLinks = (links) => {
    this.setState({
      documentLinks: links
    })
  }

  setBannerLink = (link) => {
    this.setState({
      bannerLink: link
    })
  }

  setDataTypes = (types) => {
    this.setState({
      dataTypes: types
    })
  }

  setMetaData = (data) => {
    this.setState({
      metaData: data
    })
  }

  setLicense = (lic) => {
    this.setState({
      license: lic
    })
  }

  setProjectType = (type) => {
    this.setState({
      projectType: type
    })
  }

  setInviteKey = (key) => {
    this.setState({
      inviteKey: key
    })
  }
  
  clearProject = () => {
    this.setState({
      userId: "",
      orgId: "",
      projectName: "",
      description: "",
      documentLinks: [],
      bannerLink: [],  // make sure to change this later
      dataTypes: [],
      metaData: [],
      license: "",
      projectType: "",
      inviteKey: "",
    })
  }

  componentDidUpdate() {
    console.log(this.state)
  }
  
  render() {
    const { children } = this.props
    return (
      <ProjectContext.Provider
        value={{
          ...this.state,
          setStart: this.setStart,
          setDescription: this.setDescription,
          setDocLinks: this.setDocLinks,
          setBannerLink: this.setBannerLink,
          setDataTypes: this.setDataTypes,
          setMetaData: this.setMetaData,
          setLicense: this.setLicense,
          setProjectType: this.setProjectType,
          setInviteKey: this.setInviteKey,
          clearProject: this.clearProject,
        }}>
        {children}
      </ProjectContext.Provider>
    )
  }
}