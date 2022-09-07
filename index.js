"use strict";

const axios = require('axios');
const fs = require('fs'); 
const readline = require('readline'); 

const URL = 'http://hex.kosmanor.com/hex-bin/newdump/';
const MAX = 966989;

async function load(url, i) {
    let promise = new Promise((resolve, reject) => {
        axios.get(url)
        .then(function (response) {
            if (response.data.length > 0) {
                const sz = response.data.match(/size-(\d+)\s+board/); 
                if (sz) {
                    const r = response.data.match(/Std moves:\s*([^\s<-]+)/);
                    if (r) {
                        console.log(i + '[' + sz[1] + ']: ' + r[1]);
                    }
                }
            }
            resolve();
        })
        .catch(function (error) {
            console.log('Error: ' + error);
            resolve();
        });
    });
    await promise;
}

async function loadAll() {
    for (let i = 1; i <= MAX; i++) {
        await load(URL + i, i);
    }
}

async function loadFile(name) {
    const rl = readline.createInterface({
        input: fs.createReadStream(name), 
        console: false 
    });
    for await (const line of rl) {
        await load(URL + line, line);
    }
}
    
async function run() {
    await loadFile('discard.txt');
}

(async () => { await run(); })();