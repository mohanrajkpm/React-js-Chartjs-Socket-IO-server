import express from 'express'
import http from 'http'
import * as socketio from 'socket.io'
const port = 4001;

const app = express()
const httpServer = http.createServer(app)

const server =  new socketio.Server(httpServer, {
	cors: {
		origin: '*',
	}
})

function generateData(){
	const min = 2015;
	const max = 2020;
	let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
	const user_min = 10000;
	const user_max = 95000;
	let urandomNumber = Math.floor(Math.random() * (user_max - user_min + 1)) + user_min;

	const data = [
		{
			id: 1,
			year: Math.floor(Math.random() * (max - min + 1)) + min,
			userGain: Math.floor(Math.random() * (user_max - user_min + 1)) + user_min,
			userLost: 723
		},
		{
			id: 2,
			year: Math.floor(Math.random() * (max - min + 1)) + min,
			userGain: Math.floor(Math.random() * (user_max - user_min + 1)) + user_min,
			userLost: 345
		},
		{
			id: 3,
			year: Math.floor(Math.random() * (max - min + 1)) + min,
			userGain: Math.floor(Math.random() * (user_max - user_min + 1)) + user_min,
			userLost: 723
		},
		{
			id: 4,
			year: Math.floor(Math.random() * (max - min + 1)) + min,
			userGain: Math.floor(Math.random() * (user_max - user_min + 1)) + user_min,
			userLost: 345
		}

	];
	return data;
}

let timeChange

server.on('connection', (socket) => {
	console.log('connected');
	if(timeChange) clearInterval(timeChange)
	setInterval(() => socket.emit('message', generateData() ), 1000)
})
httpServer.listen(port)