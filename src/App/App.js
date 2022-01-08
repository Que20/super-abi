import { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Console from '../Console/Console';
import Contract from '../Contract/Contract';
import Web3 from 'web3';
import ETH from './eth'
import './App.css';

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            eth: null,
            account: "",
            network: "",
            logs: "",
            abi: null
        }
    }

    setupEthereum = async () => {
        let myEth = new ETH()
		if (window.ethereum) {
			window.web3 = new Web3(window.ethereum)
			await window.ethereum.enable()
		} else if (window.web3) {
			window.web3 = new Web3(window.web3.currentProvider)
		}
		await myEth.init(window.web3, this)
		await myEth.loadBlockchainData()
		this.setState({ account: myEth.account })
        this.setState({ network: myEth.network })
		this.setState({ eth: myEth })
    }

    render() { 
        return (
            <div className='app-container'>
            <Container fluid>
                <Row>
                    <Col>
                        <Contract delegate={this} abi={this.state.abi} account={this.state.account} network={this.state.network}/>
                    </Col>
                    <Col>
                        <Console delegate={this} logs={this.state.logs}/>
                    </Col>
                </Row>
            </Container>
            </div>
        )
    }

    call = (stateMutability, functionName, args, value, gas) => {
        this.log('🗣 '+functionName+'('+args.toString()+')<br/>{ value: '+value+', gas: '+gas+' }')
        const callback = (error, result) => {
            if (error) {
                console.log(error)
                this.log(JSON.stringify(error))
            }
            if (result) {
                console.log(result)
                this.log(result)
            }
        }
        if (['pure', 'view'].includes(stateMutability)) {
            this.state.eth.contract.methods[functionName].apply(this.state.eth.contract.methods, args).call({ from: this.state.account, value: value }, callback)
        } else {
            this.state.eth.contract.methods[functionName].apply(this.state.eth.contract.methods, args).send({ from: this.state.account, value: value }, callback)
        }
    }

    clearLogs = () => {
        this.setState({ logs: '' })
    }

    log = (data) => {
        let a = this.state.logs
        a = (a === "" ? "" : a+'<br/>')
        a += data
        this.setState({ logs: a })
    }

    loadContract = async (address, abi) => {
        if (this.state.eth == null) {
            this.log('🚫 Please connect a wallet first.')
            return
        }
        this.setState({ abi: JSON.parse(abi)})
        await this.state.eth.loadContractData(address, JSON.parse(abi))
    }

    connectWallet = async () => {
        await this.setupEthereum()
    }

    unableToConnectNetwork = () => {
        this.log('🚫 Unable to connect to the correct network.')
    }

    unableToAddNetwork = () => {
        this.log('🚫 Unable to add the correct network to your metamask wallet')
    }

    loadContractSuccess = () => {
        this.log('✅ Contract loaded.')
    }

    loadWalletSuccess = () => {
        this.log('✅ Wallet loaded.')
    }

    metamaskError = () => {
        this.prompt('🚫 Unable to connect to your wallet\nIs your metamask correctly set up?')
    }

    noMetamask = () => {
        this.prompt('🚫 Unable to connect to your wallet\nIs your metamask correctly set up?')
    }

    contractError = () => {
        this.prompt('🚫 Unable to retreive the smart contract')
    }
}

export default App;