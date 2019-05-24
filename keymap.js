/**
 * I am using a trie to store keymaps and their
 *  corresponding functions. This script contains code
 *  for trie.
 */

"use strict";

/**
 * This defines the structure of each node in the trie.
 *
 * @property {boolean}      $       indicates whether this is end of sequence or not.
 * @property {dictionary}   next    contains `char` -> `index` map for next node in trie.
 * @property {function}     map     contains the function which is mapped by this sequence.
 */
class TrieNode {
    constructor() {
        this.$ = false;
        this.next = {};
        this.map = null;
    }

    /**
     * This method sets a function as this node's map
     *
     * @param {function}    fun     A function to be executed
     */
    setMap(fun) {
        this.map = fun;
    }
}

/**
 * This class is actually a Trie.
 * It offers an easy way to add and get keybinds and maps.
 *
 * @property {list}         trie       A list of `TrieNodes`, the actual trie itself
 */
class KeyMap {
    constructor() {
        this.trie = [ new TrieNode() ];
    }

    /**
     * This function takes a sequence and a function and binds the
     *  function to the sequence by adding it into the trie. If the same
     *  sequence is repeated later, it gets overwritten.
     *
     * @param {list}        sequence    A list of character(s)
     * @param {function}    fun         A function which gets binded to the sequence
     */
    bind(sequence, fun) {
        let remainingLength = sequence.length,
            sequenceIndex = 0,
            trieIndex = 0,
            currentKey = sequence[sequenceIndex],
            next = this.trie[trieIndex].next;

        while(remainingLength > 0) {
            currentKey = sequence[sequenceIndex];
            next = this.trie[trieIndex].next;

            //  The link from this node to currentKey doesn't exist
            //  So, add a new TrieNode
            if(!(currentKey in next)) {
                this.trie.push(new TrieNode());
                next[currentKey] = this.trie.length - 1;
            }

            remainingLength--;
            sequenceIndex++;
            trieIndex = next[currentKey];
        }

        //  At the end, indicate this is the end and set the map
        this.trie[trieIndex].$ = true;
        this.trie[trieIndex].setMap(fun);
    }

    /**
     * This function takes a sequence and a function and returns
     *  the binding corresponding to that function. If no such
     *  sequence exists, null is returned.
     *
     * @param {list}        sequence    A list of character(s)
     */
    getBind(sequence) {
        let remainingLength = sequence.length,
            sequenceIndex = 0,
            trieIndex = 0,
            currentKey = sequence[sequenceIndex],
            next = this.trie[trieIndex].next;

        while(remainingLength > 0) {
            currentKey = sequence[sequenceIndex];
            next = this.trie[trieIndex].next;

            //  Link from this node found, traverse it!
            if(currentKey in next) {
                remainingLength--;
                sequenceIndex++;
                trieIndex = next[currentKey];
            } else {
                //  No such sequence exists
                return null;
            }
        }

        //  Length exhausted but might not be same
        if(this.trie[trieIndex].$) {
            return this.trie[trieIndex].map;
        } else {
            return null;
        }
    }
}
