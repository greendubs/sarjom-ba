import React from 'react'
import Layout from 'components/common/Layout'
import { Container } from '@material-ui/core'
import SEO from 'components/common/Seo'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import SignUpForm from 'components/common/SignUpForm'
import Link from '@material-ui/core/Link'

export default () => (
  <Layout>
    <div className="container">
      <SEO title="About Citizen Science" />

      <Breadcrumbs separator=">>" aria-label="breadcrumb">
        <Link color="inherit" href="/">
          Home
        </Link>
        <Link color="textPrimary" href="/about-citsci" aria-current="page">
          Citizen Science
        </Link>
      </Breadcrumbs>

      <Container>
        <h2>About Citizen Science</h2>
        <p>
          Citizen science is a very popular field of public engagement in
          scientific research, especially related to environment and climate
          change. Almost anyone can help contribute to citizen science projects
          across the world by taking pictures, measurements, and data about our
          environment and it includes air, water, soil, temperature, and images
          of flora, fauna, and wildlife. Your data contributions help
          scientists, researchers, and environment enthusiasts to generate
          data-backed research and stories about our impact on climate and
          environment. You can find more about citizen science here,
        </p>
        <ul>
          <li>
            <a
              href="https://en.wikipedia.org/wiki/Citizen_science"
              target="_wiki"
            >
              Wikipedia : Citizen Science
            </a>
          </li>
          <li>
            <a href="https://www.citizenscience.org/" target="_association">
              Citizen Science Association
            </a>
          </li>
          <li>
            <a href="https://www.citizenscience.gov/" target="_gov">
              CitizenScience.gov
            </a>
          </li>
          <li>
            <a href="https://scistarter.org/" target="_scistarter">
              Science Starter
            </a>
          </li>
          <li>
            <a href="https://www.inaturalist.org/" target="_scistarter">
              iNaturalist
            </a>
          </li>
          <li>
            <a href="https://www.zooniverse.org/" target="_zooniverse">
              Zooniverse
            </a>
          </li>
          <li>
            <a href="https://ebird.org/home" target="_ebird">
              Ebird
            </a>
          </li>
          <li>
            <a href="https://publiclab.org/" target="_publiclab">
              Public Lab
            </a>
          </li>
          <li>
            <a href="https://anecdata.org/" target="_anecdata">
              Anecdata.org
            </a>
          </li>
        </ul>
        <p>
          There are many more such cool projects all across the world. According
          to most recent research, there are approximately "between 1.36 million
          and 2.28 million people volunteer annually in the 388 projects we
          surveyed, though variation is great" and that "the range of in-kind
          contribution of the volunteerism in our 388 citizen science projects
          as between $667 million to $2.5 billion annually."(Theobald et al.
          2015)
        </p>
        <hr />
        <h2>Why your contributions matter to us?</h2>
        <p>
          The Living Planet Report published by the World Wildlife Fund (WWF,
          2018) states that the world has seen a “60% decline in the size of
          populations of mammals, birds, fish, reptiles, and amphibians in just
          over 40 years”. The current rate of decline in the wildlife population
          is the “worst spate of species die-offs since the loss of the
          dinosaurs 65 million years ago” (Doyle, 2019). The root cause of this
          tragedy is that “99 percent of currently threatened wildlife species
          are at risk due to human activities” (Dublin, 2019). The primary cause
          for wildlife extinction is in fact “human communities” (Van Dooren,
          2014).
        </p>
        <p>
          In November 2019, the European Parliament voted to declare a “climate
          emergency” (Rankin, 2019) on the backdrop of 11,258 scientists across
          153 countries publishing a report that warned the planet faces
          “clearly and unequivocally faces a climate emergency” (Freedman,
          2019). Even today, if we look deeply and with empathy to the current
          coronavirus crisis, we will find one of the root causes is the
          unethical treatment of wildlife animals in a wet market (Vox, 2020).
        </p>
        <p>
          If you went around your neighborhood and talked to people about the
          health of wildlife species in and around your neighborhood, very few
          will have an exact estimate or have access to the facts that we shared
          above. Wildlife, flora, and fauna are extremely important for us, our
          families, and our civilization because they help maintain a healthy
          ecological balance on Earth. Each living organism has a place in the
          food chain that contributes to the overall ecosystem. However, the
          natural habitat for wildlife has been adversely affected by the rapid
          human urbanization and there are very few avenues in modern life for
          us to actively engage and contribute with such issues in our day to
          day lives.
        </p>
        <p>
          Hence, we started this initiative to bring forward the conversation of
          climate change and the environment back to the mainstream discussions.
          We want your data contributions for the sake of our environment and
          climate and we will create a platform where your data and voice will
          find a homely place.
        </p>
        <hr />
        <h2>How can you contribute?</h2>
        <p>
          Reach out to your neighborhood, school, university, or network of
          friends, connect to a citizen science organization near you!
        </p>
        <p>
          If you can't find one, then reach out to us, work with us, take our
          code and start customizing and building a community of
          environment-conscious citizens near your home. To protect and preserve
          the only planet we know as our home, we need all hands on deck!
        </p>
        <p>
          <Container align='center'>
          <SignUpForm/>
          </Container>
            Sign up here
          to list your project in our upcoming directory and create your own
          community!
        </p>
        <hr />
        <h3>References</h3>
        <ul>
          <li>
            Dublin, H. (2019, March 12). Endangered species. Retrieved from
            https://www.britannica.com/science/endangered-species
          </li>
          <br />
          <li>
            Freedman, A. (2019, November 5). More than 11,000 scientists from
            around the world declare a 'climate emergency'. Retrieved from
            https://www.washingtonpost.com/science/2019/11/05/more-than-scientists-around-world-declare-climate-emergency/
          </li>
          <br />
          <li>
            J. Theobald; A. K. Ettinger; H. K. Burgess; L. B. DeBey; N. R.
            Schmidt; H. E. Froehlich; C. Wagner; J. HilleRisLambers; J.
            Tewksbury; M. A. Harsch; J. K. Parrish (1 January 2015). "Global
            change and local solutions: Tapping the unrealized potential of
            citizen science for biodiversity research". Biological Conservation
            . 181 (2015): 236–244. DOI:10.1016/j.biocon.2014.10.021.
          </li>
          <br />
          <li>
            Rankin, J. (2019, November 28). 'Our house is on fire': EU
            parliament declares climate emergency. Retrieved from
            https://www.theguardian.com/world/2019/nov/28/eu-parliament-declares-climate-emergency
          </li>
          <br />
          <li>
            Rice, Doyle. “These Species Went Extinct in 2018. More May Be Doomed
            to Follow in 2019.” USA Today, Gannett Satellite Information
            Network, 13 Aug. 2019,
            www.usatoday.com/story/news/nation/2018/12/31/extinct-species-these-animals-were-lost-forever-2018/2450121002/
          </li>
          <br />
          <li>
            Van Dooren, T. (2014).​ Flight ways: Life and loss at the edge of
            extinction​. New York: Columbia University Press.
          </li>
          <br />
          <li>
            Vox. “How wildlife trade is linked to coronavirus.” YouTube video,
            08:48. March 06, 2020. https://www.youtube.com/watch?v=TPpoJGYlW54
          </li>
          <br />
          <li>
            World Wildlife Fund. (2018). Living Planet Report–2018: Aiming
            higher.
          </li>
          <br />
        </ul>
      </Container>
    </div>
  </Layout>
)
