import React, {Component} from 'react'

class AddInterval extends Component {
    constructor(props){
        super(props)
        this.state = {
            initialTime: {
                all: 0,
                minutes: '0',
                seconds: '0'
            }
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSendInterval = this.handleSendInterval.bind(this)
    }
    handleSendInterval(){
        this.props.onAddInterval(this.state.initialTime)
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
                <div className="time">
                    <div>
                        <input id="minutes" type="number" value={this.state.initialTime.minutes} min={0} max={59} onChange={this.handleInputChange}/>
                    </div>
                    <div>
                        <span>:</span>
                    </div>
                    <div>
                        <input id="seconds" type="number" value={this.state.initialTime.seconds} min={0} max={59} onChange={this.handleInputChange}/>
                    </div>
                </div>
                <button onClick={this.handleSendInterval}>add</button>
            </div>
        )
    }
}

export default AddInterval