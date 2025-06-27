import React from 'react'

const LoadingSpinner = ({ className = '' }) => {
  return (
    <span className={ `loading loading-dots loading-xl ${className}` }></span>
  )
}

export default LoadingSpinner