const UniBot = require('./UniBot');
const bot_example = require('./bot_example/botexample');

my_bot = new UniBot(bot_example);

key = "test"

my_bot.newMessanger(key);

my_bot.nextStep({
    "UID": 1,
    "key": key,
    "type": "command",
    "value": "start"
});

my_bot.nextStep({
    "UID": 2,
    "key": key,
    "type": "command",
    "value": "start"
});

my_bot.nextStep({
    "UID": 2,
    "key": key,
    "type": "button",
    "value": "byPath1"
});

my_bot.nextStep({
    "UID": 1,
    "key": key,
    "type": "button",
    "value": "byPath1"
});

my_bot.nextStep({
    "UID": 1,
    "key": key,
    "type": "button",
    "value": "goHome"
});

my_bot.nextStep({
    "UID": 1,
    "key": key,
    "type": "button",
    "value": "byPath2"
});

my_bot.nextStep({
    "UID": 1,
    "key": key,
    "type": "button",
    "value": "goA"
});

my_bot.nextStep({
    "UID": 1,
    "key": key,
    "type": "button",
    "value": "goHome"
});

// my_bot = New Bot([state1, state2, state3]);

// my_bot.connectVK("vk-key");
// my_bot.connectTelegram("tg-key");
// my_bot.connectFB("fb-key");
// my_bot.connectEbnishsyaMessenger("eb-key");

// my_bot.setWebHook("127.0.0.1:8031");
// my_bot.addHookPath([webHook1]);

// my_bot.run();

my_bot.nextStep({
    "UID": 2,
    "key": key,
    "type": "button",
    "value": "goHome"
});

my_bot.nextStep({
    "UID": 2,
    "key": key,
    "type": "button",
    "value": "byPath2"
});

my_bot.nextStep({
    "UID": 1,
    "key": key,
    "type": "button",
    "value": "byServ"
});

my_bot.nextStep({
    "UID": 2,
    "key": key,
    "type": "button",
    "value": "goA"
});

my_bot.nextStep({
    "UID": 2,
    "key": key,
    "type": "button",
    "value": "goHome"
});

my_bot.nextStep({
    "UID": 2,
    "key": key,
    "type": "button",
    "value": "byServ"
});

my_bot.testDb();