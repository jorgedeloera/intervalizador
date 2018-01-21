import React, { Component } from 'react'
import PrincipalClock from './PrincipalClock'
import AddInterval from './AddInterval'

class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            totalPossibletime: 60 * 60,
            timerPaused: true,
            intervalTimer: undefined,
            initialTime: {
                all: 480,
                minutes: '08',
                seconds: '00'
            },
            intervals: [
            ]
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.onAddInterval = this.onAddInterval.bind(this)
        this.onDeleteInterval = this.onDeleteInterval.bind(this)
        this.handleTime = this.handleTime.bind(this)
    }
    handleTime(){
        if(this.state.timerPaused){
            let intervalTimerFunction = ()=> {
                if(this.state.initialTime.all > 1){
                    let interval = this.state.intervals.find(el => (el.all + 1) == this.state.initialTime.all)
                    if(interval != undefined){
                        window.navigator.vibrate(200)
                    }
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
                    window.navigator.vibrate([200, 200])
                    clearInterval(this.state.intervalTimer)
                    this.setState({
                        timerPaused: !this.state.timerPaused,
                        initialTime: {
                            all: 0,
                            minutes: '00',
                            seconds: '00'
                        }
                    })
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
    onAddInterval(interval){
        this.setState({
            intervals: [...this.state.intervals, interval]
        })
    }
    onDeleteInterval(evt){
        let newIntervals = this.state.intervals
        let element = newIntervals.findIndex( el => el.all == evt.target.id)
        newIntervals.splice(element, 1)
        this.setState({
            intervals: newIntervals
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
                    :
                    null
                }
                <div className="intervals-box">
                    <div className="title">
                        <span>Intervalos</span>
                        <AddInterval onAddInterval={this.onAddInterval} initialTime={this.state.initialTime}/>
                    </div>
                    <ul className="intervals">
                        { this.state.intervals.map((item, index) => (
                            <li key={index} className="card interval">
                                <div className="text">
                                    <span>{item.minutes}:{item.seconds}</span>
                                </div>
                                <button id={item.all} className="button secondary" onClick={this.onDeleteInterval}><i className="material-icons">delete</i></button>
                            </li>
                        )) }
                    </ul>
                </div>
            </div>
        )
    }
}

export default App