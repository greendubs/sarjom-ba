import React from 'react'
import Layout from 'components/common/Layout'
import { Container } from '@material-ui/core'
import SEO from 'components/common/Seo'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Link from '@material-ui/core/Link'

export default () => (
  <Layout>
    <div className="container">
      <SEO title="Terms & Conditions" />

      <Breadcrumbs separator=">>" aria-label="breadcrumb">
        <Link color="inherit" href="/">
          Home
        </Link>
        <Link color="textPrimary" href="/terms-conditions" aria-current="page">
          Terms & Conditions
        </Link>
      </Breadcrumbs>

      <Container>
        <h2>Our Terms & Conditions</h2>
        <p>
          As with any online service, when you use our platform, you will be
          bound to certain terms and conditions.
        </p>
        <hr />
        <p>
          We are currently in the alpha-development phase and our terms and
          conditions are currently in development and review. Final terms and
          conditions will be launched once reviewed by our board. During that
          time, our code and services will be provided under the GNU Lesser
          General Public License version 3.
        </p>
        <p>
          You should read more about these license terms and conditions before
          using our code and services,
        </p>
        <ul>
          <li>
            <a
              href="https://www.gnu.org/licenses/lgpl-3.0.en.html"
              target="_site"
            >
              GNU Lesser General Public License version 3
            </a>
          </li>
          <li>
            <a
              href="https://github.com/greendubs/sarjom/blob/master/LICENSE"
              target="_site"
            >
              Licencing terms and conditions of our code
            </a>
          </li>
        </ul>
        <p>
          We would like to hear from you more in this space. If you are
          interested in this space, please feel free to hit us up!{' '}
          <a href="sign-up.html" target="_survey">
            Click here!
          </a>
        </p>
      </Container>
    </div>
  </Layout>
)
