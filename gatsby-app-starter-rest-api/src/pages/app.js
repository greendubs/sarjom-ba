import React from 'react'
import { Router } from '@reach/router'
import Provider from 'providers/Provider'
import AppWrapper from 'components/AppWrapper'
import App from 'components/App'
import Tasks from 'components/Tasks'
import Task from 'components/Task'
import AddTask from 'components/AddTask'
import NotFound from 'components/common/NotFound'
import Register from 'components/Register'
import Login from 'components/Login'
import Send from 'components/Send'
import Collect from 'components/Collect'
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
          <PrivateRoute path="/app/collect" role="COLLECTOR" component={Collect} />
          <PrivateRoute path="/app/collect/createProject" role="COLLECTOR" component={CreateProjectForm} />
          <PrivateRoute path="/app/collect/projectCreated" role="COLLECTOR" component={ProjectCreated}/>
          <Register path="/app/register/" component={Register} />
          <Login path="/app/login/" component={Login} />
          <PrivateRoute path="/app/send/" role="COLLECTOR" component={Send} />
          {/*Must be changed to Sender*/}
          <Task path="/app/task/:id" component={Task} />
          <AddTask path="/app/task/new" component={AddTask} />
          <NotFound default component={NotFound} />
        </Router>
      </AppWrapper>
    </ProjectProvider>
  </Provider>
)
