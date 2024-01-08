const db = require("../models");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { errorHandler } = require("./errHandler");
// const adminSession = require('../models/AdminSession');
const role = db.role;
const permission = db.permissions;


exports.createRole = async (req, res) => {
    try {
        console.log('----------------------------------------------------------------');
      // Extract admin data from the request body
      const { code, title, capabilites, status } = req.body;
      if(!code || !title || !capabilites || !status) {
        res.status(400).send("Please enter code, title, capabilites and status");
      }else {
        
    
        // Create a new role using Sequelize
        const roleObject = await role.create({
          code,
          title,
          capabilites,
          status
        });
        res.status(201).json({ data: roleObject });
      }
    } catch (error) {
      console.error(error);
      res.send(errorHandler[500]);
    }
}

exports.updateRole = async (req, res) => {
try {
    // Extract role data from the request body
    const payload = req.body;

    const {code, title, capabilites, status } = payload;
    console.log(payload);
    console.log(code);
    if(!code && (!title || !capabilites || !status)) {
    res.status(400).send("Please enter code ");
    }else {

    // update a row.
    console.log(payload.code)
    let updatedRows = await role.update(
        payload,
        {
            where: {
            code: payload.code
            },
            returning: true, // Add this line to get the updated rows in the response

        }
        );
    res.status(201).json({ data: updatedRows });
    }
} catch (error) {
    console.error(error);
    res.send(errorHandler[500]);
}
}

exports.deleteRole = async (req, res) => {
try {
    // Extract role data from the request body
    console.log("-0-0-0-0-0 ");
    const { id } = req?.params;
    if(!id ) {
    res.status(400).send("Please enter id");
    }else {
    
    // Find the role by ID
    const response = await role.findByPk(id);

    if (!response) {
        return res.status(404).json({ error: 'Role not found' });
      }
    
    // Delete the admin
    await response.destroy();
    res.status(201).json({ message: 'Role deleted successfully' });
    }
} catch (error) {
    console.error(error);
    res.send(errorHandler[500]);
}
}

exports.roleFindOne = async (req, res) => {
try {
    // Extract code data from the request params.
    const { code } = req.params;
    if(!code) {
    res.status(400).send("Please enter code");
    }else {

    // Get single role from code.
    const response = await role.findOne({where: {code: code}});
    res.status(201).json({ data: response });
    }
} catch (error) {
    console.error(error);
    res.send(errorHandler[500]);
}
}

exports.roleFindAll = async (req, res) => {
try {
        let { perPage, pageNo } = req?.query;
        console.log(perPage, pageNo)
        let roles = await db.role.findAll({
        
        offset: (parseInt(pageNo) - 1)  * parseInt(perPage),
        limit: parseInt(perPage),
        // include: [
        //   {
        //     model: db.varients, // Include the variants table
        //     as: 'variants', // Specify the alias for the variants table
        //   },
        //   {
        //     model: db.category, // Include the category table
        //     as: 'category', // Specify the alias for the category table
        //   },
        // ],
        });
        if(roles?.length)
        res.status(200).send({ success: true, data: roles })
        else 
        res.status(200).send({ success: false, message: "Data not found.", data: roles })
    } catch (err) {
        console.log("error", err);
        res.status(503).send({ success: false, message: "Internal Server Error." });
    }
     
}

exports.permissionsFindAll = async (req, res) => {
    try {
            let permissionsList = await db.permissions.findAll();
            if(permissionsList?.length)
            res.status(200).send({ success: true, data: permissionsList })
            else 
            res.status(200).send({ success: false, message: "Data not found.", data: permissionsList })
        } catch (err) {
            console.log("error", err);
            res.status(503).send({ success: false, message: "Internal Server Error." });
        }
}