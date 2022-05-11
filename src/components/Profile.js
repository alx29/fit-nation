import React from 'react'

function Profile() {
  const email = sessionStorage.getItem('email');
  const age = sessionStorage.getItem('age');
  const weight = sessionStorage.getItem('weight');
  const height = sessionStorage.getItem('height');

  return (
    <div>{email} { age }</div>
  )
}

export default Profile