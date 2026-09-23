import {getToken} from 'next-auth/jwt'

async function auth(req,res,next){
    try{
        const token=await getToken({
            req,
            secret:process.env.NEXTAUTH_SECRET
    })
    
        if(!token){
            return res.status(401).json({ status: 401, message: "Unauthorized" })
        }
        req.user=token
        next()
    } catch (err) {
        return res.status(401).json({ status: 401, message: "Session expired" })
    }

}
export default auth