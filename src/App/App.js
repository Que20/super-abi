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
            <>
            <a href="https://github.com/Que20/super-abi"><img loading="lazy" width={149} height={149} src="https://github.blog/wp-content/uploads/2008/12/forkme_right_gray_6d6d6d.png?resize=149%2C149" className="attachment-full size-full github-fork" alt="Fork me on GitHub" data-recalc-dims={1} /></a>
            <div className='app-container'>
                <Container fluid>
                    <Row>
                        <Col md={6} xs={12}>
                            <Contract delegate={this} abi={this.state.abi} account={this.state.account} network={this.state.network}/>
                        </Col>
                        <Col md={6} xs={12}>
                            <Console delegate={this} logs={this.state.logs}/>
                        </Col>
                    </Row>
                </Container>
                <h6> Made with ❤️ &nbsp; <a href='https://maarek.io'>maarek.io</a></h6>
            </div>
            </>
        )
    }

    call = (stateMutability, functionName, args, value, gasLimit) => {
        console.log(args)
        const fcallback = (error, result) => {
            if (error) {
                console.log(error)
                // TOOD BETTER ERROR MESSAGE
                // this.log(JSON.stringify(error))
                // this.log(error.code)
                let message = error.message.split("'")
                this.log(JSON.stringify(JSON.parse(message[1]), null, 2))
            }
            if (result) {
                console.log(result)
                this.log(JSON.stringify(result))
            }
        }
        const handleGasLimit = function(functionToCall, functionOption, gasLimit, callback) {    
            if (gasLimit !== '') {
                functionToCall.estimateGas(functionOption, (error, estimatedGas) => {
                    if (error) {
                        this.log("🚫 Unable to estimate gas fees for "+functionName)
                        this.log(error)
                        return
                    }
                    if (parseInt(gasLimit) < parseInt(estimatedGas)) {
                        callback()
                    } else {
                        this.log("🚫 base fee excedes gas limit - estimated fee: "+estimatedGas)
                    }
                })
            } else {
                callback()
            }
        }
        if (['pure', 'view'].includes(stateMutability)) {
            const f = this.state.eth.contract.methods[functionName].apply(this.state.eth.contract.methods, args)
            const o = { from: this.state.account }
            handleGasLimit(f, o, gasLimit, () => {
                this.log('🗣 '+functionName+'('+args.toString()+')')
                f.call(o, fcallback)
            })
        } else {
            const f = this.state.eth.contract.methods[functionName].apply(this.state.eth.contract.methods, args)
            const o = { from: this.state.account, value: value }
            handleGasLimit(f, o, gasLimit, () => {
                this.log('🗣 '+functionName+'('+args.toString()+')<br/>{ value: '+value+' }')
                f.send(o, fcallback)
            })
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