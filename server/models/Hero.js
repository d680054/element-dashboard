module.exports = dynamoose => {
    const shortid = require('shortid');
    const schema = new dynamoose.Schema({
        id: {
            type: String,
            default: shortid.generate,
            hashKey: true
        },
        name: { type: String },
        avatar: { type: String },
        title: { type: String },
        scores: {
            difficult: { type: Number },
            skills: { type: Number },
            attack: { type: Number },
            survive: { type: Number }
        },
        skills: [{
            icon: { type: String },
            name: { type: String },
            description: { type: String },
            tip: { type: String }
        }],
        usageTips: { type: String },
        battleTips: { type: String },
        teamTips: { type: String },
        categories: [{ type: Array }],

        items1: [{ type: Array }],
        items2: [{ type: Array }],

        partners: [{
            hero: { type: Number },
            description: { type: String },
        }]
    })

    return dynamoose.model('Hero', schema);
}