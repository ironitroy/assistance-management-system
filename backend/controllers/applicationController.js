const Application = require("../models/applicationModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");


//Create Appliction -- Admin(Case Manager/Agency)
exports.createApplication = catchAsyncErrors(async (req, res, next) => {

    req.body.user = req.user.id

    // Generate the application number
    const lastApplicationNo = await Application.getLastAssignedApplicationNo();
    const nextApplicationNo = lastApplicationNo ? getNextApplicationNo(lastApplicationNo) : "0001";
    req.body.applicationNo = nextApplicationNo;

    const application = await Application.create(req.body);

    res.status(201).json({
        success: true,
        application,
    });
});


// Helper function to generate the next application number based on the last assigned number
function getNextApplicationNo(lastApplicationNo) {
    // Get the current date in the format YYYYMMDD
    const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, "");

    // Extract the date portion from the last application number
    const lastDate = lastApplicationNo.slice(0, 8);

    // If the current date is different from the last date, reset the serial number to 1
    const serialNumber = lastDate === currentDate ? parseInt(lastApplicationNo.slice(8), 10) + 1 : 1;

    // Combine the current date and serial number to generate the next application number
    const nextApplicationNo = currentDate + serialNumber.toString().padStart(4, "0");
    return nextApplicationNo;
}


//Get All Applications
exports.getAllApplications = catchAsyncErrors(async (req, res) => {

    const resultPerPage = 4; //Pagination feature: No. of Car Listings to display in one page
    const applicationCount = await Application.countDocuments();

    const apiFeature = new ApiFeatures(Application.find(), req.query).search();
    // const apiFeature = new ApiFeatures(Application.find(),req.query).search().pagination(resultPerPage);
    const applications = await apiFeature.query;
    res.status(200).json({
        success: true,
        applications,
        applicationCount
    })
});


//Get Application Details -- Admin (Test)
exports.getSingleAppliction = catchAsyncErrors(async (req, res, next) => {

    const application = await Application.findById(req.params.id).populate(
        "user",
        "caseManagerName email phone agency"
    );
    if (!application) {
        return next(new ErrorHandler("Application Not Found", 404));
    }


    res.status(200).json({
        success: true,
        application
    })
});


//Get myApplication Details -- Admin / filter all application for logged in user
exports.myApplications = catchAsyncErrors(async (req, res, next) => {

    const applications = await Application.find({ user: req.user._id });


    res.status(200).json({
        success: true,
        applications
    })
});



//Get Application Details
exports.getApplictionDetails = catchAsyncErrors(async (req, res, next) => {

    const application = await Application.findById(req.params.id);
    if (!application) {
        return next(new ErrorHandler("Application Not Found", 404));
    }


    res.status(200).json({
        success: true,
        application
    })
});


//Update Application -- SuperAdmin(MAHF)

exports.updateApplication = catchAsyncErrors(async (req, res, next) => {
    let application = Application.findById(req.params.id);

    if (!application) {
        return next(new ErrorHandler("Application Not Found", 404));
    }

    application = await Application.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        application
    })
});


//Update Application Status -- SuperAdmin(MAHF)

exports.updateApplicationStatus = catchAsyncErrors(async (req, res, next) => {
    const application = await Application.findById(req.params.id);

    if (application.applicationStatus === "Completed") {
        return next(new ErrorHandler("This application has been completed", 400));
    }

    application.applicationStatus = req.body.applicationStatus;
    if (req.body.applicationtatus === "Completed") {
        application.deliveryDate = Date.now();
    }

    await application.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
    })
});



//Delete Application -- SuperAdmin(MAHF)

exports.deleteApplication = catchAsyncErrors(async (req, res, next) => {

    const application = await Application.findById(req.params.id);

    if (!application) {
        return next(new ErrorHandler("Application Not Found", 404));
    }

    await application.deleteOne();

    res.status(200).json({
        success: true,
        message: "Application Deleted Successfully"
    })
});