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
import SendUploadDatasetForm from 'components/common/SendUploadDatasetForm'
import PrivateRoute from 'components/privateRoute'

export default () => (
  <Provider>
    <AppWrapper>
      <Router>
        <App path="/app/" component={App} />
        <PrivateRoute
          path="/app/collect"
          role="COLLECTOR"
          component={Collect}
        />
        {/* <Tasks path="/app/tasks/" component={Tasks} /> */}
        <Register path="/app/register/" component={Register} />
        <Login path="/app/login/" component={Login} />
        {/*Must be changed to Sender*/}
        <PrivateRoute
          path="/app/send/project"
          role="COLLECTOR"
          component={Send}
        />
        <PrivateRoute
          path="/app/send/dataset"
          role="COLLECTOR"
          component={SendUploadDatasetForm}
        />

        <Task path="/app/task/:id" component={Task} />
        <AddTask path="/app/task/new" component={AddTask} />
        <NotFound default component={NotFound} />
      </Router>
    </AppWrapper>
  </Provider>
)
