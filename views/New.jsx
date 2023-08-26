import React from 'react'

function New() {
  return (
    <div>
        <a href='/'>Return to Index</a>
        <h1>Create a NEW Pokemon</h1>
      <form action='/newsubmit' method='POST' >
        Pokemon: <input type='text' name='name'/>
        <br />
        Profile Picture: <input type='src' name='img' />
        <p />
        <input type='submit' name='' value='submit' />
      </form>
    </div>
  )
}

export default New
