import {ethers} from "ethers"

const providerArb = new ethers.providers.StaticJsonRpcProvider(
    "https://arbitrum-one.publicnode.com", 
    {
      chainId: 42161,
      name: "Arbitrum",
    }
);
  
let EtherScanProvider = new ethers.providers.EtherscanProvider(42161);

//input address to track here
const address = ''
let balance

//starts at the block where the first jar fermented
async function getBalance() {
    providerArb.getBalance(address).then((newBalance) => {
     const balanceInEth = ethers.utils.formatEther(newBalance)
     if (balanceInEth != balance) {
        balance = balanceInEth
        console.log(`Balance: ${balance} ETH`)

            EtherScanProvider.getHistory(address).then((history) => 
            {
                let txURL = "https://arbiscan.io/tx/"+history[(history.length)-1].hash
                console.log(txURL)
            })
        }
    }) 
}

setInterval(() => {
    getBalance()
}, 60000);

