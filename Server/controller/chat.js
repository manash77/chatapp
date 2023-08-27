const Chat = require('../model/chat');

exports.sendChat = async (req, res, next) => {
    try {
        const { name,id } = req.user;
        const { chat } = req.body;
        const msg = await req.user.createChat({ name, message:chat});
        if (msg) {
            res.status(200).json({ success: true, message: "Chat sent successfully" })
        }
        else{
            throw new Error("Chat Send Failed")
        }
    } catch (error) {
        res.status(400).json({ success: false, error })
    }

}

exports.getChat = async (req, res, next) => {
    try {
        const chats = await Chat.findAll({
            order: [
                ['createdAt', 'DESC'],
              ],
            limit: 15
        });
        if (chats) {
            res.status(200).json({success:true,chats})
        }else{
            throw new Error("Get Chat Failed")
        }
    } catch (error) {
        res.status(400).json({ success: false, error })
    }

}