import React from 'react'
import {GridList,
        GridListTile,
        Card,
        CardContent,
        Avatar,
        Button,
        Grid,
        Typography } from '@material-ui/core'


export default ({ cards }) => {

  return (
    <>
    {console.log('creating set')}
    <GridList cols={4} spacing={6} cellHeight={300} style={{ backgroundColor: '#A9A9A9', padding:'.5rem'}}>
    {/* TODO: increase padding both in the grid item and gridlist to make it a little cleaner */}
    {cards.map((project) => (  
      <GridListTile>
        <Card>
          <CardContent align='center'>
          <Avatar
                style={{ backgroundColor: `#3EC28F`, marginTop: '.5rem', marginBottom: '.5rem'  }}
              >
                {' '}
                {project.name.charAt(0).toUpperCase()}
              </Avatar>
            <Typography align='center' variant="subtitle1"> 
              {project.name}
            </Typography>
            <Typography align='center' variant="body2" gutterBottom> 
              {project.organisation.name}
            </Typography>
          </CardContent>
          <Grid container 
            spacing={1} 
            direction='column' 
            alignItems='center' 
            justify='center' 
            style={{marginBottom: '10px'}}>   
            <Grid item>
              <Button variant='outlined' style={{marginLeft:'0px'}}>
                DataStory
              </Button>
            </Grid>
            <Grid item>
              <Button variant='outlined' style={{marginLeft:'0px'}}>
                Contributors
              </Button>
            </Grid>
          </Grid> 
          
        </Card>
      </GridListTile>
    ))} 
  </GridList>
  <Typography variant="body2" align='center' style={{marginTop: '15px'}}>
      Free tier includes a mazimum of 3 projects with 5GBs of data capacity.
      Please contact support@citsci.earth for additional data capacity.
  </Typography>
  </>
  )
}