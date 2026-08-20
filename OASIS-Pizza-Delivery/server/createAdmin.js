const mongoose = require("mongoose");

const dotenv = require("dotenv");

const Admin =
    require("./models/Admin");


dotenv.config();


const createAdmin = async () => {

    try {

        // =================================================
        // CONNECT TO MONGODB
        // =================================================

        await mongoose.connect(
            process.env.MONGO_URI
        );


        console.log(
            "MongoDB connected."
        );


        // =================================================
        // CHECK IF ADMIN ALREADY EXISTS
        // =================================================

        const existingAdmin =
            await Admin.findOne({

                email:
                    "admin@vgpizza.com"

            });


        if (existingAdmin) {

            console.log(
                "Admin already exists."
            );

            await mongoose.disconnect();

            return;

        }


        // =================================================
        // CREATE ADMIN
        // =================================================

        const admin =
            await Admin.create({

                name:
                    "VG Pizza Admin",

                email:
                    "admin@vgpizza.com",

                password:
                    "VGAdmin@123",

                role:
                    "admin"

            });


        console.log(
            "================================="
        );

        console.log(
            "VG PIZZA ADMIN CREATED"
        );

        console.log(
            "================================="
        );

        console.log(
            "Name:",
            admin.name
        );

        console.log(
            "Email:",
            admin.email
        );

        console.log(
            "Password: VGAdmin@123"
        );

        console.log(
            "Role:",
            admin.role
        );

        console.log(
            "Admin ID:",
            admin._id.toString()
        );

        console.log(
            "================================="
        );


        await mongoose.disconnect();

    }

    catch (error) {

        console.error(
            "Admin creation failed:"
        );

        console.error(error);

        process.exit(1);

    }

};


createAdmin();
