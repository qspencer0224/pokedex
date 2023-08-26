import React from 'react'

function Show(props) {
  return (
    <div>
        {/* this will show the specified pokemon that was clicked on */}
        <h1>This is my Show Page!</h1>
        <img src={props.pokemon.img} />
        <br />
        <h1>{props.pokemon.name}</h1>
        <br />
      <a href='/'>Back to Index</a>
    </div>
  )
}

export default Show
