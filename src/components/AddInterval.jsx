import React, {Component} from 'react'
import InputTime from './InputTime'

class AddInterval extends Component {
    constructor(props){
        super(props)
        this.state = {
            initialTime: {
                all: 0,
                minutes: '00',
                seconds: '00'
            }
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSendInterval = this.handleSendInterval.bind(this)
    }
    handleSendInterval(){
        this.props.onAddInterval(this.state.initialTime)
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
            <div className="add-interval card">
                <div className="time">
                    <div>
                        <InputTime id="minutes" value={this.state.initialTime.minutes} onChange={this.handleInputChange}/>
                    </div>
                    <div>
                        <span>:</span>
                    </div>
                    <div>
                        <InputTime id="seconds" value={this.state.initialTime.seconds} onChange={this.handleInputChange}/>
                    </div>
                </div>
                <button className="button" onClick={this.handleSendInterval}><i className="material-icons">add</i></button>
            </div>
        )
    }
}

export default AddInterval