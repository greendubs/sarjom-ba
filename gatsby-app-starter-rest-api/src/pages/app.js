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
import ProjectCreated from 'components/ProjectCreated'
import { ProjectProvider } from 'components/ProjectContext'
import PrivateRoute from 'components/privateRoute'

export default () => (
  <Provider>
    <ProjectProvider>
      <AppWrapper>
        <Router>
          <App path="/app/" component={App} />
          <OrganizationProfile path="/app/organizations" component={OrganizationProfile}/>
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
            path="/app/collect/projectCreated"
            role="COLLECTOR"
            component={ProjectCreated}
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
    </ProjectProvider>
  </Provider>
)
