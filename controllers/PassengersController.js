const db = require("../config/db");

//gettinh all students list
const getPassengers = async (req , res) =>{
    try {
        const data = await db.query('SELECT * FROM passengers');
        if(!data){
            return res.status(404).send({
                sucess: false,
                message: 'no records found'
            })
        }
        res.status(200).send({
            sucess: true,
            message: 'all passengers record has been sent',
            data: data[0]
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            sucess: false,
            message: 'error in get all student API',
            error
        })
        
    }
}

const createPassengers = async (req,res)=>{
    try {
        const {passengerID , PassName , PickupLOC , destination} = req.body;
        if(!passengerID || !PassName || !PickupLOC || !destination){
            return res.status(404).send({
                sucess: false,
                message: 'fields missing',
                error
            });
        }

        const data = await db.query(`INSERT INTO passengers(passengerID , PassName , PickupLOC , destination) VALUES(? , ? , ? , ?)`, 
            [passengerID , PassName , PickupLOC , destination]);
            if(!data){
                res.status(404).send({
                    sucess: false,
                    message: 'error in querry'
                });
            }
            res.status(200).send({
                sucess: true,
                message: 'data created sucessfuly',
                data: data[0]
            })
        
    } catch (error) {
        res.status(500).send({
            sucess: false,
            message: 'could not create passenger',
            error
        })
    }
}

const updatePassengers = async (req,res)=>{
    try {
        const passengerid = req.params.id;
        if(!passengerid){
            return res.status(404).send({
                sucess: false,
                message: 'id not found'
            })
        }

        const {passengerID , PassName , PickupLOC , destination} = req.body;
        if(!passengerID || !PassName || !PickupLOC || !destination){
            return res.status(404).send({
                sucess: false,
                message: 'fields are missing'
            })
        }

        const data = db.query(`UPDATE passengers SET PassName = ?, PickupLOC = ? , destination = ? WHERE passengerID = ?` , 
            [PassName , PickupLOC , destination , passengerID]);

            if(!data){
                return res.status(404).send({
                    sucess: false,
                    message: 'error in data'
                })
            }
            res.status(201).send({
                sucess: true,
                message: 'data updated sucessfully',
                data: data[0]
            })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            sucess: false,
            message: 'error is update query',
            error
        })
        
    }
}

const deletePassenger = async (req, res) => {
    try {
        const passengerid = req.params.id;
        if (!passengerid) {
            return res.status(404).send({
                sucess: false,
                message: 'id not found'
            });
        }

        const data = await db.query(
            `DELETE FROM passengers WHERE passengerID = ?`,
            [passengerid]
        );

        if (data.affectedRows === 0) {
            return res.status(404).send({
                sucess: false,
                message: 'passenger not found'
            });
        }

        res.status(200).send({
            sucess: true,
            message: 'passenger deleted successfully'
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            sucess: false,
            message: 'error in delete query',
            error
        });
    }
};


module.exports = {getPassengers , createPassengers , updatePassengers , deletePassenger};