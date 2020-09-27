const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const {Doctor} = require("../model/doctor");

var appointmentSchema = new Schema({
    firstname: String,
    lastname: String,
    patientcontact: String,
    process: [{
        type: Schema.Types.ObjectId,
        ref: "Process"
    }],
    notes: String,
    time: String,
    date: String,
    doctor: [{
        type: Schema.Types.ObjectId,
        ref: "Doctor"
    }]
})
// adds appointment to appointment table
appointmentSchema.statics.addAppointment = function(appointment, callback){
    appointment.save().then(callback);
};
//gets all existing appointments
appointmentSchema.statics.getAll = async function(){
    return await this.find();
}
//gets appointment from by ID
appointmentSchema.statics.getAppointmentsByID = async function(appointmentID){
    return await this.findOne({
        _id: appointmentID
    });
};
// gets appointment using date and time as parameters
appointmentSchema.statics.getAppointmentsByDateandTime = async function(date, time){
    return await this.find({
        time, time,
        date: date,
    });
};
// gets appointment by doctor/date/time
appointmentSchema.statics.getAppByDoctorandDateandTime = async function(doctorID, date, time){
    return await this.find({
        time, time,
        date: date,
        doctor:{
            "$in": [doctorID]
        }
    });
};
// gets all appointments by doctor and date
appointmentSchema.statics.getAppByDoctorandDate = async function(doctorID, date){
    return await this.find({
        date: date,
        doctor:{
            "$in": [doctorID]
        }
    });
};
// gets a single appointment by doctor/date/time
appointmentSchema.statics.getOneAppByDoctorandDateandTime = async function(doctorID, date, time){
    return await this.findOne({
        time, time,
        date: date,
        doctor:{
            "$in": [doctorID]
        }
    });
};
// gets all appointments of a doctor
appointmentSchema.statics.getDoctorAppointment = async function(doctorID){
    return await this.find({
        doctor:{
            "$in": [doctorID]
        }        
    });
};
// deletes an appointmnet
appointmentSchema.statics.delete = async function(appointmentID){
    return await this.deleteOne({
        _id : appointmentID
    });
}
// updates an appointmnet
appointmentSchema.statics.updateAppointment = async function(appointmentID, updated){
    return await this.update({
        _id: appointmentID
    }, {
        firstname: updated.firstname,
        lastname: updated.lastname,
        patientcontact: updated.patientcontact,
        process: updated.process,
        notes: updated.notes,
        time: updated.time,
        date: updated.date,
        doctor: updated.doctor
    }, {
        new: true
    }); 
};
// populates the data
appointmentSchema.methods.populateDoctorAndProcess = async function(){
    return await Appointment.findOne({
        _id: this._id
    }).populate("process doctor");
};

var Appointment = mongoose.model("appointment",appointmentSchema)

module.exports = {
    Appointment
}