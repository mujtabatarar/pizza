const db = require("../../models");
// const userMessage = db.usersMessage;

exports.createMessage = async (req, res) => {
    try {
        console.log('createMessage');
        console.log(req.body);
        const message = await db.usersMessage.create(req.body);
        console.log('Message recieved:', message.toJSON());
        res.status(200).send({ success: true, message: "Your message have been sent to admin" });
    } catch (error) {
        console.error('Error sending message:', error.message);
        res.status(500).send({ error: error.message });
    }
};

exports.getAllMessages = async (req, res) => {
    try {
        const { page = 1, pageSize = 10, isRead } = req.query;

        // Assuming you have the UserMessage model
        const whereCondition = isRead !== undefined ? { isRead } : {};

        const messages = await db.usersMessage.findAndCountAll({
            where: {
                ...whereCondition,
            },
            order: [['createdAt', 'DESC']], // Sort by createdAt in descending order
            limit: pageSize,
            offset: (page - 1) * pageSize,
        });

        res.status(200).send({
            success: true,
            data: messages.rows, // Rows contains the actual messages
            totalCount: messages.count, // Total count of messages based on the filter
        });
    } catch (error) {
        console.error('Error getting messages:', error.message);
        res.status(500).send({ error: error.message });
    }
};

exports.getMessageById = async (req, res) => {
    try {
        console.log(req?.params?.id);
        const settings = await db.usersMessage.findByPk(req?.params?.id);
        console.log(settings.name);
        if (settings) {
            console.log('Setting by ID:', settings.toJSON());
            db.usersMessage.update({
                isRead : true, 
              }, {
                where: {
                  id: req?.params?.id
                }
              })
            res.status(200).send({ success: true, data: settings });
        } else {
            console.log('Setting not found');
            res.status(400).send({ error: error.message });
        }
    } catch (error) {
        console.error('Error getting setting by ID:', error.message);
        res.status(500).send({ error: error.message });
    }
};

exports.deleteMesssageById = async (req, res) => {
    try {
        const message = await db.usersMessage.findByPk(req?.params?.id);
        if (message) {
            await message.destroy();
            console.log('message deleted');
            res.status(200).send({ success: true });
        } else {
            res.status(400).send({ error: "Message not found" });
        }
    } catch (error) {
        console.error('Error deleting message:', error.message);
        res.status(500).send({ error: error.message });
    }
};



