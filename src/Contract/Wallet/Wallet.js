import React, { Component } from 'react';
import { Container, Row, Col, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

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
        return (<span style={{"fontWeight": "bold"}}>Connected with {this.textWrappedAddress(this.props.address)}</span>)
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
                <div className='network-name'>{this.props.networkName}</div>
            </OverlayTrigger>
        )
    }

    render() { 
        return (
            <Container fluid style={{"paddingLeft": "0px", "paddingRight": "0px"}}>
                <Row>
                    <Col style={{"paddingTop":"5px"}}>
                        {this.props.address !== '' ? this.connectedLabel() : ' '}
                    </Col>
                    <Col xs="auto" style={{"textAlign":"right", "verticalAlign":"center"}}>
                        {this.props.networkName !== '' ? this.networkNameLabel() : ' '}
                    </Col>
                    <Col xs="auto" style={{"textAlign":"right"}}>
                        <Button variant="primary" type="submit" onClick={this.connect}>
                            Connect wallet
                        </Button>
                    </Col>
                </Row>
            </Container>
         );
    }
}
 
export default Wallet;