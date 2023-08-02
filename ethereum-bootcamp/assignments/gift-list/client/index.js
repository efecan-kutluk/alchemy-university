const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

const argv = require("minimist")(process.argv.slice(2))

async function main() {
  // TODO: how do we prove to the server we're on the nice list? 
  const req = {
    name: argv.name ?? "anonymous"
  }

  let index = niceList.findIndex(n => n === req.name);
  if(argv.corrupt && index === -1){
    index = Math.floor(Math.random() * niceList.length)
  }

  const tree = new MerkleTree(niceList);
  const proof = tree.getProof(index);
  req.proof = proof

  const { data: gift } = await axios.post(`${serverUrl}/gift`, req);

  console.log({ gift });
}

main();
