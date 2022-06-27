/**
 * @author Keinz & Vaidio
 * @project valostats-website
 * @date 25/06/2022
 */

const express = require('express')
const app = express();
const port = 8081;

const cors = require('cors');

const https = require('node:https');
https.createServer(app);

app.use(cors(), express.json());

console.log(`Starting backend on port ${port}`);

app.get('/api/agents', (req, res) => {
    let agents = [];

    https.get('https://valorant-api.com/v1/agents', {}, (response) => {
        let data = '';

        response.on('data', (chunk) => {
            data += chunk;
        });

        response.on('end', () => {
            data = JSON.parse(data);

            if (data.status === 200) {
                for (let agent of data.data) {
                    if (agent.isPlayableCharacter) {
                        if (agent.abilities.length >= 5) {
                            agent.abilities.pop();
                        }

                        agents.push({
                            displayName : agent.displayName,
                            preview : agent.fullPortraitV2,
                            role : agent.role.displayName,
                            abilities : agent.abilities
                        })
                    }
                }

                res.send({
                    status : data.status,
                    agents : agents
                })
            } else {
                res.send({
                    status : data.status
                })
            }
        })
    }).on('error', (error) => {
        res.send(error);
    });
})

app.get('/api/maps', (req, res) => {
    let maps = [];

    https.get('https://valorant-api.com/v1/maps', {}, (response) => {
        let data = '';

        response.on('data', (chunk) => {
            data += chunk;
        });

        response.on('end', () => {
            data = JSON.parse(data);

            if (data.status === 200) {
                for (let map of data.data) {
                    maps.push({
                        displayName : map.displayName,
                        preview : map.splash
                    })
                }

                res.send({
                    status : data.status,
                    maps : maps
                })
            } else {
                res.send({
                    status : data.status
                })
            }
        })
    }).on('error', (error) => {
        res.send(error);
    });
})

app.get('/api/weapons', (req, res) => {
    let weapons = [];

    https.get('https://valorant-api.com/v1/weapons', {}, (response) => {
        let data = '';

        response.on('data', (chunk) => {
            data += chunk;
        });

        response.on('end', () => {
            data = JSON.parse(data);

            if (data.status === 200) {
                for (let weapon of data.data) {
                    if (weapon.shopData !== null) {
                        weapons.push({
                            displayName : weapon.displayName,
                            preview : weapon.displayIcon,
                            category : weapon.shopData.categoryText,
                            cost : weapon.shopData.cost
                        })
                    }
                }

                res.send({
                    status : data.status,
                    weapons : weapons
                })
            } else {
                res.send({
                    status : data.status
                })
            }
        })
    }).on('error', (error) => {
        res.send(error);
    });
})

app.get("/api/leaderboard/:region/:max_players", (req, res) => {
    https.get(`https://api.henrikdev.xyz/valorant/v1/leaderboard/${req.params.region}`, {}, (response) => {
        let dataLeaderboard = '';

        response.on('data', (chunk) => {
            dataLeaderboard += chunk;
        });

        response.on('end', () => {
            dataLeaderboard = JSON.parse(dataLeaderboard);

            if (dataLeaderboard !== null && dataLeaderboard.length > 0) {
                let leaderboard = [];

                for (let player of dataLeaderboard) {
                    if (player.leaderboardRank >= 1 && player.leaderboardRank <= req.params.max_players) {
                        leaderboard.push(player);
                    } else {
                        break;
                    }
                }

                res.send({
                    status : res.statusCode,
                    data : leaderboard
                });
            }
        })
    }).on('error', (error) => {
        res.send(error);
    });
})

app.get("/api/stats/:name/:tag", (req, res) => {
    let userData = {};

    https.get(`https://api.henrikdev.xyz/valorant/v1/account/${req.params.name}/${req.params.tag}`, {}, (response) => {
        let dataGlobal = '';

        response.on('data', (chunk) => {
            dataGlobal += chunk;
        });

        response.on('end', () => {
            dataGlobal = JSON.parse(dataGlobal);

            if (dataGlobal.status === 200) {
                userData = {
                    status : dataGlobal.status,

                    stats : {
                        name : dataGlobal.data.name,
                        tag : dataGlobal.data.tag,
                        level : dataGlobal.data.account_level,
                        region : dataGlobal.data.region,
                        card : dataGlobal.data.card
                    }
                }

                https.get(`https://api.henrikdev.xyz/valorant/v2/mmr/${userData.stats.region}/${userData.stats.name}/${userData.stats.tag}`, {}, (response) => {
                    let dataMMR = '';

                    response.on('data', (chunk) => {
                        dataMMR += chunk;
                    });

                    response.on('end', () => {
                        dataMMR = JSON.parse(dataMMR);

                        if (dataMMR.status === 200) {
                            userData.stats.ranked_data = {
                                rank : dataMMR.data.current_data.currenttierpatched,
                                tier : dataMMR.data.current_data.ranking_in_tier,
                                elo : dataMMR.data.current_data.elo
                            }


                            https.get(`https://api.henrikdev.xyz/valorant/v1/mmr-history/${userData.stats.region}/${userData.stats.name}/${userData.stats.tag}`, {}, (response) => {
                                let dataMMRHistory = '';

                                response.on('data', (chunk) => {
                                    dataMMRHistory += chunk;
                                });

                                response.on('end', () => {
                                    dataMMRHistory = JSON.parse(dataMMRHistory);

                                    if (dataMMRHistory.status === 200) {
                                        let games = [];

                                        for (let game of dataMMRHistory.data) {
                                            games.push({
                                                rank : game.currenttierpatched,
                                                elo : game.elo,
                                                date : game.date
                                            })
                                        }

                                        userData.stats.ranked_data_history = games;

                                        https.get(`https://api.henrikdev.xyz/valorant/v3/matches/${userData.stats.region}/${userData.stats.name}/${userData.stats.tag}`, {}, (response) => {
                                            let dataMatchHistory = '';

                                            response.on('data', (chunk) => {
                                                dataMatchHistory += chunk;
                                            });

                                            response.on('end', () => {
                                                dataMatchHistory = JSON.parse(dataMatchHistory);

                                                if (dataMatchHistory.status === 200) {
                                                    let matches = [];

                                                    for (let match of dataMatchHistory.data) {
                                                        matches.push({
                                                            metadata : match.metadata,
                                                            players : match.players,
                                                            teams : match.teams
                                                        })
                                                    }

                                                    userData.stats.match_data_history = matches;

                                                    https.get(`https://api.henrikdev.xyz/valorant/v1/status/${userData.stats.region}`, {}, (response) => {
                                                        let dataServer = '';

                                                        response.on('data', (chunk) => {
                                                            dataServer += chunk;
                                                        });

                                                        response.on('end', () => {
                                                            dataServer = JSON.parse(dataServer);

                                                            if (dataServer.status === 200) {
                                                                userData.stats.server = {
                                                                    region : dataServer.region,
                                                                    server_status : dataServer.data
                                                                };

                                                                res.send(userData);
                                                            } else {
                                                                res.send({
                                                                    status : dataServer.status
                                                                })
                                                            }
                                                        })
                                                    }).on('error', (error) => {
                                                        res.send(error);
                                                    });
                                                } else {
                                                    res.send({
                                                        status : dataMatchHistory.status
                                                    })
                                                }
                                            })
                                        }).on('error', (error) => {
                                            res.send(error);
                                        });
                                    } else {
                                        res.send({
                                            status : dataMMRHistory.status
                                        })
                                    }
                                })
                            }).on('error', (error) => {
                                res.send(error);
                            });
                        } else {
                            res.send({
                                status : dataMMR.status
                            })
                        }
                    })
                }).on('error', (error) => {
                    res.send(error);
                });
            } else {
                res.send({
                    status : dataGlobal.status
                })
            }
        })
    }).on('error', (error) => {
        res.send(error);
    });
})

app.listen(port, () => console.log(`Backend listening on port ${port}`));