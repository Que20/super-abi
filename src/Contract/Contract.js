import React, { Component } from 'react';
import Wallet from './Wallet/Wallet';
import Info from './Info/Info';
import Function from './Function/Function';

class Contract extends Component {
    constructor(props) {
        super(props);
    }

    functionList = () => {
        return (
            <>
            {this.props.abi.map((data, id) => {
                if (data.type === 'function') {
                    return (<Function delegate={this.props.delegate} key={id} name={data.name} inputs={data.inputs} outputs={data.outputs} stateMutability={data.stateMutability} />)
                }
            })}
            </>
        )
    }

    contractInfo = () => {
        return (<Info delegate={this.props.delegate}/>)
    }

    render() { 
        return (
            <div className='contract-container'>
                <Wallet address={this.props.account} networkName={this.props.network} delegate={this.props.delegate}/>
                {this.props.account !== '' ? this.contractInfo() : null }
                <br/>
                {this.props.abi === null ? null : this.functionList() }
            </div>
        );
    }
}
 
export default Contract;