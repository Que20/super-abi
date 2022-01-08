class ETH {

    constructor() {
        this.web3 = null
        this.account = null
        this.contract = null
        this.delegate = null
        this.network = null
    }
	
	init = (web3, delegate) => {
		this.web3 = web3
        this.delegate = delegate
	}

    log = (text) => {
        if (this.delegate != null) {
            this.delegate.prompt('info', text)
        } else {
            console.log(text)
        }
    }

	loadBlockchainData = async () => {
        if (this.web3 == null) {
            this.delegate.noMetamask()
            return
        }
		const accounts = await this.web3.eth.getAccounts()
        this.network = await this.web3.eth.net.getNetworkType()
		this.account = accounts[0]
        if (this.account != null) {
            this.delegate.loadWalletSuccess()
        } else {
            this.delegate.noMetamask()
        }
	}

    loadContractData = async (address, abi) => {
        this.contract = new this.web3.eth.Contract(abi, address)
        if(this.contract != null && this.account != null) {
            this.delegate.loadContractSuccess()
        } else {
            if(this.account === null) {
                this.delegate.metamaskError()
            }
            if(this.contract === null) {
                this.delegate.contractError()
            }
        }
    }

	mint = (price, color, index, callback) => {
        console.log("COLOR "+color)
        console.log("INDEX "+index)
		var mintTxHash = null
		this.contract.methods.mint(Number(color), index+"").send({from: this.account, value: (price*10**18)}, (error, result) => {
			mintTxHash = result
            // TODO : handle error
            if (error === null) {
                this.log("Token successfully minted. Now waiting for miners validation. This could take a few minutes.")
            } else {
                this.log("Oops, something happend. No token were minted. Try again.")
            } 
		})
		this.contract.events.allEvents((error, event) => {
            console.log(event)
			if (event != null && mintTxHash != null) {
				if (event.transactionHash === mintTxHash && event.returnValues.to === this.account) {
                    this.log("Got mint validation!")
					callback(event.returnValues)
				}
			}
		})
	}

    logEvents = (name) => {
        if (this.contract == null) { return }
        this.contract.getPastEvents(name, {fromBlock: this.contractInfo.block, toBlock: "latest"}, (err, events) => {
            console.log(events)
        });
    }
}
export default ETH