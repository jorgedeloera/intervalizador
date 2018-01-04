import React from 'react'
import {Circle} from 'react-progressbar.js'

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
                    <input id="minutes" type="number" value={props.initialTime.minutes} min={0} max={59} onChange={props.handleInputChange}/>
                </div>
                <div>
                    <span>:</span>
                </div>
                <div>
                    <input id="seconds" type="number" value={props.initialTime.seconds} min={0} max={59} onChange={props.handleInputChange}/>
                </div>
            </div>
        </div>
    )
}

export default PrincipalClock