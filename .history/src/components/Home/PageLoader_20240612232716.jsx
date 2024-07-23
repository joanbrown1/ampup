import React from 'react'
import { FallingLines } from 'react-loader-spinner'

const PageLoader = () => {
  return (
    <>
    <FallingLines
    color="#7B0323"
    width="100"
    visible={true}
    ariaLabel="falling-circles-loading"
    />
    </>
  )
}

export default PageLoader