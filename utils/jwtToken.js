// Creating Token and saving in cookie

const sendToken = (user,statusCode,res)=>{

    const token = user.getJWTToken();

    //options for cookies

    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };

    const userEmail = user.email;
    res.status(statusCode).cookie('token',token,options).json({
        success: true,
        email: userEmail,
        token,
    })
};

module.exports = sendToken;