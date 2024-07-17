import { randomUUID } from "node:crypto";
import { buildRoutePath } from "../utils/build-route-path.js";
import { Database } from "./database.js";

const database = new Database()

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
            const { title, description } = req.body;

            const ts = Date.now();

            const date_time = new Date(ts);
            const day = date_time.getDate();
            const month = date_time.getMonth() + 1;
            const year = date_time.getFullYear();

            const user = {
                id: randomUUID(),
                title,
                description,
                completed_at: null,
                created_at: day + "/" + month + "/" + year,
                updated_at: day + "/" + month + "/" + year,
            }
            
            database.insert('tasks', user);

            return res.writeHead(201).end();
        }
    },
    {
        method: 'PUT',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            
            const { id } = req.params
            const { title, description } = req.body
            
            return res.end()
        }
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            
            return res.end()
        }
    },
    {
        method: 'PATCH',
        path: buildRoutePath('/tasks/:id/complete'),
        handler: (req, res) => {
            
            return res.end()
        }
    },
]