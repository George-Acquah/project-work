import React from 'react'
import Nav from './nav'
import Sidebar from './sidebar'

const Sidenav = () => {
  return (
    <>
    <div className="md:hidden">
        <Nav />
    </div>
    <div className="hidden md:block ">
        <Sidebar />
    </div>
    </>
  )
}

export default Sidenav