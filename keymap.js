class TrieNode {
    constructor() {
        this.$ = false;
        this.next = {};
        this.map = null;
    }

    setMap(fun) {
        this.map = fun;
    }
}

class KeyMap {
    constructor() {
        this.trie = [ new TrieNode() ];
    }

    bind(sequence, fun) {
        let remainingLength = sequence.length,
            sequenceIndex = 0,
            trieIndex = 0,
            currentKey = sequence[sequenceIndex],
            next = this.trie[trieIndex].next;

        while(remainingLength > 0) {
            currentKey = sequence[sequenceIndex];
            next = this.trie[trieIndex].next;

            if(!(currentKey in next)) {
                this.trie.push(new TrieNode());
                next[currentKey] = this.trie.length - 1;
            }

            remainingLength--;
            sequenceIndex++;
            trieIndex = next[currentKey];
        }

        this.trie[trieIndex].$ = true;
        this.trie[trieIndex].setMap(fun);
    }

    getBind(sequence) {
        let remainingLength = sequence.length,
            sequenceIndex = 0,
            trieIndex = 0,
            currentKey = sequence[sequenceIndex],
            next = this.trie[trieIndex].next;

        while(remainingLength > 0) {
            currentKey = sequence[sequenceIndex];
            next = this.trie[trieIndex].next;

            if(currentKey in next) {
                remainingLength--;
                sequenceIndex++;
                trieIndex = next[currentKey];
            } else {
                return null;
            }
        }

        if(this.trie[trieIndex].$) {
            return this.trie[trieIndex].map;
        } else {
            return null;
        }
    }
}

