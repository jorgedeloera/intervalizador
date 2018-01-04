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
                minutes: '0',
                seconds: '0'
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
    handleInputChange(evt){
        if(evt.target.id == 'minutes'){
            this.setState({
                initialTime: {
                    all: (parseInt(evt.target.value) * 60) + parseInt(this.state.initialTime.seconds),
                    minutes: evt.target.value,
                    seconds: this.state.initialTime.seconds
                }
            })
        }
        if(evt.target.id == 'seconds'){
            this.setState({
                initialTime: {
                    all: (parseInt(this.state.initialTime.minutes) * 60) + parseInt(evt.target.value),
                    minutes: this.state.initialTime.minutes,
                    seconds: evt.target.value
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