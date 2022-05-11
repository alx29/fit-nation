import React from 'react'

function ProfileElement(props) {
  
  function returnElement() {
    if ('email' in props) {
      const aux = props.email.slice(1, props.email.length - 1);
      return (
        <div className='mb-4'>
          <strong>Email:</strong> {aux}
        </div>
      );
    }
    if ('age' in props) {
      const aux = props.age.slice(1, props.age.length - 1);
      return (
        <div className='mb-4'>
          <strong>Age:</strong> {aux}
        </div>
      );
    }
    if ('weight' in props) {
      const aux = props.weight.slice(1, props.weight.length - 1);
      return (
        <div className='mb-4'>
          <strong>Weight:</strong> {aux}
        </div>
      );
    }
    if ('height' in props) {
      const aux = props.height.slice(1, props.height.length - 1);
      return (
        <div className='mb-4'>
          <strong>Height:</strong> {aux}
        </div>
      );
    }
    if ('gender' in props) {
      const aux = props.gender.slice(1, props.gender.length - 1);
      return (
        <div className='mb-4'>
          <strong>Gender:</strong> {aux}
        </div>
      );
    }
    if ('firstName' in props) {
      const aux = props.firstName;
      return (
        <div className='mb-4'>
          <strong>First Name:</strong> {aux}
        </div>
      );
    }
    if ('lastName' in props) {
      const aux = props.lastName;
      return (
        <div className='mb-4'>
          <strong>Last Name:</strong> {aux}
        </div>
      );
    }
  }

  return (
    <div>
      {returnElement()}
    </div>
  );
}

export default ProfileElement