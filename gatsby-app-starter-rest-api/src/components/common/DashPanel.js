import React from 'react'
import { Grid, MenuList, MenuItem, Button, Typography } from '@material-ui/core'

export default ({ buttons, children }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={3}>
        <MenuList>
          {buttons.map(button => (
            <MenuItem>
              <Button
                variant="contained"
                onClick={button.task}
                disabled={button.hide}
                key={button.label}
                style={{
                  marginLeft: '1.25rem',
                  textTransform: 'none',
                  width: '213px',
                }}
              >
                {button.label}
              </Button>
            </MenuItem>
          ))}
        </MenuList>
      </Grid>
      <Grid item xs={9}>
        <Typography
          variant="body2"
          align="center"
          style={{ marginBottom: '1rem' }}
        >
          Free tier includes a maximum of 3 projects with 5GBs of data capacity.
          Please contact support@citsci.earth for additional data.
        </Typography>
        {children}
        <br/>
      </Grid>
    </Grid>
  )
}
