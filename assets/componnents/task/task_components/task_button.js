import React from 'react';
import axios from 'axios';

class button extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: this.props.status,
            id: this.props.id,
            userId: this.props.userId
        }
    }

    dispacher(status) {
        var handler = this.props.handler;
        handler(status)
        this.changeStatus(status)
    }

    changeStatus(status) {
        this.setState({
            status: status
        });
    }

    delete() {
        //console.log('delete')
        //remove server side
        axios.post('https://localhost:8000/api/'+this.state.userId+'/delete', {
            id: this.state.id,
        })
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })
        //remove client side TODO
        
    }

    render() {
        if (this.state.status === "incomplete") {
            return(
                <div className="task__content__buttons">
                    <button onClick={() => this.dispacher('complete')} className="task__content__button__validate button is-success is-small">
                        <span className="icon is-small">
                            <i className="fa fa-check-square-o"></i>
                        </span>
                    </button>
                    <button onClick={() => this.changeStatus("modify")} className="task__content__button__modify button is-warning is-small">
                        <span className="icon is-small">
                            <i className="fa fa-pencil-square-o"></i>
                        </span>
                    </button>
                    <button onClick={() => this.dispacher("archive")} className="task__content__button__archive button is-danger is-small">
                        <span className="icon is-small">
                            <i className="fa fa-archive"></i>
                        </span>
                    </button>
                </div>
            )
        } else if (this.state.status === "complete") {
            return(
                <div className="task__content__buttons">
                    <button onClick={() => this.dispacher("incomplete")} className="task__content__button__incomplete button is-success is-small">
                        <span className="icon is-small">
                            <i className="fa fa-step-backward"></i>
                        </span>
                    </button>
                    <button onClick={() => this.changeStatus("")} className="task__content__button__modify button is-warning is-small">
                        <span className="icon is-small">
                            <i className="fa fa-pencil-square-o"></i>
                        </span>
                    </button>
                    <button onClick={() => this.dispacher("archive")} className="task__content__button__archive button is-danger is-small">
                        <span className="icon is-small">
                            <i className="fa fa-archive"></i>
                        </span>
                    </button>
                </div>
            );
        }else if (this.state.status === "archive") {
            return(
                <div className="task__content__buttons">
                    <button onClick={() => this.dispacher("complete")} className="task__content__button__desarchive button is-success is-small">
                        <span className="icon is-small">
                            <i className="fa fa-undo"></i>
                        </span>
                    </button>
                    <button onClick={() => this.delete()} className="task__content__button__delete button is-danger is-small">
                        <span className="icon is-small">
                            <i className="fa fa-trash"></i>
                        </span>
                    </button>
                </div>
            );
        }
        
    }
}

export default button;

/*
return (
            <div class="task__content__buttons">
                <button class="task__content__button__incomplete button is-success is-small">
                <span class="icon is-small">
                    <i class="fa fa-step-backward"></i>
                </span>
                </button>
                <button class="task__content__button__desarchive button is-success is-small">
                <span class="icon is-small">
                    <i class="fa fa-undo"></i>
                </span>
                </button>
                <button class="task__content__button__validate button is-success is-small">
                <span class="icon is-small">
                    <i class="fa fa-check-square-o"></i>
                </span>
                </button>
                <button class="task__content__button__modify button is-warning is-small">
                <span class="icon is-small">
                    <i class="fa fa-pencil-square-o"></i>
                </span>
                </button>
                <button class="task__content__button__archive button is-danger is-small">
                <span class="icon is-small">
                    <i class="fa fa-archive"></i>
                </span>
                </button>
                <button class="task__content__button__delete button is-danger is-small">
                <span class="icon is-small">
                    <i class="fa fa-trash"></i>
                </span>
                </button>
            </div>
        );
*/