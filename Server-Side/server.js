#!/usr/bin/env node

import http from 'http';
import { parse } from 'querystring';

var arr = new Array();

class Node{
    constructor(){
        this.children = {};
        this.isWordEnd = false;
    }
}

class Trie{
    constructor(){
        this.root = new Node();
    }

    insert(word) {
        let current = this.root;
        for (let i = 0; i < word.length; i++) {
            let char = word[i];
            if (!(char in current.children)) {
                current.children[char] = new Node();
            }
            current = current.children[char];
        }

        current.isWordEnd = true;
    }

    contains(word) {
        let current = this.root;
        for (let i = 0; i < word.length; i++) {
            let searchChar = word[i];
            if (!(searchChar in current.children)) {
                return false;
            }
            current = current.children[searchChar];
        }

        return current.isWordEnd;
    }

    remove(word){
        let current = this.root;
        for (let i = 0; i < word.length; i++) {
            let searchChar = word[i];
            if (!(searchChar in current.children)) {
                return false;
            }
            current = current.children[searchChar];
        }

        current.isWordEnd = false;
    }

    display(node = trie.root, prefix = ""){

        if (node.isWordEnd) {
            console.log(prefix);
            arr.push(prefix);
        }

        for (let child in node.children) {
            this.display(node.children[child], prefix + child);
        }

    }

    wordsWithPrefix(prefix){
        let current = this.root;
        for (let i = 0; i < prefix.length; i++) {
            let searchChar = prefix[i];
            if (!(searchChar in current.children)) {
                return [];
            }
            current = current.children[searchChar];
        }

        let words = [];
        this.display(current, prefix);
        return words;
    }
}

const trie = new Trie();

function collectRequestData(request, callback) {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(JSON.parse(body)); 
        });
    }


const requestListener = function (req, res) {

  if(req.method === 'POST') {
    collectRequestData(req, result => {
      if (result.code == 1){
        trie.insert(result.word);
        res.end("okay");
      }else if(result.code == 2){
        if(trie.contains(result.word)){
          res.end("yes");
        }else{
          res.end("no");
        }
      }else if(result.code == 3){

        trie.remove(result.word);
        res.end("okay");
        
      }else if(result.code == 4){
        trie.display();
        console.log(arr)
        let sendString = "";
        for(let i = 0; i < arr.length; i++){
          sendString = sendString + " " + arr[i];
        }
        console.log(sendString);
        res.end(sendString);
        arr = [];
        sendString = "";
      }else if(result.code == 5){
        console.log(result.word);
        trie.wordsWithPrefix(result.word);
        console.log(arr)
        let sendString = "";
        for(let i = 0; i < arr.length; i++){
          sendString = sendString + " " + arr[i];
        }
        res.end(sendString);
        arr = [];
        sendString = "";
      }
      console.log(result.code);
    });
  }
}

      
const server = http.createServer(requestListener);
server.listen(8080);
