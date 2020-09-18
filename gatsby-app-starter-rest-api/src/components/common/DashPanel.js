import React from 'react'
import CardSet from 'components/common/CardSet'
import { Grid, MenuList, MenuItem, Button } from '@material-ui/core'

export default ({ buttons, data }) => {
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
        <CardSet cards={data} />
      </Grid>
    </Grid>
  )
}
