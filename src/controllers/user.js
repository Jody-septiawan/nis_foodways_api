const { user } = require("../../models/");

let Users = [
    {
        id: 1,
        name: 'Alex',
        email: 'alex@gmail.com',
        password: '7s98d98as7d8',
        isActive: true
    },
    {
        id: 2,
        name: 'Rika',
        email: 'rika@gmail.com',
        password: '89as7d89as987dss',
        isActive: false
    },
];

// Get All User
exports.getUsers = async (req, res) => {
    const users = await user.findAll({
        attributes: {
            exclude: ["createdAt", "updatedAt"],
        },
    });
    res.send({
        message: "success",
        data: users
    })
    // try {
    //     const usersData = await users.findAll();

    //     res.send({
    //         status: "success",
    //         message: "Users Succesfully Get",
    //         data: {
    //             usersData,
    //         },
    //     });
    // } catch (err) {
    //     console.log(err);
    //     res.status(500).send({
    //         status: "error",
    //         message: "Server Error",
    //     });
    // }
};

exports.addUser = async (req, res) => {
    try {
        const { body } = req;

        const userInput = await user.create(body);
        const users = await user.findAll();

        res.send({
            database: {
                users,
            },
        });
    } catch (err) {
        console.log(err);
        res.send({
            "message": "error"
        });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await user.destroy({
            where: {
                id,
            },
        });
        res.send({
            status: "success",
            message: `Succesfully Delete user id : ${id}`,
        });
    } catch (err) {
        console.log(er)
        res.status(500).send({
            status: "error",
            message: `Succesfully Delete user id : ${id}`,
        });
    }
}