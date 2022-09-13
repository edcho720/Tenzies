import React from 'react'
import Box from './extra.js/Box'

const Squares = () => {
    const boxes = [
        {
            id: 1,
            on: true
        },
        {
            id: 2,
            on: true
        },
        {
            id: 3,
            on: true
        },
        {
            id: 4,
            on: true
        }
    ];

    const [squares, setSquares] = React.useState(boxes)

    const eachBox = squares.map( box => {
        return <Box 
            // className=""
            key={box.id} 
            id={box.id} 
            toggle={toggle} 
            on={box.on} 
            />
    })

    function toggle(id) {
        console.log(id)
        setSquares(prevSquares => {
            return prevSquares.map( sq => {
                return sq.id === id ? {...sq, on: !sq.on} : sq
            })
        })
    }
    

  return (
    <div>{eachBox}</div>
  )
}

export default Squares