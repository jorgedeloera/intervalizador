import React from 'react'

const InputTime = function(props){
    const onChange = function(evt){
        let obj = {
            type: evt.target.id,
            value: parseInt(evt.target.value),
            text: (parseInt(evt.target.value) < 10) ? ('0' + parseInt(evt.target.value)) : (parseInt(evt.target.value) + '')
        }
        console.log(obj)
        return props.onChange(evt, obj)
    }
    return <input id={props.id} type="number" value={props.value} min={0} max={59} onChange={onChange}/>
}

export default InputTime