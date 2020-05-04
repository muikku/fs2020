import { Grid, Container } from '@material-ui/core'
import React from 'react'

const GriddedContent = ({ children }) => {
  return (
    <Container>
      <Grid container alignItems="center">
        <Grid
          container
          direction="column"
          justify="flex-end"
          alignItems="stretch"
          style={{ paddingTop: '50px' }}
        >
          <Grid item>
            {children}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default GriddedContent