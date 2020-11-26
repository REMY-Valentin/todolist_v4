import React from 'react';
import Name from './task_components/task_name';
import Category from './task_components/task_category';
import Button from './task_components/task_button';
import ProgressBar from './task_components/progress_bar';


class task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name : this.props.name,
            category : this.props.category,
            status : this.props.status,
            completion: this.props.completion
        };
        this.handler = this.handler.bind(this);
        this.changeCompletion = this.changeCompletion.bind(this);
    }

    handler(state) {       
        this.setState({status: state}, () => this.progress()) 
    }

    progress() {
        //console.log(this.state)
        if(this.state.status === "complete") {
            this.setState({ completion: "100"})
        } else {
           this.setState({ completion: this.state.completion })
        }
    }

    changeCompletion(evt) {
        var sizeTodo = document.querySelector(".progress-bar").clientWidth
        var sizeBrowzer = document.querySelector("#root").clientWidth
        var clickSizeBrowzer = evt.clientX
        //var ratio = sizeTodo/sizeBrowzer 
        //var clickSizeTodo = ((clickSizeBrowzer*sizeTodo)/sizeBrowzer)
        //var percent = (clickSizeTodo/sizeTodo)*100
        //console.log(percent)

        var borderLeft = (sizeBrowzer - sizeTodo) / 2
        var zeroTodo = clickSizeBrowzer - borderLeft
        var percent = ((zeroTodo/sizeTodo)*100)
        this.setState({ completion:(Math.round(percent)) })
    
    }
    
    render() {
        var handler = this.handler;
        var classTodo = this.state.status + ' task'
        return(
            <div className={classTodo} data-category="">
                <div className="task__content">
                    <Name value={this.state.name} />
                    <Category value={this.state.category} />
                    <Button handler={handler.bind(this)} />
                </div>
                <div /*onMouseMoveCapture={this.changeCompletion}*/ onClick={this.changeCompletion} className="progress-bar">
                    <ProgressBar completion={this.state.completion}/>
                    <span className="completion">{this.state.completion} %</span>
                </div>
            </div>
        );
    }
}

export default task;