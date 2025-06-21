const cron = require('node-cron');
const User = require('./models/User');

// We add the salary to all users on the first day of every month 
cron.schedule('0 0 1 * *', async () => {
    const users = await User.find({});
    for (const user of users) {
        if (user.monthlySalary) {
            user.balance += user.monthlySalary;
            if (user.categories) {
                user.categories.forEach(cat => cat.spent = 0);
            }
            await user.save();
        }
    }
    console.log('Monthly salary added to all users');
});