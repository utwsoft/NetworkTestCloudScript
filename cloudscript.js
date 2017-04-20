///////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Welcome to your first Cloud Script revision!
//
// Cloud Script runs in the PlayFab cloud and has full access to the PlayFab Game Server API
// (https://api.playfab.com/Documentation/Server), and it runs in the context of a securely
// authenticated player, so you can use it to implement logic for your game that is safe from
// client-side exploits.
//
// Cloud Script functions can also make web requests to external HTTP
// endpoints, such as a database or private API for your title, which makes them a flexible
// way to integrate with your existing backend systems.
//
// There are several different options for calling Cloud Script functions:
//
// 1) Your game client calls them directly using the "ExecuteCloudScript" API,
// passing in the function name and arguments in the request and receiving the
// function return result in the response.
// (https://api.playfab.com/Documentation/Client/method/ExecuteCloudScript)
//
// 2) You create PlayStream event actions that call them when a particular
// event occurs, passing in the event and associated player profile data.
// (https://api.playfab.com/playstream/docs)
//
// 3) For titles using the Photon Add-on (https://playfab.com/marketplace/photon/),
// Photon room events trigger webhooks which call corresponding Cloud Script functions.
//
// The following examples demonstrate all three options.
//
///////////////////////////////////////////////////////////////////////////////////////////////////////
/*global handlers */
/*global server */
/*global http */
/*global log */
/*global script */
/*global currentPlayerId */
var GAMES_LIST_SUFFIX = '_GamesList';

function getGamesListId(playerId) {
    'use strict';
    return String(playerId) + GAMES_LIST_SUFFIX;
}

// http://stackoverflow.com/a/21273362/1449056
function undefinedOrNull(variable) {
    'use strict';
    return variable === undefined || variable === null;
}

// checks to see if an object has any properties
// Returns true for empty objects and false for non-empty objects
function isEmpty(obj) {
    'use strict';

    // Object.getOwnPropertyNames(obj).length vs. Object.keys(obj).length
    // http://stackoverflow.com/a/22658584/1449056
    return (undefinedOrNull(obj) || Object.getOwnPropertyNames(obj).length === 0);
}

function createSharedGroup(id) {
    'use strict';
    try  {
        server.CreateSharedGroup({ SharedGroupId: id });
    } catch (e) {
        throw e;
    }
}

function isString(obj) {
    'use strict';
    return (typeof obj === 'string' || obj instanceof String);
}

function updateSharedGroupData(id, data) {
    'use strict';
    var key;
    try  {
        for (key in data) {
            if (data.hasOwnProperty(key) && !undefinedOrNull(data[key]) && !isString(data[key])) {
                data[key] = JSON.stringify(data[key]);
            }
        }
        server.UpdateSharedGroupData({ SharedGroupId: id, Data: data });
    } catch (e) {
        throw e;
    }
}

function getSharedGroupData(id, keys) {
    'use strict';
    try  {
        var data = {}, key;
        if (undefinedOrNull(keys)) {
            data = server.GetSharedGroupData({ SharedGroupId: id }).Data;
        } else {
            data = server.GetSharedGroupData({ SharedGroupId: id, Keys: keys }).Data;
        }
        for (key in data) {
            if (data.hasOwnProperty(key)) {
                data[key] = JSON.parse(data[key].Value); // 'LastUpdated' and 'Permission' properties are overwritten
            }
        }
        return data;
    } catch (e) {
        throw e;
    }
}

function deleteSharedGroup(id) {
    'use strict';
    try  {
        server.DeleteSharedGroup({ SharedGroupId: id });
    } catch (e) {
        throw e;
    }
}

function getSharedGroupEntry(id, key) {
    'use strict';
    try  {
        return getSharedGroupData(id, [key]);
    } catch (e) {
        throw e;
    }
}

function updateSharedGroupEntry(id, key, value) {
    'use strict';
    try  {
        var data = {};
        data[key] = value;
        updateSharedGroupData(id, data);
    } catch (e) {
        throw e;
    }
}

function deleteSharedGroupEntry(id, key) {
    'use strict';
    try  {
        updateSharedGroupEntry(id, key, null);
    } catch (e) {
        throw e;
    }
}

function getISOTimestamp() {
    'use strict';
    try  {
        return (new Date()).toISOString();
    } catch (e) {
        throw e;
    }
}

function logException(timestamp, data, message) {
    'use strict';

    //TEMPORARY solution until log functions' output is available from GameManager
    server.SetTitleData({
        Key: timestamp + Math.random(),
        Value: JSON.stringify({ Message: message, Data: data })
    });
}

function PhotonException(code, msg, timestamp, data) {
    'use strict';
    this.ResultCode = code;
    this.Message = msg;
    this.Timestamp = timestamp;
    this.Data = data;
    logException(timestamp, data, msg);
    //this.Stack = (new Error()).stack;
}

PhotonException.prototype = Object.create(Error.prototype);
PhotonException.prototype.constructor = PhotonException;

var LeaveReason = {
    ClientDisconnect: '0', ClientTimeoutDisconnect: '1', ManagedDisconnect: '2', ServerDisconnect: '3', TimeoutDisconnect: '4', ConnectTimeout: '5',
    SwitchRoom: '100', LeaveRequest: '101', PlayerTtlTimedOut: '102', PeerLastTouchTimedout: '103', PluginRequest: '104', PluginFailedJoin: '105'
};

function checkWebhookArgs(args, timestamp) {
    'use strict';
    var msg = 'Missing argument: ';
    if (undefinedOrNull(args.AppId)) {
        throw new PhotonException(1, msg + 'AppId', timestamp, args);
    }
    if (undefinedOrNull(args.AppVersion)) {
        throw new PhotonException(1, msg + 'AppVersion', timestamp, args);
    }
    if (undefinedOrNull(args.Region)) {
        throw new PhotonException(1, msg + 'Region', timestamp, args);
    }
    if (undefinedOrNull(args.GameId)) {
        throw new PhotonException(1, msg + 'GameId', timestamp, args);
    }
    if (undefinedOrNull(args.Type)) {
        throw new PhotonException(1, msg + 'Type', timestamp, args);
    }
    if ((args.Type !== 'Close' && args.Type !== 'Save')) {
        if (undefinedOrNull(args.ActorNr)) {
            throw new PhotonException(1, msg + 'ActorNr', timestamp, args);
        }
        if (undefinedOrNull(args.UserId)) {
            throw new PhotonException(1, msg + 'UserId', timestamp, args);
        }
        if (args.UserId !== currentPlayerId) {
            throw new PhotonException(3, 'currentPlayerId=' + currentPlayerId + ' does not match UserId', timestamp, args);
        }
        if (undefinedOrNull(args.Username) && undefinedOrNull(args.Nickname)) {
            throw new PhotonException(1, msg + 'Username/Nickname', timestamp, args);
        }
    } else {
        if (undefinedOrNull(args.ActorCount)) {
            throw new PhotonException(1, msg + 'ActorCount', timestamp, args);
        }
        if (!undefinedOrNull(args.State2) && !undefinedOrNull(args.State2.ActorList)) {
            if (args.State2.ActorList.length !== args.ActorCount) {
                throw new PhotonException(2, 'ActorCount does not match ActorList.count', timestamp, args);
            }
        }
    }
    switch (args.Type) {
        case 'Load':
            if (undefinedOrNull(args.CreateIfNotExists)) {
                throw new PhotonException(1, msg + 'CreateIfNotExists', timestamp, args);
            }
            break;
        case 'Create':
            if (undefinedOrNull(args.CreateOptions)) {
                throw new PhotonException(1, msg + 'CreateOptions', timestamp, args);
            }
            if (args.ActorNr !== 1) {
                throw new PhotonException(2, 'ActorNr != 1 and Type == Create', timestamp, args);
            }
            break;
        case 'Join':
            break;
        case 'Player':
            if (undefinedOrNull(args.TargetActor)) {
                throw new PhotonException(1, msg + 'TargetActor', timestamp, args);
            }
            if (undefinedOrNull(args.Properties)) {
                throw new PhotonException(1, msg + 'Properties', timestamp, args);
            }
            if (!undefinedOrNull(args.Username) && undefinedOrNull(args.State)) {
                throw new PhotonException(1, msg + 'State', timestamp, args);
            }
            break;
        case 'Game':
            if (undefinedOrNull(args.Properties)) {
                throw new PhotonException(1, msg + 'Properties', timestamp, args);
            }
            if (!undefinedOrNull(args.Username) && undefinedOrNull(args.State)) {
                throw new PhotonException(1, msg + 'State', timestamp, args);
            }
            break;
        case 'Event':
            if (undefinedOrNull(args.Data)) {
                throw new PhotonException(1, msg + 'Data', timestamp, args);
            }
            if (!undefinedOrNull(args.Username) && undefinedOrNull(args.State)) {
                throw new PhotonException(1, msg + 'State', timestamp, args);
            }
            break;
        case 'Save':
            if (undefinedOrNull(args.State)) {
                throw new PhotonException(1, msg + 'State', timestamp, args);
            }
            if (args.ActorCount <= 0) {
                throw new PhotonException(2, 'ActorCount <= 0 and Type == Save', timestamp, args);
            }
            break;
        case 'Close':
            if (args.ActorCount !== 0) {
                throw new PhotonException(2, 'ActorCount != 0 and Type == Close', timestamp, args);
            }
            break;
        case 'Leave':
            throw new PhotonException(2, 'Deprecated forward plugin webhook!', timestamp, args);
        default:
            if (LeaveReason.hasOwnProperty(args.Type)) {
                if (undefinedOrNull(args.IsInactive)) {
                    throw new PhotonException(1, msg + 'IsInactive', timestamp, args);
                }
                if (undefinedOrNull(args.Reason)) {
                    throw new PhotonException(1, msg + 'Reason', timestamp, args);
                }
                if (LeaveReason[args.Type] !== args.Reason) {
                    throw new PhotonException(2, 'Reason code does not match Leave Type string', timestamp, args);
                }
                if (['1', '100', '103', '105'].indexOf(args.Reason) > -1) {
                    throw new PhotonException(2, 'Unexpected LeaveReason', timestamp, args);
                }
            } else {
                throw new PhotonException(2, 'Unexpected Type:' + args.Type);
            }
            break;
    }
}

function checkWebRpcArgs(args, timestamp) {
    'use strict';
    var msg = 'Missing argument: ';
    if (undefinedOrNull(args.AppId)) {
        throw new PhotonException(1, msg + 'AppId', timestamp, args);
    }
    if (undefinedOrNull(args.AppVersion)) {
        throw new PhotonException(1, msg + 'AppVersion', timestamp, args);
    }
    if (undefinedOrNull(args.Region)) {
        throw new PhotonException(1, msg + 'Region', timestamp, args);
    }
    if (undefinedOrNull(args.UserId)) {
        throw new PhotonException(1, msg + 'UserId', timestamp, args);
    }
}

// Placeholder to prevent Photon Error
function GetPlaceholderGameList(args) {
    'use strict';
    var propsA = { prop1: 123, prop2: "abc" };
    var propsB = { prop1: 456, prop2: "def" };

    var data = {};
    data["hello1"] = { ActorNr: 1138, Properties: propsA };
    data["hello2"] = { ActorNr: 5456, Properties: propsB };

    return { ResultCode: 0, Data: data };
}

function GetGameList(args) {
    'use strict';
    try  {
        var timestamp = getISOTimestamp(), gameList = {}, listToLoad = {}, gameKey = '', userKey = '', data = {};
        checkWebRpcArgs(args);
        log.debug("gamelist get shared group data");

        //var propsA = {prop1: 235, prop2: "abc"};
        //data["sanity"] = {ActorNr: 1234, Properties: propsA};
        gameList = getSharedGroupData(getGamesListId(currentPlayerId));

        for (gameKey in gameList) {
            if (gameList.hasOwnProperty(gameKey)) {
                log.debug("gamelist entry: " + gameKey);
                if (gameList[gameKey].Creation.UserId === currentPlayerId) {
                    data[gameKey] = { ActorNr: 1, Properties: gameList[gameKey].State.CustomProperties };
                } else {
                    data[gameKey] = { ActorNr: gameList[gameKey].ActorNr };
                    if (undefinedOrNull(listToLoad[gameList[gameKey].Creation.UserId])) {
                        listToLoad[gameList[gameKey].Creation.UserId] = [];
                    }
                    listToLoad[gameList[gameKey].Creation.UserId].push(data[gameKey]);
                }
            }
        }

        for (userKey in listToLoad) {
            if (listToLoad.hasOwnProperty(userKey)) {
                gameList = getSharedGroupData(getGamesListId(userKey), listToLoad[userKey]);
                for (gameKey in gameList) {
                    if (gameList.hasOwnProperty(gameKey)) {
                        data[gameKey].Properties = gameList[gameKey].State.CustomProperties;
                    }
                }
            }
        }

        return { ResultCode: 0, Data: data };
    } catch (e) {
        if (e instanceof PhotonException) {
            return { ResultCode: e.ResultCode, Message: e.Message };
        }
        return { ResultCode: -1, Message: e.name + ': ' + e.message };
    }
}

function onGameCreated(args, timestamp) {
    'use strict';
    var data = {};
    var msg = "";
    try  {
        createSharedGroup(args.GameId);
    } catch (e) {
        if (!undefinedOrNull(e.Error) && e.Error.error === "InvalidSharedGroupId") {
            log.info("game already exists.");
            msg = "game already exists.";
        } else {
            log.info("Other error");
            msg = "game error";
        }
    }

    data.Env = {
        Region: args.Region, AppVersion: args.AppVersion, AppId: args.AppId, TitleId: script.titleId,
        CloudScriptVersion: script.version, CloudScriptRevision: script.revision, PlayFabServerVersion: server.version,
        WebhooksVersion: undefinedOrNull(args.Nickname) ? '1.0' : '1.2'
    };
    data.RoomOptions = args.CreateOptions;
    data.Creation = { Timestamp: timestamp, UserId: args.UserId, Type: args.Type };
    data.Actors = { 1: { UserId: args.UserId, Inactive: false } };
    data.NextActorNr = 2;
    updateSharedGroupData(args.GameId, data);
    updateSharedGroupEntry(getGamesListId(currentPlayerId), args.GameId, data);

    return { ReturnCode: 0, Message: msg };
}

// Photon Webhooks Integration
//
// The following functions are examples of Photon Cloud Webhook handlers.
// When you enable the Photon Add-on (https://playfab.com/marketplace/photon/)
// in the Game Manager, your Photon applications are automatically configured
// to authenticate players using their PlayFab accounts and to fire events that
// trigger your Cloud Script Webhook handlers, if defined.
// This makes it easier than ever to incorporate multiplayer server logic into your game.
// Triggered automatically when a Photon room is first created
handlers.RoomCreated = function (args) {
    'use strict';
    log.debug("Room Created - Game: " + args.GameId + " MaxPlayers: " + args.CreateOptions.MaxPlayers);

    try  {
        var timestamp = getISOTimestamp(), data = {};
        checkWebhookArgs(args, timestamp);
        if (args.Type === 'Create') {
            onGameCreated(args, timestamp);
            return { ResultCode: 0, Message: 'OK' };
        } else if (args.Type === 'Load') {
            data = getSharedGroupEntry(getGamesListId(currentPlayerId), args.GameId);
            if (data.Creation.UserId !== currentPlayerId) {
                data = getSharedGroupEntry(getGamesListId(data.Creation.UserId), args.GameId);
            }
            if (undefinedOrNull(data.State)) {
                if (args.CreateIfNotExists === false) {
                    throw new PhotonException(5, 'Room=' + args.GameId + ' not found', timestamp, args);
                } else {
                    onGameCreated(args, timestamp);
                    return { ResultCode: 0, Message: 'OK', State: '' };
                }
            }
            if (undefinedOrNull(data.LoadEvents)) {
                data.LoadEvents = {};
            }
            data.LoadEvents[timestamp] = { ActorNr: args.ActorNr, UserId: args.UserId };
            createSharedGroup(args.GameId);
            updateSharedGroupData(args.GameId, data);
            return { ResultCode: 0, Message: 'OK', State: data.State };
        } else {
            throw new PhotonException(2, 'Wrong PathCreate Type=' + args.Type, timestamp, { Webhook: args });
        }
    } catch (e) {
        if (e instanceof PhotonException) {
            return { ResultCode: e.ResultCode, Message: e.Message };
        }
        return { ResultCode: -1, Message: e.name + ': ' + e.message };
    }
};

// Triggered automatically when a player joins a Photon room
handlers.RoomJoined = function (args) {
    'use strict';
    log.debug("Room Joined - Game: " + args.GameId + " PlayFabId: " + args.UserId);

    try  {
        var timestamp = getISOTimestamp(), data = {};
        checkWebhookArgs(args, timestamp);
        data = getSharedGroupData(args.GameId);
        if (args.Type !== 'Join') {
            throw new PhotonException(2, 'Wrong PathJoin Type=' + args.Type, timestamp, { Webhook: args, CustomState: data });
        }

        // TODO: compare data.Env with current env
        if (data.RoomOptions.PlayerTTL !== 0 && data.NextActorNr > args.ActorNr) {
            if (data.ActiveActors[args.ActorNr].Inactive === false) {
                throw new PhotonException(2, 'Actor is already joined', timestamp, { Webhook: args, CustomState: data });
            } else if (data.RoomOptions.CheckUserOnJoin === true && args.UserId !== data.Actors[args.ActorNr].UserId) {
                throw new PhotonException(2, 'Illegal rejoin with different UserId', timestamp, { Webhook: args, CustomState: data });
            } else if (args.UserId !== data.Actors[args.ActorNr].UserId) {
                data.Actors[args.ActorNr].UserId = args.UserId;
            }
            data.Actors[args.ActorNr].Inactive = false;
        } else if (data.NextActorNr === args.ActorNr) {
            if (Object.keys(data.Actors).length === args.RoomOptions.MaxPlayers) {
                throw new PhotonException(2, 'Actors overflow', timestamp, { Webhook: args, CustomState: data });
            }
            data.Actors[args.ActorNr] = { UserId: args.UserId, Inactive: false };
            data.NextActorNr = data.NextActorNr + 1;
        } else {
            throw new PhotonException(2, 'Unexpected ActorNr', timestamp, { Webhook: args, CustomState: data });
        }
        if (undefinedOrNull(data.JoinEvents)) {
            data.JoinEvents = {};
        }
        data.JoinEvents[timestamp] = { ActorNr: args.ActorNr, UserId: args.UserId };
        updateSharedGroupData(args.GameId, data);
        updateSharedGroupEntry(getGamesListId(currentPlayerId), args.GameId, { Env: data.Env, Creation: data.Creation, ActorNr: args.ActorNr });
        return { ResultCode: 0, Message: 'OK' };
    } catch (e) {
        if (e instanceof PhotonException) {
            return { ResultCode: e.ResultCode, Message: e.Message };
        }
        return { ResultCode: -1, Message: e.name + ': ' + e.message };
    }
};

// Triggered automatically when a player leaves a Photon room
handlers.RoomLeft = function (args) {
    'use strict';
    log.debug("Room Left - Game: " + args.GameId + " PlayFabId: " + args.UserId);

    try  {
        var timestamp = getISOTimestamp(), data = {};
        checkWebhookArgs(args, timestamp);
        data = getSharedGroupData(args.GameId);
        if (!LeaveReason.hasOwnProperty(args.Type)) {
            throw new PhotonException(2, 'Wrong PathLeave Type=' + args.Type, timestamp, { Webhook: args, CustomState: data });
        }

        // TODO: compare data.Env with current env
        if (!data.Actors.hasOwnProperty(args.ActorNr)) {
            throw new PhotonException(2, 'No ActorNr inside the room', timestamp, { Webhook: args, CustomState: data });
        }
        if (args.Type !== LeaveReason.PlayerTtlTimedOut && data.Actors[args.ActorNr].Inactive === true) {
            throw new PhotonException(2, 'Inactive actors cant leave', timestamp, { Webhook: args, CustomState: data });
        }
        if (data.Actors[args.ActorNr].UserId !== args.UserId) {
            throw new PhotonException(2, 'Leaving UserId is different from joined', timestamp, { Webhook: args, CustomState: data });
        }
        if (args.Inactive) {
            data.Actors[args.ActorNr].Inactive = true;
        } else {
            delete data.Actors[args.ActorNr];
            deleteSharedGroupEntry(getGamesListId(currentPlayerId), args.GameId);
        }
        if (undefinedOrNull(data.LeaveEvents)) {
            data.LeaveEvents = {};
        }
        data.LeaveEvents[timestamp] = { ActorNr: args.ActorNr, UserId: args.UserId, CanRejoin: args.Inactive };
        updateSharedGroupData(args.GameId, data);
        return { ResultCode: 0, Message: 'OK' };
    } catch (e) {
        if (e instanceof PhotonException) {
            return { ResultCode: e.ResultCode, Message: e.Message };
        }
        return { ResultCode: -1, Message: e.name + ': ' + e.message };
    }
};

// Triggered automatically when a Photon room closes
// Note: currentPlayerId is undefined in this function
handlers.RoomClosed = function (args) {
    'use strict';
    log.debug("Room Closed - Game: " + args.GameId);

    try  {
        var timestamp = getISOTimestamp(), data = {};
        checkWebhookArgs(args, timestamp);
        data = getSharedGroupData(args.GameId);
        if (Object.keys(data.Actors).length !== args.ActorCount) {
            throw new PhotonException(6, 'Actors count does not match', timestamp, { Webhook: args, CustomState: data });
        }

        // TODO: compare data.Env with current env
        if (args.Type === 'Close') {
            deleteSharedGroupEntry(getGamesListId(data.Creation.UserId), args.GameId);
        } else if (args.Type === 'Save') {
            if (undefinedOrNull(data.SaveEvents)) {
                data.SaveEvents = {};
            }
            data.SaveEvents[timestamp] = { ActorCount: args.ActorCount };
            data.State = args.State;
            updateSharedGroupEntry(getGamesListId(data.Creation.UserId), args.GameId, data);
        } else {
            throw new PhotonException(2, 'Wrong PathClose Type=' + args.Type, timestamp, { Webhook: args, CustomState: data });
        }
        deleteSharedGroup(args.GameId);
        return { ResultCode: 0, Message: 'OK' };
    } catch (e) {
        if (e instanceof PhotonException) {
            return { ResultCode: e.ResultCode, Message: e.Message };
        }
        return { ResultCode: -1, Message: e.name + ': ' + e.message };
    }
};

// Triggered automatically when a Photon room game property is updated.
// Note: currentPlayerId is undefined in this function
handlers.RoomPropertyUpdated = function (args) {
    log.debug("Room Property Updated - Game: " + args.GameId);
};

// Triggered by calling "OpRaiseEvent" on the Photon client. The "args.Data" property is
// set to the value of the "customEventContent" HashTable parameter, so you can use
// it to pass in arbitrary data.
handlers.RoomEventRaised = function (args) {
    var eventData = args.Data;
    log.debug("Event Raised - Game: " + args.GameId + " Event Type: " + eventData.eventType);

    switch (eventData.eventType) {
        case "playerMove":
            processPlayerMove(eventData);
            break;

        default:
            break;
    }
};

handlers.GetGameList = function (args) {
    return GetGameList(args);
};

handlers.InitGameList = function (args, context) {
    var sharedGroupId = getGamesListId(currentPlayerId);
    var msg = 'return message';
    try  {
        createSharedGroup(sharedGroupId);
        msg = "game list created";
    } catch (e) {
        if (!undefinedOrNull(e.Error) && e.Error.error === "InvalidSharedGroupId") {
            log.info("Games list already exists.");
            msg = "game list already exists.";
        } else {
            log.info("Other error");
            msg = "game list error";
        }
    }

    //var data = {};
    //data = getSharedGroupData(getGamesListId(currentPlayerId));
    //if (undefinedOrNull(data))
    //{
    //log.debug("Games list does not exist. Creating.");
    //createSharedGroup(getGamesListId(currentPlayerId));
    //}
    //else {
    // 	log.debug("Games list already exists.");
    //}
    return { ResultCode: 0, Message: msg };
};

// This is a Cloud Script function. "args" is set to the value of the "FunctionParameter"
// parameter of the ExecuteCloudScript API.
// (https://api.playfab.com/Documentation/Client/method/ExecuteCloudScript)
// "context" contains additional information when the Cloud Script function is called from a PlayStream action.
handlers.helloWorld = function (args, context) {
    // The pre-defined "currentPlayerId" variable is initialized to the PlayFab ID of the player logged-in on the game client.
    // Cloud Script handles authenticating the player automatically.
    var message = "Hello " + currentPlayerId + "!";

    // You can use the "log" object to write out debugging statements. It has
    // three functions corresponding to logging level: debug, info, and error. These functions
    // take a message string and an optional object.
    log.info(message);
    var inputValue = null;
    if (args && args.inputValue)
        inputValue = args.inputValue;
    log.debug("helloWorld:", { input: inputValue });

    // The value you return from a Cloud Script function is passed back
    // to the game client in the ExecuteCloudScript API response, along with any log statements
    // and additional diagnostic information, such as any errors returned by API calls or external HTTP
    // requests. They are also included in the optional player_executed_cloudscript PlayStream event
    // generated by the function execution.
    // (https://api.playfab.com/playstream/docs/PlayStreamEventModels/player/player_executed_cloudscript)
    return { messageValue: message };
};

// This is a simple example of making a PlayFab server API call
handlers.makeAPICall = function (args, context) {
    var request = {
        PlayFabId: currentPlayerId, Statistics: [{
                StatisticName: "Level",
                Value: 2
            }]
    };

    // The pre-defined "server" object has functions corresponding to each PlayFab server API
    // (https://api.playfab.com/Documentation/Server). It is automatically
    // authenticated as your title and handles all communication with
    // the PlayFab API, so you don't have to write extra code to issue HTTP requests.
    var playerStatResult = server.UpdatePlayerStatistics(request);
};

// This is a simple example of making a web request to an external HTTP API.
handlers.makeHTTPRequest = function (args, context) {
    var headers = {
        "X-MyCustomHeader": "Some Value"
    };

    var body = {
        input: args,
        userId: currentPlayerId,
        mode: "foobar"
    };

    var url = "http://httpbin.org/status/200";
    var content = JSON.stringify(body);
    var httpMethod = "post";
    var contentType = "application/json";

    // The pre-defined http object makes synchronous HTTP requests
    var response = http.request(url, httpMethod, content, contentType, headers);
    return { responseContent: response };
};

// This is a simple example of a function that is called from a
// PlayStream event action. (https://playfab.com/introducing-playstream/)
handlers.handlePlayStreamEventAndProfile = function (args, context) {
    // The event that triggered the action
    // (https://api.playfab.com/playstream/docs/PlayStreamEventModels)
    var psEvent = context.playStreamEvent;

    // The profile data of the player associated with the event
    // (https://api.playfab.com/playstream/docs/PlayStreamProfileModels)
    var profile = context.playerProfile;

    // Post data about the event to an external API
    var content = JSON.stringify({ user: profile.PlayerId, event: psEvent.EventName });
    var response = http.request('https://httpbin.org/status/200', 'post', content, 'application/json', null);

    return { externalAPIResponse: response };
};

// Below are some examples of using Cloud Script in slightly more realistic scenarios
// This is a function that the game client would call whenever a player completes
// a level. It updates a setting in the player's data that only game server
// code can write - it is read-only on the client - and it updates a player
// statistic that can be used for leaderboards.
//
// A funtion like this could be extended to perform validation on the
// level completion data to detect cheating. It could also do things like
// award the player items from the game catalog based on their performance.
handlers.completedLevel = function (args, context) {
    var level = args.levelName;
    var monstersKilled = args.monstersKilled;

    var updateUserDataResult = server.UpdateUserInternalData({
        PlayFabId: currentPlayerId,
        Data: {
            lastLevelCompleted: level
        }
    });

    log.debug("Set lastLevelCompleted for player " + currentPlayerId + " to " + level);
    var request = {
        PlayFabId: currentPlayerId, Statistics: [{
                StatisticName: "level_monster_kills",
                Value: monstersKilled
            }]
    };
    server.UpdatePlayerStatistics(request);
    log.debug("Updated level_monster_kills stat for player " + currentPlayerId + " to " + monstersKilled);
};

// In addition to the Cloud Script handlers, you can define your own functions and call them from your handlers.
// This makes it possible to share code between multiple handlers and to improve code organization.
handlers.updatePlayerMove = function (args) {
    var validMove = processPlayerMove(args);
    return { validMove: validMove };
};

// This is a helper function that verifies that the player's move wasn't made
// too quickly following their previous move, according to the rules of the game.
// If the move is valid, then it updates the player's statistics and profile data.
// This function is called from the "UpdatePlayerMove" handler above and also is
// triggered by the "RoomEventRaised" Photon room event in the Webhook handler
// below.
//
// For this example, the script defines the cooldown period (playerMoveCooldownInSeconds)
// as 15 seconds. A recommended approach for values like this would be to create them in Title
// Data, so that they can be queries in the script with a call to GetTitleData
// (https://api.playfab.com/Documentation/Server/method/GetTitleData). This would allow you to
// make adjustments to these values over time, without having to edit, test, and roll out an
// updated script.
function processPlayerMove(playerMove) {
    var now = Date.now();
    var playerMoveCooldownInSeconds = 15;

    var playerData = server.GetUserInternalData({
        PlayFabId: currentPlayerId,
        Keys: ["last_move_timestamp"]
    });

    var lastMoveTimestampSetting = playerData.Data["last_move_timestamp"];

    if (lastMoveTimestampSetting) {
        var lastMoveTime = Date.parse(lastMoveTimestampSetting.Value);
        var timeSinceLastMoveInSeconds = (now - lastMoveTime) / 1000;
        log.debug("lastMoveTime: " + lastMoveTime + " now: " + now + " timeSinceLastMoveInSeconds: " + timeSinceLastMoveInSeconds);

        if (timeSinceLastMoveInSeconds < playerMoveCooldownInSeconds) {
            log.error("Invalid move - time since last move: " + timeSinceLastMoveInSeconds + "s less than minimum of " + playerMoveCooldownInSeconds + "s.");
            return false;
        }
    }

    var playerStats = server.GetPlayerStatistics({
        PlayFabId: currentPlayerId
    }).Statistics;
    var movesMade = 0;
    for (var i = 0; i < playerStats.length; i++)
        if (playerStats[i].StatisticName === "")
            movesMade = playerStats[i].Value;
    movesMade += 1;
    var request = {
        PlayFabId: currentPlayerId, Statistics: [{
                StatisticName: "movesMade",
                Value: movesMade
            }]
    };
    server.UpdatePlayerStatistics(request);
    server.UpdateUserInternalData({
        PlayFabId: currentPlayerId,
        Data: {
            last_move_timestamp: new Date(now).toUTCString(),
            last_move: JSON.stringify(playerMove)
        }
    });

    return true;
}

// This is an example of using PlayStream real-time segmentation to trigger
// game logic based on player behavior. (https://playfab.com/introducing-playstream/)
// The function is called when a player_statistic_changed PlayStream event causes a player
// to enter a segment defined for high skill players. It sets a key value in
// the player's internal data which unlocks some new content for the player.
handlers.unlockHighSkillContent = function (args, context) {
    var playerStatUpdatedEvent = context.playStreamEvent;
    var request = {
        PlayFabId: currentPlayerId,
        Data: {
            "HighSkillContent": "true",
            "XPAtHighSkillUnlock": playerStatUpdatedEvent.StatisticValue.toString()
        }
    };
    var playerInternalData = server.UpdateUserInternalData(request);
    log.info('Unlocked HighSkillContent for ' + context.playerProfile.DisplayName);
    return { profile: context.playerProfile };
};
//# sourceMappingURL=cloudscript.js.map
