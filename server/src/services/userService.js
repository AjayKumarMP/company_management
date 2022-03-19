import User from '../models/users.js';

export const createUser = async (user) => {
    const result = await User.create(user);
    return result;
}

export const loginUser = async({username, password}) => {
    const result = User.findOne({
        where: {
            username,
            password
        }
    });
    if(result) return result;
    return null;
}

export const verifyAUth = async (req, res, next) => {
    var token = req.cookies;
    console.log(token, '-----------------------');
    if (!token) {
        return res.status(400).send({success: false, data: 'No token provided'});
    }
    try {
        var decoded = await jwt.verify(token, config.secret, {ignoreExpiration: true});
        var user = await User.findById(decoded.id);
        if(!user) return res.status(401).send({success: false, data: 'User not found in Database'})
        req.userId = user.id;
        req.userRole = user.role;
        next();
    } catch (error) {
        console.error("Error in logging in the USer", error.message);
        res.status(500).send({sucess: false, data: "Error in verifying AUTH USer "+ error.message})
        setResponse(res, response_500("Error in verifying AUTH USer", error.message));
    }

}