const connection = require('../config/connection')
const { User, Thought } = require('../models')

connection.once('open', async () => {
    console.log('Connected');

    // array of usernames
    const usernames = [
        "jimmy123",
        "aden87",
        "ChickenLover45",
        "NathanIsC00l",
        "Nicholas_the_cowboy"
    ]

    // array of emails that correspond with usernames above
    const emails = [
        "jimmy.smith@gmail.com",
        "aden.business@company.net",
        "trevor77@kfc.org",
        "NathanIsC00l@gmail.com",
        "Nicholas_james@cowboys.net"
    ]

    // creat reactions for the thoughts
    const reactionData = [
        {
            reactionBody: "Very intelectual thought.",
            username: usernames[0]
        },
        {
            reactionBody: "I totally agree!",
            username: usernames[1]
        },
        {
            reactionBody: "I want to be like you",
            username: usernames[2]
        },
        {
            reactionBody: "Thank you for this amazing advice",
            username: usernames[3]
        },
        {
            reactionBody: "I think Skiing is better.",
            username: usernames[4]
        }
    ]


    // create data for the thoughts document
    const thoughtData = [
        {
            thoughtText: "Snowboarding is the best sport",
            username: usernames[0],
            reactions: [reactionData[4]]
        },
        {
            thoughtText: "The best way to make money is to make money",
            username: usernames[1],
            reactions: [reactionData[3]]
        },
        {
            thoughtText: "I love Chicken so much!!!",
            username: usernames[2],
            reactions: [reactionData[1]]
        },
        {
            thoughtText: "I am so cool, the ladies love me",
            username: usernames[3],
            reactions: [reactionData[2]]
        },
        {
            thoughtText: "I'm gonna tkae my horse to the old town road",
            username: usernames[4],
            reactions: [reactionData[0]]
        },

    ]

    // delete all thought data and then
    // add thought data to the document to later retrieve the _id
    await Thought.deleteMany({})
    await Thought.insertMany(thoughtData)

    // get each thought for each username to put the _id in the userData
    // this code could be optimized
    const user0Thought = await Thought.findOne({ username: usernames[0] })
    const user1Thought = await Thought.findOne({ username: usernames[1] })
    const user2Thought = await Thought.findOne({ username: usernames[2] })
    const user3Thought = await Thought.findOne({ username: usernames[3] })
    const user4Thought = await Thought.findOne({ username: usernames[4] })

    // create Data for the user document
    const userData = [
        {
            username: usernames[0],
            email: emails[0],
            thoughts: [user0Thought._id]
        },
        {
            username: usernames[1],
            email: emails[1],
            thoughts: [user1Thought._id]
        },
        {
            username: usernames[2],
            email: emails[2],
            thoughts: [user2Thought._id]
        },
        {
            username: usernames[3],
            email: emails[3],
            thoughts: [user3Thought._id]
        },
        {
            username: usernames[4],
            email: emails[4],
            thoughts: [user4Thought._id]
        }
    ];

    // delete all user data then
    // add user data
    await User.deleteMany({})
    await User.insertMany(userData)

    // find each user to use their _id for later
    const user0 = await User.findOne({ username: usernames[0] })
    const user1 = await User.findOne({ username: usernames[1] })
    const user2 = await User.findOne({ username: usernames[2] })
    const user3 = await User.findOne({ username: usernames[3] })
    const user4 = await User.findOne({ username: usernames[4] })

    // add friends for each user with _id from above
    await User.updateOne({ username: usernames[0] }, {
        friends: [user4._id]
    });
    await User.updateOne({ username: usernames[1] }, {
        friends: [user3._id]
    });
    await User.updateOne({ username: usernames[2] }, {
        friends: [user0._id]
    });
    await User.updateOne({ username: usernames[3] }, {
        friends: [user2._id]
    });
    await User.updateOne({ username: usernames[4] }, {
        friends: [user1._id]
    });

    console.info('Seeding complete! 🌱');
    process.exit(0);
});