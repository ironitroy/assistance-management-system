const mongoose = require("mongoose");

const pickupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Name"]
    },
    email: {
        type: String,
        required: [true, "Please Enter Email"],
    },
    phone: {
        type: String,
        required: [true, "Please Enter Client's Phone No."],
    },
    address: {
        type: String,
        required: [true, "Please Enter Address"],
    },
    state: {
        type: String,
        required: [true, "Please Enter State"],
    },
    city: {
        type: String,
        required: [true, "Please Enter City"],
    },
    zipcode: {
        type: String,
        required: [true, "Please Enter Zip code"],
    },
    items: [{
        type: String,
    }],
    comments: {
        type: String,
    },
    pickupCharges: {
        type: Number,
    },
    pickupStatus: {
        type: String,
        required: true,
        default: "Processing"
    },
    pickupDate: Date,
    pickupNo: {
        type: String,
        unique: true,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});



// Static method to get the last assigned pickup number
pickupSchema.statics.getLastAssignedPickupNo = async function () {
    const lastPickup = await this.findOne({}, { pickupNo: 1 }, { sort: { createdAt: -1 } });
    return lastPickup ? lastPickup.pickupNo : null;
};

// Pre-save middleware to generate pickup number
pickupSchema.pre("save", async function (next) {
    if (!this.pickupNo) {
        // Get the last assigned pickup number
        const lastPickupNo = await this.constructor.getLastAssignedPickupnNo();

        // Generate the next pickup number
        const nextPickupNo = lastPickupNo ? getNextPickupNo(lastPickupNo) : "0001";
        this.pickupNo = nextPickupNo;
    }

    next();
});

// Helper function to generate the next pickup number based on the last assigned number
function getNextPickupNo(lastPickupNo) {
    const lastNumber = parseInt(lastPickupNo, 10);
    const nextNumber = lastNumber + 1;
    return nextNumber.toString().padStart(lastPickupNo.length, "0");
}

module.exports = mongoose.model("Pickup", pickupSchema)