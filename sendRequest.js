#!/usr/bin/env node

import axios from 'axios';
import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';

let data = "";

function postReq(code, word = ''){
    word = word.toLowerCase();
    let request = { "code": code,
                    "word": word};

    axios.post("https://trie-web-app.mahi-agarwal.repl.co/", request)
    .then((response) => {
        data = response.data;
        if(code == 4 || code == 5){
            console.log(data);
        }
    })
}

const sleep = (ms = 4000) => new Promise((r) => setTimeout(r, ms));

async function welcome(){
    console.clear();
    const title = 'Welcome  to  my  CLI  Trie  Application';

    figlet(title, (err, data) => {
        console.log(gradient.pastel.multiline(data));
    });

    await sleep();
    console.clear();
}

await welcome()

async function askChoice(){
    const answers = await inquirer.prompt({
        name: 'choice',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'Insert a word',
            'Search for a word',
            'Remove a word',
            'Display all words',
            'Display words with a prefix',
            'Exit app'
        ],
    });

    return handleChoice(answers.choice);
}

async function askWordToInsert(){
    const answers = await inquirer.prompt({
        name: 'word',
        type: 'input',
        message: 'What would be your word?',
        default(){
            return '';
        }
    })

    const spinner = createSpinner('Working...').start();

    postReq(1, answers.word);

    await sleep();

    if (data == "okay"){
        spinner.success({text: "Done!"});
    }else{
        spinner.error({text: "Error!"});
    }

    return answers.word;
}

async function askWordToSearch(){
    const answers = await inquirer.prompt({
        name: 'word',
        type: 'input',
        message: 'What would be your word?',
        default(){
            return '';
        }
    })

    const spinner = createSpinner('Working...').start();
    postReq(2, answers.word);

    await sleep();

    switch (data){
        case 'yes':
            spinner.success({text: "true"});
            break;
        case 'no':
            spinner.error({text: "false"});
            break;
        default:
            spinner.error({text: "Error!"});
            break;
    }

    return answers.word;
}

async function askWordToRemove(){
    const answers = await inquirer.prompt({
        name: 'word',
        type: 'input',
        message: 'What would be your word?',
        default(){
            return '';
        }
    })

    const spinner = createSpinner('Working...').start();
    postReq(3, answers.word);

    await sleep();

    if (data == "okay"){
        spinner.success({text: "Done!"});
    }else{
        spinner.error({text: "Error!"});
    }
    return answers.word;
}

async function askPrefix(){
    const answers = await inquirer.prompt({
        name: 'word',
        type: 'input',
        message: 'What would be your prefix?',
        default(){
            return '';
        }
    })

    const spinner = createSpinner('Working...').start();

    spinner.success({text:"Here are the suggested words: "});
    postReq(5, answers.word);
    await sleep();

    return answers.word;
}

async function handleChoice(choice){
    switch(choice){
        case 'Insert a word':
            await askWordToInsert();
            await askChoice();
            break;
        case 'Search for a word':
            await askWordToSearch();
            await askChoice();
            break;
        case 'Remove a word':
            await askWordToRemove();
            await askChoice();
            break;
        case 'Display all words':
            const spinner = createSpinner('Working...').start();
            spinner.success({text:"Here are the words: "});
            postReq(4);
            await sleep();
            await askChoice();
            break;
        case 'Display words with a prefix':
            await askPrefix();
            await askChoice();
            break;
        case 'Exit app':
            console.log(chalk.bgBlue('Bye!'));
            process.exit(1);
    }
}

await askChoice();
