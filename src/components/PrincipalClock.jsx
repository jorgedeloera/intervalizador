import React from 'react'
import {Circle} from 'react-progressbar.js'
import InputTime from './InputTime'

const circleDefinition = {
    size: { width: '100%', height: '100%' },
    options: {
        strokeWidth: 7,
        color: '#5DD470',
        trailColor: '#fff',
        trailWidth: 3,
        duration: 150
    }
}

const PrincipalClock = function(props){
    return (
        <div className="principal-clock">
            <Circle progress={(props.initialTime.all / props.totalTime)}
                containerStyle={circleDefinition.size}
                options={circleDefinition.options}
            />
            <div className="time">
                <div>
                    <InputTime id="minutes" value={props.initialTime.minutes} onChange={props.handleInputChange}/>
                </div>
                <div>
                    <span>:</span>
                </div>
                <div>
                    <InputTime id="seconds" value={props.initialTime.seconds} onChange={props.handleInputChange}/>
                </div>
            </div>
        </div>
    )
}

export default PrincipalClock