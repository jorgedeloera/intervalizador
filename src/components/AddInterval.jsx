import React, { Component } from 'react'

class AddInterval extends Component {
    constructor(props){
        super(props)
        this.state = {
            initialTime: this.props.initialTime
        }
        this.handleClick = this.handleClick.bind(this)
    }
    componentDidMount(){
        let minutes = parseInt(this.state.initialTime.minutes) - 1
        this.setState({
            initialTime: {
                all: this.state.initialTime.all - 60,
                minutes: (minutes < 10) ? ('0' + minutes) : (minutes + ''),
                seconds: this.state.initialTime.seconds
            }
        })
    }
    handleClick(){
        this.props.onAddInterval(this.state.initialTime)
        if(this.state.initialTime.all > 60){
            let minutes = parseInt(this.state.initialTime.minutes) - 1
            this.setState({
                initialTime: {
                    all: this.state.initialTime.all - 60,
                    minutes: (minutes < 10) ? ('0' + minutes) : (minutes + ''),
                    seconds: this.state.initialTime.seconds
                }
            })
        }
    }
    render(){
        return (
            <button className="button" onClick={this.handleClick}><i className="material-icons">add</i></button>
        )
    }
}

export default AddInterval