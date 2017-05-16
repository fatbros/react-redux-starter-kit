import React from 'react'
import PropTypes from 'prop-types'

export const Counter = (props) => (
  <div style={{ margin: '0 auto' }} >
    <h2>Counter: {props.counter}</h2>
    <button className='btn btn-primary' onClick={props.increment}>
      Increment
    </button>
    {' '}
    <button className='btn btn-secondary' onClick={props.doubleAsync}>
      Double (Async)
    </button>
  </div>
)
Counter.propTypes = {
  counter: PropTypes.number.isRequired,
  increment: PropTypes.func.isRequired,
  doubleAsync: PropTypes.func.isRequired,
}

export default Counter
