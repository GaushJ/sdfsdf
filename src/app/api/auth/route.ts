import { NextResponse, NextRequest } from 'next/server'
import { cookies } from 'next/headers'


export async function POST(req: NextRequest) {
    const { session } = await req.json()
    try {


        cookies().set('auth', session.session.access_token)
        return NextResponse.json({
            status: 200,
            message: "Cookies set successfully"
        })
    } catch (err) {
        console.log(err)
    }


}