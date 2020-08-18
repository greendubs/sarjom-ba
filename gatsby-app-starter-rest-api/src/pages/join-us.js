import React from 'react'
import Layout from 'components/common/Layout'
import { Container } from '@material-ui/core'

export default () => (
  <Layout>
    <div className="container">
      <Container>
        <h2>Join Us</h2>
        <hr />
        <p>
          We are working to develop and research some interesting aspects for
          data collection, storage, retrieval, and most importantly,
          attributions. We are looking for innovative proposals from individuals
          and groups that can collaborate with us on the following topics,
        </p>
        <ul>
          <li>
            Custom Blockchain implementation for governance and keeping track of
            assets across a distributed digital landscape.
          </li>
          <li>
            Custom AI implementation for large scale citizen science data
            aggregation, cleaning and M/L automation to empower organizations.
          </li>
          <li>
            New forms of data licensing and policy that can change the landscape
            of digital assets management and governance.
          </li>
          <li>
            Decolonizing Design in HCI - read more here.
            <ul>
              <li>
                <a
                  href="https://medium.com/@JacobsDesignCal/respecting-our-relations-dori-tunstall-on-decolonizing-design-d894df4c2ed2"
                  target="_site"
                >
                  Respecting our Relations: Dori Tunstall on Decolonizing Design
                </a>
              </li>
              <li>
                <a
                  href="https://medium.com/aiga-eye-on-design/what-does-it-mean-to-decolonize-design-8fdc6b521c00"
                  target="_site"
                >
                  What Does It Mean to Decolonize Design?
                </a>
              </li>
            </ul>
          </li>
        </ul>
        <p>
          The list is not exhaustive. We would like to hear from you more in
          this space. If you are interested in this space, please feel free to
          hit us up!{' '}
          <a href="sign-up.html" target="_survey">
            Click here!
          </a>
        </p>
        <hr />
        <p>
          Looking to join the current team? - find us on{' '}
          <a href="https://github.com/greendubs/sarjom" target="_github">
            Github
          </a>{' '}
          or shoot us an email at greendubs2020@gmail.com.
        </p>
        <hr />
      </Container>
    </div>
  </Layout>
)
