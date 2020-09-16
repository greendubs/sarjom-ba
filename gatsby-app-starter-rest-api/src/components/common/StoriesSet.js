import React from 'react'
import {GridList,
  GridListTile,
  Card,
  CardContent,
  Avatar,
  Button,
  Grid,
  Typography } from '@material-ui/core'


export default ({ stories }) => {

  return (
    <>
      <GridList cols={1} spacing={6} cellHeight={200} style={{ backgroundColor: '#A9A9A9', padding:'1.5rem'}}>
        {stories.map((project) => (  
          <GridListTile>
            <Card style={{ padding:'.5rem' }}>
              <Grid container
                spacing={3}
                >
                <Grid item xs={4}>
                  <CardContent align='center'> 
                    <Avatar
                        style={{ backgroundColor: `#3EC28F`, marginTop: '.5rem', marginBottom: '.5rem'  }}
                      >
                        {' '}
                        {project.name.charAt(0).toUpperCase()}
                      </Avatar>
                    <Typography align='center' variant="h6"> 
                      {project.name}
                    </Typography>
                    <Typography align='center' variant="body2" gutterBottom> 
                      {project.organization}
                    </Typography>
                    <Typography align='center' variant="body2" gutterBottom> 
                      {project.date}
                    </Typography>
                  </CardContent> 
                </Grid>
                <Grid item xs={8}>
                  <CardContent>
                    <Typography variant="body2" gutterBottom> 
                      {project.desc}
                    </Typography>
                    <Typography variant="body2" gutterBottom> 
                      {project.images}
                    </Typography>
                    <Typography variant="body2" gutterBottom> 
                      {project.view}
                    </Typography>
                  </CardContent>
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