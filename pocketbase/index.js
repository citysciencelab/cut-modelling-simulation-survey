import PocketBase from 'pocketbase';
import 'cross-fetch/dist/node-polyfill.js'
const client = new PocketBase('https://pocketbase.cut.hcu-hamburg.de');
const records  = await client.collection('cut_tools').getFullList({sort: '-created',})
console.log(records )

