const messageModel = require("../model/messageModel");

module.exports.addMssg = async (req, res, next) => {
    try {
        const { from, to, message } = req.body;
        const data = await messageModel.create({
            message: {
                text: message,
            },
            sender: from,
            users: [from, to],
        });
        if (data) return res.json({ msg: 'Message added successfully...' });
        return res.json({ msg: 'Message Failed to add into database' });
    } catch (error) {
        next(error);
    }
};

module.exports.getAllMssg = async (req,res,next) => {
    try {
        const { from, to } = req.body;
        const messages = await messageModel.find({
            users:{
                $all:[from, to],
            },
        })
        .sort({updatedAt: 1})

        const projectMessages= messages.map((mssg)=>{
            return {
                fromSelf: mssg.sender.toString()===from,
                message: mssg.message.text
            }
        })
        res.json(projectMessages);
    } catch (err) {
        next(err);
    }
}