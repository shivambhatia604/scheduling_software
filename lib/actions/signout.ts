"use server"


import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'


export async function signoutAction() {

    (await cookies()).set('token','',{maxAge: 0})
    redirect("/wrong") // :TEST error by wrong route
}