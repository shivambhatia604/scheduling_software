"use server"

// import { cookies } from 'next/headers'
// import { redirect } from 'next/navigation'
import { deleteSession } from '../session'

export async function signoutAction() {

    // (await cookies()).set('token','',{maxAge: 0})
    await deleteSession()
    // redirect("/")
}