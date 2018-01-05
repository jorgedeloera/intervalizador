import React from 'react'

const InputTime = function(props){
    let onChange = function(evt){
        return props.onChange(evt, { type: evt.target.id, value: parseInt(evt.target.value) })
    }
    return <input id={props.id} type="number" value={props.value} min={0} max={59} onChange={onChange}/>
}

export default InputTime