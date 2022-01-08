import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

class Info extends Component {
    constructor(props) {
        super(props);
        // this.state = { abi: '', address: "" }
        this.state = { abi: this.abi(), address: "0x7b94F2e3c3A9fd2E8Ce06FB7b819A27C24BbC115" }
    }

    abi = () => {
        return `
        [
            {
              "inputs": [],
              "stateMutability": "nonpayable",
              "type": "constructor"
            },
            {
              "inputs": [
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                }
              ],
              "name": "backers",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "owner",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "sendMoney",
              "outputs": [],
              "stateMutability": "payable",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "getBalance",
              "outputs": [
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "endFundraising",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "uint8",
                  "name": "n",
                  "type": "uint8"
                }
              ],
              "name": "abc",
              "outputs": [
                {
                  "internalType": "uint8",
                  "name": "",
                  "type": "uint8"
                }
              ],
              "stateMutability": "pure",
              "type": "function"
            }
          ]`
    }

    load = async () => {
        await this.props.delegate.loadContract(this.state.address, this.state.abi)
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() { 
        return (
            <div>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Contract address</Form.Label>
                        <Form.Control placeholder="" value={this.state.address} name='address' onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>ABI</Form.Label>
                        <Form.Control as="textarea" rows="3" value={this.state.abi} name='abi' onChange={this.handleChange}/>
                    </Form.Group>
                
                    <Button variant="primary" onClick={this.load}>
                        Load contract
                    </Button>
                </Form>
            </div>
        );
    }
}
 
export default Info;