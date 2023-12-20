import { NextResponse, NextRequest } from 'next/server'
import axios from 'axios'

const DATA_SOURCE_URL = "https://jsonplaceholder.typicode.com/todos"
export async function GET(request: Request) {

    const response = await axios.get(DATA_SOURCE_URL)
    const todos = response.data
    return Response.json(todos)

}