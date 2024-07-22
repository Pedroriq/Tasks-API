import fs from 'node:fs'
import { parse } from 'csv-parse'

const csvPath = new URL('../files/tasks.csv', import.meta.url)

async function processFile (){
    const records = [];
    const parseFile = fs.createReadStream(csvPath).pipe(parse({from_line: 2}))
    

    for await(const chunk of parseFile){
        records.push(chunk);
        fetch('http://localhost:3333/tasks', {
            method: 'POST',
            body: JSON.stringify({
                title: chunk[0],
                description: chunk[1],
            }),
        })
    }

    return records
}

processFile()


