const Server = require('./server.js'); // server.js пока отсутствует
serv = new Server("127.0.0.1", "8080");

var commands = [
    {
        "type": "command",
        "value": "start",
        "action": function(){
            return { 
                "state_name": "token",
                "output": {
                    "type": "text",
                    "body": "Привет!\n" + 
                            "Меня зовут Вячеслав, я буду твоим личным куратором на всём протяжении твоего обучения!\n" +
                            "\nПодробнее о нашем взаимодействии читай в разделе 'О работе с куротором'"
                }
            };
        },
    }
];

var user_data = [ // Или здесь БД нужна?
    {
        "name": null,
        "local_id": null,
        "status_thread": null
    }
];

var states = [
    {
        "state_name": "token",
        "pre_out": {
            "type": "text",
            "body": "Укажите свой токен: "
        },
        "inputs": [
            {   
                "type": "text",
                "value": value, // Корректна ли запись?
                "action": function(token){ // Как получить value?
                    var result = serv.login(token); // Написать функцию
                    //result: {name": "Ivan", "local_id": 12345678, "status_thread": "50%"}
                    if (result.local_id) {
                        user_data = result;
                        return { 
                            "state_name": "main",
                            "output": {
                                "type": "text",
                                "body": "Привет, " + user_data.name + '!'
                            }
                        };
                    } else {
                        return { 
                            "state_name": "token",
                            "output": {
                                "type": "text",
                                "body": "Проверьте правильность токена в личном кабинете на app.swift-english.com"
                            }
                        };
                    }
                }
            }
        ]
    },
    {
        "state_name": "main",
        "pre_out": {
            "type": "text",
            "body": "Текущее состояние обучения: " + user_data.status_thread,
            "keyboard": [
                [
                    {
                        "value": "goPractice",
                        "text": "Практика",
                    },
                    {
                        "value": "goDict",
                        "text": "Словарь"
                    }
                ], 
                [
                    {
                        "value": "goAsk_question",
                        "text": "Задать вопрос"
                    }
                ]
            ]
        },
        "inputs": [
            {
                "type": "button",
                "value": "goPractice",
                "action": function(){
                    return { 
                        "state_name": "practice"
                    };
                }
            },
            {
                "type": "button",
                "value": "goDict",
                "action": function(){
                    return { 
                        "state_name": "dict"
                    };
                }
            },
            {
                "type": "button",
                "value": "goAsk_question",
                "action": function(){
                    return { 
                        "state_name": "ask_question"
                    };
                }
            }
        ]
    },
    {
        "state_name": "practice", // Нужно использовать данные, которые получатся с запроса. 
        //Т.е., сперва - вызвать запрос, затем - использовать данные от него. Как это сделать?
        "pre_out": function() {
            var lessons = serv.getLessons(user_data.local_id); // Функция не описана. 
            return {
                "type": "text",
                "body": 'Раздел "ПРАКТИКА"\n' + lessons, // Как бы сюда вставить цикл по lessons?..
                "keyboard": [
                    [

                    ], // Как бы сюда вставить цикл по lessons?..
                    [
                        {
                            "value": "goMain",
                            "text": "На главную",
                        }
                    ]
                ]
            };
        },
        "inputs": [
            {
                "type": "button",
                "value": "goMain",
                "action": function(){
                    return { 
                        "state_name": "main"
                    };
                }
            },
            {

            } // Как бы сюда вставить цикл по lessons?..
        ]
    },
    {
        "state_name": "ask_question",
        "pre_out": {
            "type": "text",
            "body": "Чем могу помочь?", // Я бы перенёс в Main на "после нажатия"
            "keyboard": [
                [
                    {
                        "value": "goMain",
                        "text": "На главную",
                    }
                ]
            ]
        },
        "inputs": [
            {
                "type": "button",
                "value": "goMain",
                "action": function(){
                    return { 
                        "state_name": "main"
                    };
                }
            },
            {
                "type": "text",
                "value": value, // -//-
                "action": function(value){ // Как реализовать диалог?
                    return { 
                        "state_name": "ask_question", 
                        "output": { //

                        }
                    };
                },
            }
        ]
    },
    {
        "state_name": "dict",
        "pre_out": {
            "type": "text",
            "body": 'Раздел "ЛИЧНЫЙ СЛОВАРЬ"',
            "keyboard": [
                [
                    {
                        "value": "goVoice",
                        "text": "Озвучить добавленнные",
                    },
                    {
                        "value": "goAddSentence",
                        "text": "Добавить новое предложение"
                    }
                ], 
                [
                    {
                        "value": "goDictReminder",
                        "text": "Учить словарь"
                    },
                    {
                        "value": "goNotifSettings",
                        "text": "Настройка оповещения"
                    }
                ],
                [
                    {
                        "value": "goMain",
                        "text": "На главную",
                    }
                ]
            ]
        },
        "inputs": [
            {
                "type": "button",
                "value": "goVoice",
                "action": function(){
                    return { 
                        "state_name": "voice"
                    };
                }
            },
            {
                "type": "button",
                "value": "goAddSentence",
                "action": function(){
                    return { 
                        "state_name": "add_sentence"
                    };
                }
            },
            {
                "type": "button",
                "value": "goDictReminder",
                "action": function(){
                    return { 
                        "state_name": "dict_reminder"
                    };
                }
            },
            {
                "type": "button",
                "value": "goNotifSettings",
                "action": function(){
                    return { 
                        "state_name": "notif_settings"
                    };
                }
            },
            {
                "type": "button",
                "value": "goMain",
                "action": function(){
                    return { 
                        "state_name": "main"
                    };
                }
            }
        ]
    }
];

var hooks = [ // Пока не трогал этот раздел
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

module.exports = {"states": states, "hooks": hooks, "commands": commands, "user_data": user_data}