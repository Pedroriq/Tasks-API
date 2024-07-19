import fs from 'node:fs/promises'
import { createDate } from './routes.js'

const databasePath = new URL('db.json', import.meta.url)

export class Database {

    #database = {}

    constructor() {
        fs.readFile(databasePath, 'utf8')
        .then(data => {
            this.#database = JSON.parse(data)
        }).catch(() => {
            this.#persist()
        })
    }

    #persist(){
        fs.writeFile(databasePath, JSON.stringify(this.#database))
    }

    select(table){
        const data = this.#database[table] ?? []

        return data
    }

    insert(table, data){
        if(Array.isArray(this.#database[table])) {
            this.#database[table].push(data)
        } else {
            this.#database[table] = [data]
        }

        this.#persist()
    }

    update(table, id, data){
        const rowIndex = this.#database[table].findIndex(row => row.id === id)
        let updated = false

        if (rowIndex > -1) {
            const taskRow = this.#database[table][rowIndex]
            Object.keys(data).forEach(key => {
                if (key in taskRow) {
                    taskRow[key] = data[key]
                    updated = true
                }
            })

            if (Object.keys(data).length === 0) {
                taskRow['completed_at'] = createDate()
                updated = true
            }

            if (updated){
                this.#database[table][rowIndex].updated_at = createDate()
                this.#persist()
            }
        }
    }

    delete(table, id){
        const rowIndex = this.#database[table].findIndex(row => row.id === id)

        if (rowIndex > -1) {
            this.#database[table].splice(rowIndex, 1)
            this.#persist()
        }
    }
}