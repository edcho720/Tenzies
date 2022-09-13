import React from 'react'

const Box = (props) => {
  const styles = {
    backgroundColor: props.on ? "green" : "red"
    
}
  const text = props.on && "ON"

  return (
    <>
    <div 
        className="box-display" 
        on={props.on} 
        onClick={() => props.toggle(props.id)}
        style={styles}
        >

    </div>
    {/* {props.on && <h1>ON</h1>} */}
    </>
  )
}

export default Box