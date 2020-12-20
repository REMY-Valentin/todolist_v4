import React from 'react';

class name extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.value
        }
        this.dispatcher = this.dispatcher.bind(this);
    }

    dispatcher(evt) {
        var nameHandler = this.props.nameHandler;
        nameHandler(evt)
        this.setState({
            name: evt.target.value
        })
        //console.log(evt)
    }

    render() {
        return(
            <div className="task__content__name">
                <input className="input" type="text" value={this.state.name} onChange={this.dispatcher} onBlur={this.dispatcher} name="name" />
                <p> {this.props.value} </p>
            </div>
        );
    }
}

export default name;