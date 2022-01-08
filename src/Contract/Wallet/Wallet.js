import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class Wallet extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    connect = async () => {
        await this.props.delegate.connectWallet()
    }

    textWrappedAddress = (address) => {
        const splitted = address.split('')
        return address.slice(0, 5).concat('...').concat(address.slice((splitted.length-5), splitted.length))
    }

    connectedLabel = () => {
        return (<>Connected with {this.textWrappedAddress(this.props.address)}</>)
    }

    networkNameLabel = () => {
        return (<span className='network-name'>{this.props.networkName}</span>)
    }

    render() { 
        return (
            <div>
                <div className='wallet-header'>
                    <div className='wallet-status'>
                        <div>
                            {this.props.address !== '' ? this.connectedLabel() : ' '}
                            <br/>
                        </div>
                    </div>
                    <div className='wallet-cta'>
                        {this.props.networkName !== '' ? this.networkNameLabel() : ' '}
                        <Button variant="primary" type="submit" onClick={this.connect}>
                            Connect wallet
                        </Button>
                    </div>
                </div>
                <hr />
            </div>
         );
    }
}
 
export default Wallet;