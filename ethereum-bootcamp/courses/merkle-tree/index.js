class MerkleTree {
    constructor(leaves, concat) {
        this.leaves = leaves;
        this.concat = concat;
    }

    getRoot() {
        
        const recursion = (leaves) => {
            if(leaves.length < 2){
                return leaves[0];
            }
            const med = this.binaryIncrementor(leaves.length);
            const left = leaves.slice(0, med)
            const right = leaves.slice(med);
            const data = this.concat(recursion(left), recursion(right));
            return data;
        }
        return recursion(this.leaves)

    }

    binaryIncrementor(num){
        let bi = 1;
        while (num > bi * 2) {
            bi *= 2;
        }
        return bi;
    }

    getPow(num){
        let pow = 0;
        while (num > 2**pow){
            pow++
        }
        return pow
    }

    getProof(leafIndex) {
        const recursion = (li, layer = this.leaves, proof = []) => {
            if (layer.length <= 1) return proof

            const topLayer = [];
            const even = li % 2 === 0

            for(let i = 0; i < layer.length; i += 2){
                const left = layer[i];
                const right = ((i + 1) < layer.length) ? layer[i + 1] : null;
                const topNode = right ? this.concat(left, right) : left;
                topLayer.push(topNode)
            }

                const sibling = even ? layer[li + 1] : layer[li - 1];
                if(sibling){
                  proof.push({
                      data: sibling,
                  left: !even
              })
      }

            return recursion(Math.floor(li/2), topLayer, proof)
        }

        return recursion(leafIndex, this.leaves, [])
    }
}

module.exports = MerkleTree;
