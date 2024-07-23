import React from 'react'
import { FallingLines } from 'react-loader-spinner'
import { Audio } from 'react-loader-spinner'

const PageLoader = () => {
  return (
    <>
    {/* <FallingLines
    color="#7B0323"
    width="100"
    visible={true}
    ariaLabel="falling-circles-loading"
    /> */}

<Audio
  height="80"
  width="80"
  radius="9"
  color="green"
  ariaLabel="loading"
  wrapperStyle
  wrapperClass
/>
    </>
  )
}

export default PageLoader