import React, { Component } from 'react'
import AddInterval from './AddInterval'
import PrincipalClock from './PrincipalClock'

class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            totalPossibletime: 60 * 60,
            initialTime: {
                all: 0,
                minutes: '00',
                seconds: '00'
            },
            intervals: [
                {all: 60, minutes: "1", seconds: "0"}
            ]
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.onAddInterval = this.onAddInterval.bind(this)
    }
    onAddInterval(newInterval){
        this.setState({
            intervals: [...this.state.intervals, newInterval]
        })
    }
    handleInputChange(evt, val){
        console.log(val)
        if(val.type == 'minutes'){
            this.setState({
                initialTime: {
                    all: (val.value * 60) + parseInt(this.state.initialTime.seconds),
                    minutes: (val.value < 10) ? ('0' + val.value) : (val.value + ''),
                    seconds: this.state.initialTime.seconds
                }
            })
        }
        if(val.type == 'seconds'){
            this.setState({
                initialTime: {
                    all: (parseInt(this.state.initialTime.minutes) * 60) + val.value,
                    minutes: this.state.initialTime.minutes,
                    seconds: (val.value < 10) ? ('0' + val.value) : (val.value + '')
                }
            })
        }
    }
    render(){
        return (
            <div>
                <PrincipalClock totalTime={this.state.totalPossibletime} initialTime={this.state.initialTime} handleInputChange={this.handleInputChange}/>
                <div>
                    {
                        (this.state.initialTime.all > 0) ?
                        <button>Ready</button>
                        :
                        <span>Selecciona tiempo inicial</span>
                    }
                </div>
                <div>
                    <AddInterval onAddInterval={this.onAddInterval}/>
                    <ul>
                        { this.state.intervals.map((item, index) => (
                            <li key={index}>{JSON.stringify(item)}</li>
                        )) }
                    </ul>
                </div>
            </div>
        )
    }
}

export default App