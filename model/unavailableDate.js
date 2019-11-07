const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var unavailableDateSchema = new Schema({
    momentDate1: String,
    stringDate1: String,
    momentDate2: String,
    stringDate2: String,
    doctor: {
        type: Schema.Types.ObjectId,
        ref: "Doctor"
    }
});

unavailableDateSchema.statics.addUnavailableDate = function(unavailableDate, callback){
    unavailableDate.save().then(callback);
};

unavailableDateSchema.statics.delete = async function(unavailableDateID){
    return await this.deleteOne({
        _id : unavailableDateID
    });
}

unavailableDateSchema.statics.updateDoctor = async function(unavailableDateID, updated){
    return await this.updateOne({
        _id: unavailableDateID
    }, {
        momentDate1,
        stringDate1,
        momentDate2,
        stringDate2
    }, {
        new: true
    }); 
};

var UnavailableDate = mongoose.model("UnavailableDate", unavailableDateSchema);


module.exports = {
    UnavailableDate
}