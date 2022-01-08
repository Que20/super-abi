import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class Console extends Component {
    constructor(props) {
        super(props);      
        this.consoleBottom = React.createRef();
        this.consoleText = React.createRef();
    }
      
    componentDidUpdate() {
        this.scrollToBottom();
    }

    componentDidMount() {
        this.scrollToBottom();
    }

    render() { 
        return (
            <div>
                <div className='console-container'>
                <code ref={this.consoleText}>
                    {
                        this.props.logs.split("<br/>").map(function(item, idx) {
                            return (
                                <span key={idx}>
                                    {item}
                                    <br/>
                                </span>
                             )
                        })
                    }
                <div ref={this.consoleBottom} />
                </code>
                </div>
                <div className='console-actions'>
                <Button variant="secondary" size="sm" onClick={this.copy}>
                    Copy
                </Button>
                <Button variant="secondary" size="sm" onClick={this.clear}>
                    Clear
                </Button>
                <Button variant="secondary" size="sm" onClick={this.scrollToBottom}>
                    Bottom
                </Button>
                </div>
            </div>
            
         );
    }

    copy = () => {
        let content = this.consoleText.current.innerText
        navigator.clipboard.writeText(content)
    }

    clear = () => {
        this.props.delegate.clearLogs()
    }

    scrollToBottom = () => {
        this.consoleBottom.current.scrollIntoView({ behavior: "smooth" });
    }
}
 
export default Console;