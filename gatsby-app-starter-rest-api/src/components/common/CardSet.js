import React from 'react'
import {GridList,
        GridListTile,
        Card,
        CardContent,
        Avatar,
        Button,
        Grid,
        Typography } from '@material-ui/core'


export default ({ cards, button1, button2 }) => {

  return (
    <>
    <GridList cols={4} spacing={15} cellHeight={300} style={{ backgroundColor: '#A9A9A9', padding:'1rem'}}>
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
              <Button variant='outlined' 
                style={{marginLeft:'0px', fontSize: '13px'}}
                onClick={button1.function}>
                {button1.label}
              </Button>
            </Grid>
            <Grid item>
              <Button variant='outlined'
                style={{marginLeft:'0px', fontSize: '13px'}}
                onClick={button2.function}>
                {button2.label}
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