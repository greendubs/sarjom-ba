import React, { useContext, useState, useEffect } from 'react'
import ViewDatStory from 'components/ViewDataStory'
import Layout from 'components/common/Layout'

const viewDataStory = ({ location }) => {
  return (
    <Layout>
      <ViewDatStory id={location.pathname.split(':')[1].slice(0, -1)} />
    </Layout>
  )
}

export default viewDataStory
