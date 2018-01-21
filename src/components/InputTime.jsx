import React from 'react'

const InputTime = function(props){
    const min = 0
    const max = 59
    const onChange = function(evt){
        let num = evt.target.value
        if(parseInt(num) <= max){
            let obj = {
                type: evt.target.id,
                value: parseInt(num),
                text: (parseInt(num) < 10) ? ('0' + parseInt(num)) : (parseInt(num) + '')
            }
            return props.onChange(evt, obj)
        }
    }
    return <span id={props.id}>{props.value}</span>
}

export default InputTime