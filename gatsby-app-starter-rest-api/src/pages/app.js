import React from 'react'
import { Router } from '@reach/router'
import Provider from 'providers/Provider'
import AppWrapper from 'components/AppWrapper'
import App from 'components/App'
import NotFound from 'components/common/NotFound'
import OrganizationProfile from 'components/OrganizationProfile'
import Register from 'components/Register'
import Login from 'components/Login'
import Send from 'components/Send'
import Collect from 'components/Collect'
import SendUploadDatasetForm from 'components/common/SendUploadDatasetForm'
import SendCompleteForm from 'components/common/SendCompleteForm'
import SendDashboard from 'components/SendDashboard'
import CreateProjectForm from './../components/CreateProjectForm'
import UploadProjectForm from 'components/UploadProjectForm'
import ProjectCreated from 'components/ProjectCreated'
import ProjectUploaded from 'components/UploadProjectCreated'
import { ProjectProvider } from 'components/ProjectContext'
import { UploadProjectProvider } from 'components/UploadProjectContext'
import PrivateRoute from 'components/privateRoute'
import CreateDataStoryPanel from 'components/CreateDataStoryPanel'

export default () => (
  <Provider>
    <ProjectProvider>
      <UploadProjectProvider>
        <AppWrapper>
          <Router>
            <App path="/app/" component={App} />
            <OrganizationProfile
              path="/app/organizations"
              component={OrganizationProfile}
            />
            <PrivateRoute
              path="/app/collect"
              role="COLLECTOR"
              component={Collect}
            />
            <PrivateRoute
              path="/app/collect/createProject"
              role="COLLECTOR"
              component={CreateProjectForm}
            />
            <PrivateRoute
              path="/app/collect/uploadProject"
              role="COLLECTOR"
              component={UploadProjectForm}
            />
            <PrivateRoute
              path="/app/collect/projectCreated"
              role="COLLECTOR"
              component={ProjectCreated}
            />
            <PrivateRoute
              path="/app/collect/projectUploaded"
              role="COLLECTOR"
              component={ProjectUploaded}
            />
            <PrivateRoute
              path="/app/collect/createDataStory"
              role="COLLECTOR"
              component={CreateDataStoryPanel}
            />
            <Register path="/app/register/" component={Register} />
            <Login path="/app/login/" component={Login} />
            {/*Must be changed to Sender*/}
            <PrivateRoute
              path="/app/send/project"
              role="SENDER"
              component={Send}
            />
            <PrivateRoute
              path="/app/send/dataset"
              role="SENDER"
              component={SendUploadDatasetForm}
            />
            <PrivateRoute
              path="/app/send/complete"
              role="SENDER"
              component={SendCompleteForm}
            />
            <PrivateRoute
              path="/app/send/dashboard"
              role="SENDER"
              component={SendDashboard}
            />
            <NotFound default component={NotFound} />
          </Router>
        </AppWrapper>
      </UploadProjectProvider>
    </ProjectProvider>
  </Provider>
)
