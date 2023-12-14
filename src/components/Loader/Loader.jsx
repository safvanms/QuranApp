import React from 'react'
import './loader.css'

export default function Loader({bg}) {
  return (
    <div>
      <span className="main_loader">
        <span className="inner_loader" style={{backgroundColor:bg}}></span>
      </span>
    </div>
  )
}
