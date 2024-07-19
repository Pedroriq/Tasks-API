import fs from 'node:fs'
import { parse as csvParse } from 'csv-parse'

const csvPath = new URL('../files/tasks.csv', import.meta.url)

const processFile = async () => {
    const records = [];
    const parse = fs.createReadStream(csvPath).pipe(csvParse({
        delimiter: ',',
        encoding: 'utf8',
        from_line: 2
    }))

    /*
    for await(const line of parse){
        records.push(line);
    }
    */
    return records
}

(async () => {
    const records = await processFile();
    console.log(records);
})();

