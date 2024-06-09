import  Jwt, { decode }  from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

 export const admintoken= (req,res,next)=>{
try {
    const token = req.headers["authorization"];
    if (!token) {
        return res.status(403).json({ message: "Token is not provided" });
    }
    Jwt.verify(token,process.env.ADMIN_JWT_SECRET,(err,decode)=>{
        if (err) {
          return  res.status(404).json({message:"unauthorised"})
        }
        req.username=decode.username
        next();
    });
   
} catch (error) {
    
}
}