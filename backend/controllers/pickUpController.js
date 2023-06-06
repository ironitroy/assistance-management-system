const Pickup = require("../models/pickupModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");


//Create Pickup -- Donner 
exports.createPickup = catchAsyncErrors(async (req, res, next) => {

    // req.body.user = req.user.id

    // Generate the Pickup number
    const lastPickupNo = await Pickup.getLastAssignedPickupNo();
    const nextPickupNo = lastPickupNo ? getNextPickupNo(lastPickupNo) : "0001";
    req.body.pickupNo = nextPickupNo;

    const pickup = await Pickup.create(req.body);

    res.status(201).json({
        success: true,
        pickup,
    });
});


// Helper function to generate the next Pickup number based on the last assigned number
function getNextPickupNo(lastPickupNo) {
    // Get the current date in the format YYYYMMDD
    const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, "");

    // Extract the date portion from the last Pickup number
    const lastDate = lastPickupNo.slice(0, 8);

    // If the current date is different from the last date, reset the serial number to 1
    const serialNumber = lastDate === currentDate ? parseInt(lastPickupNo.slice(8), 10) + 1 : 1;

    // Combine the current date and serial number to generate the next Pickup number
    const nextPickupNo = currentDate + serialNumber.toString().padStart(4, "0");
    return nextPickupNo;
}


//Get All Pickups
exports.getAllPickups = catchAsyncErrors(async (req, res) => {

    const resultPerPage = 4; //Pagination feature: No. of Car Listings to display in one page
    const pickupCount = await Pickup.countDocuments();
    const pickups = await Pickup.find();

    // const apiFeature = new ApiFeatures(pickup.find(), req.query).search();
    // const apiFeature = new ApiFeatures(Application.find(),req.query).search().pagination(resultPerPage);
    // const pickup = await apiFeature.query;
    res.status(200).json({
        success: true,
        pickups,
        pickupCount
    })
});




//Get Pickup Details -- Admin (Test)
exports.getSinglePickup = catchAsyncErrors(async (req, res, next) => {

    const pickup = await Pickup.findById(req.params.id)
    if (!pickup) {
        return next(new ErrorHandler("Pickup Request Not Found", 404));
    }


    res.status(200).json({
        success: true,
        pickup
    })
});




//Get Pickup Details
exports.getPickupDetails = catchAsyncErrors(async (req, res, next) => {

    const pickup = await Pickup.findById(req.params.id);
    if (!pickup) {
        return next(new ErrorHandler("Application Not Found", 404));
    }


    res.status(200).json({
        success: true,
        pickup
    })
});


//Update Pickup -- SuperAdmin(MAHF)

exports.updatePickup = catchAsyncErrors(async (req, res, next) => {
    let pickup = Pickup.findById(req.params.id);

    if (!pickup) {
        return next(new ErrorHandler("Pickup Not Found", 404));
    }

    pickup = await Pickup.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        pickup
    })
});


//Update Pickup Status -- SuperAdmin(MAHF)

exports.updatePickupStatus = catchAsyncErrors(async (req, res, next) => {
    const pickup = await Pickup.findById(req.params.id);

    if (pickup.pickupStatus === "Completed") {
        return next(new ErrorHandler("This pickup has been completed", 400));
    }

    pickup.pickupStatus = req.body.pickupStatus;
    if (req.body.pickuptatus === "Completed") {
        pickup.deliveryDate = Date.now();
    }

    await pickup.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
    })
});



//Delete Pickup -- SuperAdmin(MAHF)

exports.deletePickup = catchAsyncErrors(async (req, res, next) => {

    const pickup = await Pickup.findById(req.params.id);

    if (!pickup) {
        return next(new ErrorHandler("Pickup Not Found", 404));
    }

    await pickup.deleteOne();

    res.status(200).json({
        success: true,
        message: "Pickup Deleted Successfully"
    })
});