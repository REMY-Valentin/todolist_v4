import React from 'react';

class name extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="task__content__name">
                <input className="input" type="text" value="" placeholder="Nom de la tâche" name="name" />
                <p> {this.props.value} </p>
            </div>
        );
    }
}

export default name;