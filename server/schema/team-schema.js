import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

// how our document look like
const teamSchema = mongoose.Schema({
    name: String,
    pointsUsed: Number,
    playerList: [{
        name: String,
        dept: String,
        year: String,
        speciality: String,
        wk: String,
        point: Number,
    }],
});

autoIncrement.initialize(mongoose.connection);
teamSchema.plugin(autoIncrement.plugin, 'team');

// we need to turn it into a model
const team = mongoose.model('team', teamSchema);

export default team;