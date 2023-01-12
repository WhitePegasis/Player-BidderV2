import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

// how our document look like
const playerSchema = mongoose.Schema({
    name: String,
    dept: String,
    year: String,
    speciality: String,
    wk: String,
    registered: String,
    soldto: String,
});

autoIncrement.initialize(mongoose.connection);
playerSchema.plugin(autoIncrement.plugin, 'player');

// we need to turn it into a model
const player = mongoose.model('player', playerSchema);

export default player;