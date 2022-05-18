import app from "supertest";
import { UserRoutes } from "../../handlers/UserEndpoints";

const data1 = {
    firstname: "asd",
    lastName: "qwe",
    email: "asd@qwe.com",
    password: "1234"
}
const data2 = {
    email: "asd@qwe.com",
    password:"1234"
}
export let token = ""
describe("User Endpoints",()=>{
    it("sign up should return status 200", async()=>{
        app(UserRoutes).post("/create-user").send(data1).expect(200)
    })
    it("sign in should return status 200", async()=>{
        app(UserRoutes).post("/create-user").send(data2).expect(200)
    })
})
