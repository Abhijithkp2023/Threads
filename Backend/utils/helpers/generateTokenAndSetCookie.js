import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (userId , res) => {           
    const token = jwt.sign({userId},process.env.JWT_SECRET, {   // Generating JWT => jwt.sign will take 3 parameteres 'payload'(here userId) , 'secret key' ,and 'expires'
        expiresIn : '15d',
    })

    res.cookie("jwt" , token , {              //setting JWT as cookie. => res.cookie() function is used to set the cookie. it also take 3 parameters "name" ,"value" , "additional properties"
        httpOnly : true, 
        maxAge : 15 * 24 * 60 * 60  * 1000 , //15 days in milliseconds form
        sameSite: "strict"
    })

    return token;
}

export default generateTokenAndSetCookie;