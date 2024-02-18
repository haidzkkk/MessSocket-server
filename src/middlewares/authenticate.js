var jwt = require('jsonwebtoken')
var Auth = require('../models/auth')


exports.authenticate = async (req, res, next) => {
    try {
        let token = req.headers.authorization;

        if(!token){
            return res.status(401).json({
                message:"Bạn chưa đăng nhập!"
            })
        }
        // Tách phần token từ header
        token = token.split(" ")[1];

        const { id } = jwt.verify(token, process.env.JWT_REFRESH_KEY);
        const auth = await Auth.findById(id);

        if (!auth) {
            return res.status(404).json({
                message: "Không tìm thấy người dùng"
            });
        }

        // Lưu thông tin người dùng vào req.user để sử dụng trong các middleware khác
        req.user = auth;
        next();
    } catch (error) {
        return res.status(401).json({
            message: error.message
        });
    }
};