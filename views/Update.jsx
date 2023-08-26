import React from 'react'

function Update(props) {
  return (
    <div>
      <div>
        <a href='/'>Return to Index</a>
        <h1>Edit Pokemon</h1>
        <form action={`/editsubmit/${props.updated.id}?_method=PUT`} method='POST' >
          Pokemon: <input type='text' name='name' defaultValue={props.updated.name}/>
          <br />
          Profile Picture: <input type='src' name='img' defaultValue={props.updated.img} />
          <p />
          <input type='submit' name='' value='submit' />
        </form>
      </div>
    </div>
  )
}

export default Update
