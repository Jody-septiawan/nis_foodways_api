const { product, user, order, transaction } = require("../../models/");


exports.addTransaction = async (req, res) => {
    try {
        const orderData = req.body;
        const userId = req.userId.id;

        // const data2 = order.bulkCreate(data, { individualHooks: true });
        var d = new Date();
        var date = d.toString();
        const dataTransaction = {
            userId,
            date,
            status: "on the way"
        }

        var transId = await transaction.create(dataTransaction);
        transId = transId.id;

        var data = orderData.map(
            (item) => {
                return {
                    ...item,
                    transactionId: transId
                }
            },
        )

        var orderInput = await order.bulkCreate(data)

        const transactionData = await transaction.findAll({
            include: [
                {
                    model: user,
                    attributes: {
                        exclude: ["createdAt", "updatedAt", "password", "image", "role", "gender", "phone"],
                    },
                },
                {
                    model: order,
                    attributes: {
                        exclude: ["createdAt", "updatedAt", "id", "transactionId", "productId"],
                    },
                    include: [
                        {
                            model: product,
                            attributes: {
                                exclude: ["createdAt", "updatedAt", "userId"],
                            }
                        }
                    ]
                },
            ],
            attributes: {
                exclude: ["createdAt", "updatedAt", "userId", "date"],
            },
            where: {
                id: transId
            }
        });

        res.send({
            transactionData,
        })

    } catch (err) {
        console.log(err);
        res.status(500).send({
            status: "error",
            message: "Server Error",
        });
    }
}