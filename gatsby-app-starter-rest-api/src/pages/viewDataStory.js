import React from 'react'
import ViewDatStory from 'components/ViewDataStory'
import Layout from 'components/common/Layout'

const viewDataStory = ({ location }) => {
  const id = location.pathname.split(':')[1]
    ? location.pathname.split(':')[1].slice(0, -1)
    : ''
  return (
    <Layout>
      <ViewDatStory id={id} />
    </Layout>
  )
}

export default viewDataStory
