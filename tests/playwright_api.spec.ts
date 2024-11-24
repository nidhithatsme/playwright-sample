import {test, expect} from '@playwright/test'


test.describe.parallel("Api Testing", () =>{
    const baseURL = "https://reqres.in/api"

    test("Success path = 200", async ({request}) => {
        const response = await request.get(`${baseURL}/users`)

        expect(response.status()).toBe(200)

        const responseBody = JSON.parse(await response.text())
        console.log(responseBody)

    })

    test("Rainy Day scenario - Invalid Path 404", async ({request}) => {
        const response = await request.get(`${baseURL}/users/non-existing-path`)

        expect (response.status()).toBe(404)
    })

    test("Test a particular element", async ({request}) => {
        const response = await request.get(`${baseURL}/users/2`)
        const responseBody = JSON.parse(await response.text())
        console.log(responseBody)

        // Check for a particular element 
        expect(responseBody.data.id).toBe(2)
        expect(responseBody.data.first_name).toBe('Janet')
        expect(responseBody.data.last_name).toBe('Weaver')
        expect(responseBody.data.email).toBeTruthy()
    })


})