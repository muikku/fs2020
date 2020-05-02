import React from 'react'
import { Skeleton } from '@material-ui/lab'

const Loading = () => {
  let skeletons = []
  for (let index = 0; index < 6; index++) {
    skeletons.push(
      <div key={index}>
        <Skeleton animation="wave" height={80} />
      </div>
    )
  }
  return (<>
    {skeletons}
  </>)
}

export default Loading