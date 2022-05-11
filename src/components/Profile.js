import React from 'react'

function Profile() {
  const email = localStorage.getItem('email');
  const age = localStorage.getItem('age');
  const weight = localStorage.getItem('weight');
  const height = localStorage.getItem('height');


  return (
    <div>{email} { age }</div>
  )
}

export default Profile