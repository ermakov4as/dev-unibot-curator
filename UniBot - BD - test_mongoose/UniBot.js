// npm install sql.js
module.exports = class UniBot {
    constructor(bot) {
        this.states = bot.states;
        this.hooks = bot.hooks;
        this.commands = bot.commands;
        this.messangers = {};
        this.currentMessangerKey = null;
        this.currentState = null;

    }

    newMessanger(key) {
        this.messangers[key] = true;
        this.currentMessangerKey = key;
        //this.initDb();
    }

    /*initDb() {
        var sql = require('sql.js');
        var db = new sql.Database();
        //db.run("CREATE TABLE test (col1, col2);");
        //db.run("INSERT INTO test VALUES (?, ?), (?, ?)", [1, 111, 2, 222]);
        var sqlstr = "CREATE TABLE hello (a int, b char);";
        sqlstr += "INSERT INTO hello VALUES (0, 'hello');";
        sqlstr += "INSERT INTO hello VALUES (1, 'world');";
        db.run(sqlstr); // Run the query without returning anything
        var res = db.exec("SELECT * FROM hello");
        this.sendMessage(res);
    }*/

    db_post(UID, state) {
        var UserModel = require('./libs/mongoose').UserModel;
        var user = new UserModel({
            UID,
            state
        });
        user.save(function(err) {
            if (!err) {
                console.log("user created");
                return res.send({ status: 'OK', user: user });
            } else {
                console.log(err);
                if (err.name == 'ValidationError') {
                    res.statusCode = 400;
                    res.send({ error: 'Validation error' });
                } else {
                    res.statusCode = 500;
                    res.send({ error: 'Server error' });
                }
            }
        });
    }

    db_get(UID) {
        var UserModel = require('./libs/mongoose').UserModel;
        return UserModel.findById(UID, function(err, user) {
            if (!user) {
                res.statusCode = 404;
                return res.send({ error: 'Not found' });
            }
            if (!err) {
                return res.send({ status: 'OK', user: user });
            } else {
                res.statusCode = 500;
                console.log(`Internal error ${res.statusCode}: ${err.message}`);
                return res.send({ error: 'Server error' });
            }
        });
    }

    deleteMessanger(key) {
        delete this.messangers[key];
    }

    nextStep(input) {
        console.log(input.UID)
        if (!(input['key'] in this.messangers)) {
            console.log("мессенжер не подключен");
            return "error";
        } else if (input.type == "command") {
            for (var command of this.commands) {
                if (command.value == input.value) {
                    this.applyAction(command.action());
                    this.db_post(input.UID, input.value)
                }
            }
        } else if (this.currentState != null) {
            for (var inp of this.currentState.inputs) {
                if (inp.type == input.type &&
                    inp.value == input.value) {
                    this.applyAction(inp.action());
                }
            }
        }

    }

    applyAction(result) {
        this.sendMessage(result.output);
        for (var state of this.states) {
            if (result.state_name == state.state_name) {
                this.currentState = state;
                this.sendMessage(this.currentState.pre_out);
            }
        }

    }

    /*testDb() {
        //var res = db.exec("SELECT * FROM hello");
        var res = "Oops";
        console.log(res);
    }*/
    testDb() {
        let res = this.db_get(1);
        console.log('!!!');
        console.log(res);
        //console.log(res.schema.tree);
        console.log('!!!');
    }

    sendMessage(output) {
        console.log(JSON.stringify(output));
    }
};