const path = require('path')

exports.onCreatePage = async ({ page, actions: { createPage } }) => {
  if (page.path.match(/^\/app/)) {
    page.matchPath = '/app/*'
    createPage(page)
  }
  if (page.path.match(/^\/viewDataStory/)) {
    page.matchPath = '/viewDataStory/:dataStoryId'
    createPage(page)
  }
}

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
    node: {
      fs: 'empty',
    },
  })
}
