import { randomUUID } from "node:crypto";
import { buildRoutePath } from "../utils/build-route-path.js";
import { Database } from "./database.js";

const database = new Database()

export function createDate(){
    const ts = Date.now();

    const date_time = new Date(ts);
    const day = date_time.getDate();
    const month = date_time.getMonth() + 1;
    const year = date_time.getFullYear();
    
    const dayMonthYear = day + "/" + month + "/" + year

    return dayMonthYear

}

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {

            const tasks = database.select('tasks')
            
            return res.end(JSON.stringify(tasks))
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            if ('title' in req.body && 'description' in req.body){
                const { title, description } = req.body;
                const dateNow = createDate()

                const task = {
                    id: randomUUID(),
                    title,
                    description,
                    completed_at: null,
                    created_at: dateNow,
                    updated_at: dateNow,
                }
            
                database.insert('tasks', task);
            } else {
                console.log("Verificar se os campos title e description estão presentes no corpo da requisição")
            }
            return res.writeHead(201).end();
        }
    },
    {
        method: 'PUT',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            
            const { id } = req.params
            
            if (req.body){
                    database.update('tasks', id, req.body)
            } else {
                console.log('Verificar se os campos title ou description estão preenchidos')
            }

            return res.writeHead(204).end()
        }
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            
            const { id } = req.params

            database.delete('tasks', id)

            return res.writeHead(204).end()
        }
    },
    {
        method: 'PATCH',
        path: buildRoutePath('/tasks/:id/complete'),
        handler: (req, res) => {
            
            const { id } = req.params

            database.update('tasks', id, {})
            return res.writeHead(204).end()
        }
    },
]