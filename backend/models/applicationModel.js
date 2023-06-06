const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
    clientName: {
        type: String,
        required: [true, "Please Enter Client's Name"]
    },
    email: {
        type: String,
        required: [true, "Please Enter Client's Email"],
    },
    phone: {
        type: String,
        required: [true, "Please Enter Client's Phone No."],
    },
    maritalStatus: {
        type: String,
        required: [true, "Please Enter Client's Marital Status"],
    },
    ethnicity: {
        type: String,
        required: [true, "Please Enter Client's Ethnicity"],
    },
    clientAddress: {
        type: String,
        required: [true, "Please Enter Client's Address"],
    },
    floorNo: {
        type: String,
        required: [true, "Please Enter Client's Floor No."],
    },
    clientState: {
        type: String,
        required: [true, "Please Enter Client's State"],
    },
    clientCity: {
        type: String,
        required: [true, "Please Enter Client's City"],
    },
    clientZipcode: {
        type: String,
        required: [true, "Please Enter Client's Zip code"],
    },
    stairs: {
        type: String,
        required: [true, "Please Select"],
    },
    elevator: {
        type: String,
        required: [true, "Please Select"],
    },
    totalLive: {
        type: Number,
        required: [true, "Please Enter No. Of Total Lives At Client's Location"],
    },
    namesAges: {
        type: String,
        required: [true, "Please Enter All Names & Ages"],
    },
    incomeWork: {
        type: Number,
        required: [true, "Please Enter Client's Income From Work"],
    },
    incomeVetBenefits: {
        type: Number,
        required: [true, "Please Enter Client's Income From Vet Benefits"],
    },
    incomeTANF: {
        type: Number,
        required: [true, "Please Enter Client's Income From TANF"],
    },
    incomeFoodStamps: {
        type: Number,
        required: [true, "Please Enter Client's Income From Food Stamps"],
    },
    incomeSsiSsd: {
        type: Number,
        required: [true, "Please Enter Client's Income From SSI/SSD"],
    },
    incomeChildSupport: {
        type: Number,
        required: [true, "Please Enter Client's Income From Child Support"],
    },
    otherIncome: {
        type: Number,
        required: [true, "Please Enter Client's Other Income"],
    },
    totalIncome: {
        type: Number,
        required: [true, "Please Enter Client's Total Income"],
    },
    rentMortgage: {
        type: Number,
        required: [true, "Please Enter Client's Rent/Mortgage Payment"],
    },
    gasOil: {
        type: Number,
        required: [true, "Please Enter Client's Gas/Oil Bill"],
    },
    electricity: {
        type: Number,
        required: [true, "Please Enter Client's Electricity Bill"],
    },
    cable: {
        type: Number,
        required: [true, "Please Enter Client's Cable Bill"],
    },
    phoneBill: {
        type: Number,
        required: [true, "Please Enter Client's Phone Bill"],
    },
    food: {
        type: Number,
        required: [true, "Please Enter Client's Food Expenses"],
    },
    otherPayments: {
        type: Number,
        required: [true, "Please Enter Client's Other Payments"],
    },
    totalMonthlyPayments: {
        type: Number,
        required: [true, "Please Enter Client's Total Monthly Payments"],
    },
    reasonReferral: [{
        type: String,
    }],
    bed1: {
        type: String,
        default: "none"
    },
    bed2: {
        type: String,
        default: "none"
    },
    bed3: {
        type: String,
        default: "none"
    },
    bed4: {
        type: String,
        default: "none"
    },
    bed5: {
        type: String,
        default: "none"
    },
    bed1Mattress: {
        type: String,
        default: "none"
    },
    bed2Mattress: {
        type: String,
        default: "none"
    },
    bed3Mattress: {
        type: String,
        default: "none"
    },
    bed4Mattress: {
        type: String,
        default: "none"
    },
    bed5Mattress: {
        type: String,
        default: "none"
    },
    bed1Spring: {
        type: String,
        default: "none"
    },
    bed2Spring: {
        type: String,
        default: "none"
    },
    bed3Spring: {
        type: String,
        default: "none"
    },
    bed4Spring: {
        type: String,
        default: "none"
    },
    bed5Spring: {
        type: String,
        default: "none"
    },
    bed1Frame: {
        type: String,
        default: "none"
    },
    bed1Frame: {
        type: String,
        default: "none"
    },
    bed2Frame: {
        type: String,
        default: "none"
    },
    bed3Frame: {
        type: String,
        default: "none"
    },
    bed4Frame: {
        type: String,
        default: "none"
    },
    bed5Frame: {
        type: String,
        default: "none"
    },
    bedLinens: {
        type: String,
        default: "none"
    },
    dresser: {
        type: String,
        default: "none"
    },
    nightStand: {
        type: String,
        default: "none"
    },
    sofeLoveseat: {
        type: String,
        default: "none"
    },
    armChair: {
        type: String,
        default: "none"
    },
    tv: {
        type: String,
        default: "none"
    },
    tvStand: {
        type: String,
        default: "none"
    },
    endTable: {
        type: String,
        default: "none"
    },
    floorLamp: {
        type: String,
        default: "none"
    },
    tableLamp: {
        type: String,
        default: "none"
    },
    bookshelf: {
        type: String,
        default: "none"
    },
    desk: {
        type: String,
        default: "none"
    },
    kitchenTable: {
        type: String,
        default: "none"
    },
    kitchenChairs: {
        type: String,
        default: "none"
    },
    dishes: {
        type: String,
        default: "none"
    },
    silverware: {
        type: String,
        default: "none"
    },
    potsPans: {
        type: String,
        default: "none"
    },
    notListed: {
        type: String,
        default: "none"
    },
    reasonForReferral: {
        type: String,
    },
    howDidYouHearAboutUs: {
        type: String,
    },
    deliveryInstructions: {
        type: String,
    },
    totalClientContribution: {
        type: String,
    },
    totalAgencyContribution: {
        type: String,
    },
    tAndC: {
        type: Boolean,
    },
    applicationStatus: {
        type: String,
        required: true,
        default: "Processing"
    },
    deliveryDate: Date,
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    applicationNo: {
        type: String,
        unique: true,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});



// Static method to get the last assigned application number
applicationSchema.statics.getLastAssignedApplicationNo = async function () {
    const lastApplication = await this.findOne({}, { applicationNo: 1 }, { sort: { createdAt: -1 } });
    return lastApplication ? lastApplication.applicationNo : null;
};

// Pre-save middleware to generate application number
applicationSchema.pre("save", async function (next) {
    if (!this.applicationNo) {
        // Get the last assigned application number
        const lastApplicationNo = await this.constructor.getLastAssignedApplicationNo();

        // Generate the next application number
        const nextApplicationNo = lastApplicationNo ? getNextApplicationNo(lastApplicationNo) : "0001";
        this.applicationNo = nextApplicationNo;
    }

    next();
});

// Helper function to generate the next application number based on the last assigned number
function getNextApplicationNo(lastApplicationNo) {
    const lastNumber = parseInt(lastApplicationNo, 10);
    const nextNumber = lastNumber + 1;
    return nextNumber.toString().padStart(lastApplicationNo.length, "0");
}

module.exports = mongoose.model("Application", applicationSchema)