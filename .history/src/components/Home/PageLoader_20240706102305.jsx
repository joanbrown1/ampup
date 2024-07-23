import React from 'react'
import { Circles } from 'react-loader-spinner'

const PageLoader = () => {
  return (
    <>
    {/* <FallingLines
    color="#7B0323"
    width="100"
    visible={true}
    ariaLabel="falling-circles-loading"
    /> */}

  <Circles
  height="80"
  width="80"
  color="#7B0323"
  ariaLabel="circles-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  />
    </>
  )
}

export default PageLoader