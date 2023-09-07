import { PocketBase } from 'pocketbase';

const client = new PocketBase('https://pocketbase.cut.hcu-hamburg.de');

async function fetchData() {
  
  const records = await client.records.getFullList('cut_tools', 200 /* batch size */, {
    sort: '-created',
});
  console.log(records); // Handle the fetched records

}

// Call the async function
fetchData();