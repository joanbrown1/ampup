import React from 'react'
import { BallTriangle } from 'react-loader-spinner'

const PageLoader = () => {
  return (
    <>
    {/* <FallingLines
    color="#7B0323"
    width="100"
    visible={true}
    ariaLabel="falling-circles-loading"
    /> */}

  <BallTriangle
  height={100}
  width={100}
  radius={5}
  color="#7B0323"
  ariaLabel="ball-triangle-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  />
    </>
  )
}

export default PageLoader