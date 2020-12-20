import React from 'react';
import axios from 'axios';

class button extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentStatus: "",
            id: this.props.id,
            userId: this.props.userId
        }
    }

    dispacher(status) {
        var handler = this.props.handler;
        handler(status, this.state.id)
        if (status !== 'modify' && status !== 'delete') {
            this.changeStatus(status)
        }
    }

    changeStatus(status) {
        this.setState({
            currentStatus: status
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
            this.dispacher("delete", this.state.id)
        })
        .catch((err) => {
            console.log(err)
        })
        //remove client side TODO
        
    }

    componentDidUpdate() {
    
    }
    
    componentDidMount() {
        
    }

    render() {
        
        if (this.props.status === "incomplete") {
            return(
                <div className="task__content__buttons">
                    <button onClick={() => this.dispacher('complete')} className="task__content__button__validate button is-success is-small">
                        <span className="icon is-small">
                            <i className="fa fa-check" aria-hidden="true"></i>
                        </span>
                    </button>
                    <button onClick={() => this.dispacher("modify")} className="task__content__button__modify button is-warning is-small">
                        <span className="icon is-small">
                            <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                        </span>
                    </button>
                    <button onClick={() => this.dispacher("archive")} className="task__content__button__archive button is-danger is-small">
                        <span className="icon is-small">
                            <i className="fa fa-archive" aria-hidden="true"></i>
                        </span>
                    </button>
                </div>
            )
        } else if (this.props.status === "complete") {
            return(
                <div className="task__content__buttons">
                    <button onClick={() => this.dispacher("incomplete")} className="task__content__button__incomplete button is-success is-small">
                        <span className="icon is-small">
                            <i className="fa fa-reply" aria-hidden="true"></i>
                        </span>
                    </button>
                    <button onClick={() => this.dispacher("modify")} className="task__content__button__modify button is-warning is-small">
                        <span className="icon is-small">
                            <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                        </span>
                    </button>
                    <button onClick={() => this.dispacher("archive")} className="task__content__button__archive button is-danger is-small">
                        <span className="icon is-small">
                            <i className="fa fa-archive" aria-hidden="true"></i>
                        </span>
                    </button>
                </div>
            );
        }else if (this.props.status === "archive") {
            return(
                <div className="task__content__buttons">
                    <button onClick={() => this.dispacher("complete")} className="task__content__button__desarchive button is-success is-small">
                        <span className="icon is-small">
                            <i className="fa fa-reply" aria-hidden="true"></i>
                        </span>
                    </button>
                    <button onClick={() => this.delete()} className="task__content__button__delete button is-danger is-small">
                        <span className="icon is-small">
                            <i className="fa fa-trash" aria-hidden="true"></i>
                        </span>
                    </button>
                </div>
            );
        }else {
            return(
                <p>Problemos !</p>
            )
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