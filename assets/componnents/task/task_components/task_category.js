import React from 'react';

class categrory extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="task__content__category">
                <p>{this.props.value}</p>
            </div>
        );
    }
}

export default categrory;