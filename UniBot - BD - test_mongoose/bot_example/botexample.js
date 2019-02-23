const Server = require('./server.js');
serv = new Server("127.0.0.1", "8080");

var commands = [
    {
        "type": "command",
        "value": "start",
        "action": function(){
            return { 
                "state_name": "main",
                "output": {
                    "type": "text",
                    "body": "Добро пожаловать в БОТ!"
                }
            };
        },
    }
];

var states = [
    {
        "state_name": "main",
        "pre_out": {
            "type": "text",
            "body": "Куда едем?",
            "keyboard": [
                [
                    {
                        "value": "byServ",
                        "text": "По серверу",
                    },
                    {
                        "value": "byPath2",
                        "text": "Путь 2"
                    }
                ], 
                [
                    {
                        "value": "byPath1",
                        "text": "Путь 1"
                    }
                ]
            ]
        },
        "inputs": [
            {
                "type": "button",
                "value": "byServ",
                "action": function(){
                    var result = serv.getServerTest();
                    if (result < 0.5){
                        return { 
                            "state_name": "state_a",
                            "output": {
                                "type": "text",
                                "body": "Я – сервер (А)"
                            }
                        };
                    }else{
                        return { 
                            "state_name": "state_b",
                            "output": {
                                "type": "text",
                                "body": "Я – сервер (Б)"
                            }
                        };
                    }
                },
            },
            {
                "type": "button",
                "value": "byPath1",
                "action": function(){
                    return { 
                        "state_name": "state_a",
                        "output": {
                            "type": "text",
                            "body": "Я – решил (А)"
                        }
                    };
                },
            },
            {
                "type": "button",
                "value": "byPath2",
                "action": function(){
                    return { 
                        "state_name": "state_b",
                        "output": {
                            "type": "text",
                            "body": "Я – решил (А)"
                        }
                    };
                },
            }
        ]
    },
    {
        "state_name": "state_a",
        "pre_out": {
            "type": "text",
            "body": "Выбрано состояние А, говорю я(А)",
            "keyboard": [
                [
                    {
                        "value": "goHome",
                        "text": "Продолжить",
                    }
                ]
            ]
        },
        "inputs": [
            {
                "type": "button",
                "value": "goHome",
                "action": function(){
                    return { 
                        "state_name": "main",
                        "output": {
                            "type": "text",
                            "body": "Идем домой"
                        }
                    };
                },
            }
        ]
    },
    {
        "state_name": "state_b",
        "pre_out": {
            "type": "text",
            "body": "Кнопка ( в а идеи) или текст (домой)",
            "keyboard": [
                [
                    {
                        "value": "goA",
                        "text": "Да",
                    }
                ]
            ]
        },
        "inputs": [
            {
                "type": "button",
                "value": "goA",
                "action": function(){
                    return { 
                        "state_name": "state_a",
                        "output": {
                            "type": "text",
                            "body": "Введена кнопка!!! Ура! Идем куда то."
                        }
                    };
                },
            },
            {
                "type": "text",
                "value": true,
                "action": function(value){
                    return { 
                        "state_name": "main",
                        "output": {
                            "type": "text",
                            "body": " текст!! Ура!!!"
                        }
                    };
                },
            }
        ]
    }
];

var hooks = [
    {
        "path": "/new-message",
        "action": function(data){
            return { 
                "state_name": "main",
                "output": {
                    "type": "text",
                    "body": "Сработал кук!!! Ушли в начальное состояние!"
                }
            };
        }
    }
];

module.exports = {"states": states, "hooks": hooks, "commands": commands}