import React, { Component } from 'react'
import AddInterval from './AddInterval'
import PrincipalClock from './PrincipalClock'

class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            totalPossibletime: 60 * 60,
            timerPaused: true,
            intervalTimer: undefined,
            initialTime: {
                all: 30,
                minutes: '00',
                seconds: '30'
            },
            intervals: [
            ]
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.onAddInterval = this.onAddInterval.bind(this)
        this.handleTime = this.handleTime.bind(this)
    }
    handleTime(){
        if(this.state.timerPaused){
            let intervalTimerFunction = ()=> {
                if(this.state.initialTime.all > 0){
                    if(parseInt(this.state.initialTime.seconds) > 0){
                        let seconds = parseInt(this.state.initialTime.seconds) - 1
                        this.setState({
                            initialTime: {
                                all: this.state.initialTime.all - 1,
                                minutes: this.state.initialTime.minutes,
                                seconds: (seconds < 10) ? ('0' + seconds) : (seconds + '')
                            }
                        })
                    }
                    else{
                        let minutes = parseInt(this.state.initialTime.minutes) - 1
                        this.setState({
                            initialTime: {
                                all: this.state.initialTime.all - 1,
                                minutes: (minutes < 10) ? ('0' + minutes) : (minutes + ''),
                                seconds: '59'
                            }
                        })
                    }
                }
                else{
                    clearInterval(this.state.intervalTimer)
                    this.setState({
                        timerPaused: !this.state.timerPaused
                    })
                    window.navigator.vibrate([200, 200])
                }
            }
            let intervalTimer = setInterval(intervalTimerFunction, 1000)
            this.setState({
                intervalTimer: intervalTimer
            })
        }
        else{
            clearInterval(this.state.intervalTimer)
        }
        this.setState({
            timerPaused: !this.state.timerPaused
        })
        window.navigator.vibrate(200)
    }
    onAddInterval(newInterval){
        this.setState({
            intervals: [...this.state.intervals, newInterval]
        })
    }
    handleInputChange(evt, obj){
        if(obj.type == 'minutes'){
            this.setState({
                initialTime: {
                    all: (obj.value * 60) + parseInt(this.state.initialTime.seconds),
                    minutes: obj.text,
                    seconds: this.state.initialTime.seconds
                }
            })
        }
        if(obj.type == 'seconds'){
            this.setState({
                initialTime: {
                    all: (parseInt(this.state.initialTime.minutes) * 60) + obj.value,
                    minutes: this.state.initialTime.minutes,
                    seconds: obj.text
                }
            })
        }
    }
    render(){
        return (
            <div>
                <PrincipalClock totalTime={this.state.totalPossibletime} initialTime={this.state.initialTime} handleInputChange={this.handleInputChange}/>
                {
                    (this.state.initialTime.all > 0) ?
                    <div>
                        <div className="action-box">
                            <button className="button primary" onClick={this.handleTime}>
                                {
                                    this.state.timerPaused ?
                                    <i className="material-icons">play_arrow</i>
                                    :
                                    <i className="material-icons">pause</i>
                                }                               
                            </button>
                        </div>
                        <div className="intervals-box">
                            <div className="title">
                                <span>Intervalos</span>
                            </div>
                            <AddInterval onAddInterval={this.onAddInterval}/>
                            <ul className="intervals">
                                { this.state.intervals.map((item, index) => (
                                    <li key={index} className="card">
                                        <div className="text">
                                            <span>{item.minutes}:{item.seconds}</span>
                                        </div>
                                        <button className="button secondary"><i className="material-icons">delete</i></button>
                                    </li>
                                )) }
                            </ul>
                        </div>
                    </div>
                    :
                    <div className="issue">
                        <span>Selecciona tiempo inicial</span>
                    </div>
                }
            </div>
        )
    }
}

export default App