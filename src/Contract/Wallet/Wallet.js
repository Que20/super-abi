import React, { Component } from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

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
        const renderTooltip = (props) => (
            <Tooltip id="button-tooltip" {...props}>
              The network you are connected to. Make sure the contract you're reaching is on that network.
            </Tooltip>
          );
        return (
            <OverlayTrigger
                placement="left"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip}
            >
                <span className='network-name'>{this.props.networkName}</span>
            </OverlayTrigger>
        )
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