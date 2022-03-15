import React, { Component } from 'react';
import { Form, Button, Container, Col, Row } from 'react-bootstrap';
import Web3 from 'web3';

class Function extends Component {
    constructor(props) {
        super(props);
        this.state = { params: {}, tx_value: "0", tx_gas_max: "", tx_value_unit: 'Wei' }
    }

    handleChange = (e) => {
        if (['tx_value_unit', 'tx_value', 'tx_gas_max'].includes(e.target.name)) {
            // console.log(""+e.target.name+" => "+e.target.value)
            this.setState({ [e.target.name]: e.target.value });
            return
        }
        let np = this.state.params
        np[e.target.name] = e.target.value;
        this.setState({ params: np });
    }

    submit = () => {
        let p = this.state.params
        let paramsArray = []
        if (Object.keys(p).length === 1 && p[""] !== undefined) {
            paramsArray.push(p[""])
        } else {
            for (const input of this.props.inputs) {
                paramsArray.push(p[input.name])
            }
        }
        let value = this.state.tx_value+""
        if (this.state.tx_value_unit !== 'wei') {
            value = Web3.utils.toWei(value, this.state.tx_value_unit)
        }
        this.props.delegate.call(this.props.stateMutability, this.props.name, paramsArray, value, this.state.tx_gas_max)
    }

    render() { 
        return (
        <div>
            <details>
                <summary>
                    <Container fluid style={{'paddingLeft':'0px', 'paddingRight':'0px'}}>
                        <Row>
                            <Col>
                                {this.props.name}
                            </Col>
                            <Col style={{'textAlign':'right', 'fontWeight':'normal'}}>
                                {this.props.outputs[0]?.type ?? ''}
                            </Col>
                        </Row>
                    </Container>
                </summary>
                <Container fluid style={{'paddingLeft':'0px', 'paddingRight':'0px'}}>
                    {this.props.inputs.map((data, key) => {
                        return (
                            <Row key={{key}} >
                                <Col>
                                    <p style={{'textAlign': 'right', 'paddingTop':'8px'}}>
                                        {data.name === '' ? 'index' : data.name}
                                    </p>
                                </Col>
                                <Col>
                                    <Form.Control name={data.name} placeholder={data.type} onChange={this.handleChange} />
                                </Col>
                            </Row>
                        )
                    })}
                </Container>
                { this.props.inputs.length === 0 ? null : <hr/> }
                <Form>
                    {/* Value */}
                    <Form.Group>
                        <Container fluid className='value-selection'>
                            <Row>
                                <Col>
                                    <Form.Control label='Value' name='tx_value' placeholder="Value" onChange={this.handleChange}/>
                                </Col>
                                <Col>
                                    <Form.Control as="select" name="tx_value_unit" onChange={this.handleChange}>
                                        <option value="wei">wei</option>
                                        <option value="gwei">gwei</option>
                                        <option value="finney">finney</option>
                                        <option value="ether">ether</option>
                                    </Form.Control>
                                </Col>
                            </Row>
                        </Container>
                    </Form.Group>
                    <br/>
                    {/* Gas */}
                    <Form.Group>
                        <Form.Control label='Gas limit' name='tx_gas_max' placeholder="Gas limit" />
                    </Form.Group>
                    <br/>
                    <Button variant="primary" onClick={this.submit}>
                        Call
                    </Button>
                </Form>
            </details>
            <br/>
        </div>
        );
    }
}
 
export default Function;