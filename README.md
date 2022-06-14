# My Trie Application

## How to run the app?

- Clone this repository in a local directory

```
git clone https://github.com/0jas0jas/TrieApplication
```

- Use NodeJs to run the `sendRequest.js` file
- Follow the instructions from there


## Server side functioning

The main program has been hosted on repl.it using their hacker plan and turning on the "Always on" function on their website. The server-side program has been stored in the `server-side` directory. The server is currently running on a repl in their system. 
The server listens to requests and sends responses accordingly using the JavaScript HTTP module. 
The server contains a trie class which I made and it's running that class for a single trie that all clients use and edit. The trie has simple commands such as `insert`, `delete`, `display` and so on. 

## Client side functioning

The client side uses many modules for the program's appearance. It sends POST requests to the server with two variables: word and code. The code describes what function has been requested for and the word is the word or the prefix given. This is done in a user-friendly way using colours and fiendly CLI elements.
The POST requests are made using axios module (third-party) because it's simpler than using native frameworks. 

## Trie's functionality

The tree is capable of the following commands

- insert(word: string): to insert a word or a keyword to the trie in global state
- remove(word: string): to remove a word from the trie in global state
- display(node: trie.node, prefix: string): to look up and display all words in the trie
- wordsWithPrefix(prefix: string): to look up and display all words starting with the given prefix