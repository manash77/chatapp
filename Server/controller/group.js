const Group = require('../model/group')

exports.addGroup = async (req, res, next) => {
    try {
        const name = req.body.name;
        const group = await req.user.createGroup({ name })
        if (group) {
            res.status(200).json({success:true,message:"Group Added Successfully!"})
        }else{
            throw new Error("Failed to create the group")
        }
    } catch (error) {
        res.status(400).json({ success: false, error })
    }
}

exports.getGroup = async (req, res, next) => {
    try {
        const groups = await req.user.getGroups()
        if (groups) {
            res.status(200).json({success:true,groups})
        }else{
            throw new Error("Failed to get group")
        }
    } catch (error) {
        res.status(400).json({ success: false, error })
    }
}