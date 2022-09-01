"use strict";

const axios = require('axios');

const URL = 'http://hex.kosmanor.com/hex-bin/newdump/';
const MAX = 966989;

let proceed = true;

function done() {
    proceed = false;
}

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

async function loadAll(callback) {
    for (let i = 1; i <= MAX; i++) {
        await load(URL + i, i);
    }
    callback();
}

function exec() {
    if (proceed) {
        setTimeout(exec, 1000);
    }
}

function run() {
    loadAll(done);
    exec();
}

run();