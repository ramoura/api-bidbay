import CheckAuthenticate from "../../../src/application/usecase/auth/CheckAuthenticate";
import TokenGenerate from "../../../src/domain/service/TokenGenerate";

describe('CheckAuthenticate', () => {
    it('should return decoded token', async () => {
        const tokenGenerate = new TokenGenerate('secret')
        const sut = new CheckAuthenticate(tokenGenerate)
        const input = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTmFtZSBUZXN0IiwiZW1haWwiOiJlbWFpbEBlbWFpbC5jb20iLCJpYXQiOjE2ODM0OTgyODUyMTMsImV4cGlyZXNJbiI6MTAwMDAwLCJleHAiOjE2ODM0OTgzODUyMTN9.INHLI0mw3D5o-mNg56Nv9-MWJcguYF-Tr2huatf9Tvk"
        const decoded = await sut.execute(input)
        expect(decoded.email).toBe('email@email.com')
    })
})