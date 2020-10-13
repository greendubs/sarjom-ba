import React from 'react'
import { navigate } from '@reach/router'
import { Link } from 'gatsby'
import SEO from 'components/common/Seo'
import FeedbackForm from 'components/common/FeedbackForm'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'

import { Container, Button, Typography } from '@material-ui/core'

export default class CompleteForm extends React.Component {
  state = {
    open: false,
    feedback: '',
  }

  componentDidMount() {
    this.setState({
      open: false,
      feedback: '',
    })
  }

  handleClickOpen() {
    this.setState({
      open: true,
    })
  }

  handleClose() {
    this.setState({
      open: false,
    })
  }

  handleTFChange = e => {
    this.setState({
      feedback: e.target.value,
    })
  }

  sendFeedback() {
    //console.log(this.state.feedback)
    this.setState({
      open: false,
    })
  }

  render() {
    return (
      <>
        <SEO title={this.props.title} />
        <Breadcrumbs separator=">>" aria-label="breadcrumb">
          <Link color="inherit" to="/">
            Home
          </Link>
          <Link
            color="textPrimary"
            to={this.props.breadCrumbLink}
            aria-current="page"
          >
            {this.props.breadCrumbText}
          </Link>
        </Breadcrumbs>
        <Container maxWidth="sm">
          <Typography variant="h5" align="center" gutterBottom>
            Thank You!
          </Typography>
          <br />
          <Typography variant="body2" align="center" gutterBottom>
            {this.props.paraOne}
          </Typography>
          <Typography variant="body2" align="center" gutterBottom>
            {this.props.paraTwo}
          </Typography>
          <br />
          <Typography variant="body2" align="center" gutterBottom>
            <p>Let us know what you think!</p>
          </Typography>
          <br />
          <Typography align="center" gutterBottom>
            <FeedbackForm />
          </Typography>
          <br />
          <Typography align="center" gutterBottom>
            <Button
              variant="contained"
              style={{
                backgroundColor: '#3EC28F',
                color: 'white',
                marginLeft: '0px',
              }}
              onClick={() => navigate(`${this.props.dashboardLink}`)}
            >
              {this.props.dashboardText}
            </Button>
          </Typography>
        </Container>
      </>
    )
  }
}
