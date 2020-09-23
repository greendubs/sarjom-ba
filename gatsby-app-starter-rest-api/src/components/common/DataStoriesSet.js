import React from 'react'
import {
  GridList,
  GridListTile,
  Card,
  CardContent,
  Avatar,
  Button,
  Grid,
  Typography,
} from '@material-ui/core'

export default ({ cards, file, button }) => {
  return (
    <>
      <GridList
        cols={4}
        spacing={15}
        cellHeight={300}
        style={{ backgroundColor: '#A9A9A9', padding: '1rem' }}
      >
        {cards.map(story => (
          <GridListTile>
            <Card>
              <CardContent align="center">
                <Avatar
                  style={{
                    backgroundColor: `#3EC28F`,
                    marginTop: '.5rem',
                    marginBottom: '.5rem',
                  }}
                >
                  {' '}
                  {story.name.charAt(0).toUpperCase()}
                </Avatar>
                <Typography align="center" variant="subtitle1">
                  {story.name}
                </Typography>
                <Typography align="center" variant="body2" gutterBottom>
                  {file.name}
                </Typography>
              </CardContent>
              <Grid
                container
                spacing={1}
                direction="column"
                alignItems="center"
                justify="center"
                style={{ marginBottom: '10px' }}
              >
                <Grid item>
                  <Button
                    variant="outlined"
                    style={{ marginLeft: '0px', fontSize: '13px' }}
                    onClick={button.function(story.id)}
                  >
                    {button.label}
                  </Button>
                </Grid>
              </Grid>
            </Card>
          </GridListTile>
        ))}
      </GridList>
    </>
  )
}
