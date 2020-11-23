import React from 'react';

class progressBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            completion: this.props.completion
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.completion !== this.props.completion) {
            this.setState({completion: this.props.completion});
        }
    }


    render() {
        return(
            <div className="progress-bar__level" style={{width:this.state.completion+"%"}}></div>
        );
    }
}

export default progressBar;