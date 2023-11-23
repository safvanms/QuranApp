import React from 'react'
import './other.css'

function getCurrentYear() {
  return new Date().getFullYear();
}

const year = getCurrentYear();

export default function Footer() {
  return (
    <div className="footer">
      <p>© {year} quranalkareem. All Right reserved </p>
      <p>source from api.alquran.cloud </p>
    </div>
  )
}
