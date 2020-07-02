export default class Socket {
	constructor() {
		this.socket = {
			on: () => {this.on(arguments)},
			send: data => {if (this.ws) this.ws.send(data)},
			send_cmd: () => {this.send_cmd(arguments)},
			close: () => {if (this.ws) this.ws.close()}
		}

		this.events = {}
		this.server = 'wss://ws.emupedia.net'
		this.connected = false
		this.last_on_set = Math.floor(Date.now() / 1000)
		this.keep_alive()
	}

	do_merge(data1, data2) {
		var ret = false

		if (typeof data1 !== 'object' || typeof data2 !== 'object') {
			data1 = data2

			return true
		}

		for (var n in data2) {
			if (!data1[n]) {
				data1[n] = data2[n]

				if (!ret) ret = true
			} else {
				if (typeof data1[n] ==='object' && typeof data2[n] ==='object') {
					var ret2 = this.do_merge(data1[n],data2[n])

					if (!ret) ret = ret2
				} else {
					data1[n] = data2[n]

					if (!ret) ret = true
				}
			}
		}

		return ret
	}

	keep_alive() {
		if (this.keep_alive_interval) clearInterval(this.keep_alive_interval)

		this.keep_alive_interval = setInterval(() => {
			this.send('ping')
		}, 30000)

		return this
	}

	map_room(e, data) {
		switch(e) {
			case 'room.info':
				this.room = data
				break
			case 'my.info':
			case 'auth.info':
				this.me = data
				break
			case 'room.user_join':
				if (data.user && this.room && data.room && this.room.room === data.room) {
					if (data.user === this.room.me) return false

					this.room.users[data.user] = data.data
				}
				break
			case 'room.user_leave':
				if (data.user && this.room && data.room && this.room.room === data.room) {
					if (this.room.users[data.user]) delete this.room.users[data.user]
				 }
				break
			case 'room.user_data':
				if (data.user && this.room && this.room.users[data.user]) {
					this.do_merge(this.room.users[data.user].data, data.data)

					if (data.user === this.room.me && this.me) this.do_merge(this.me.data, data.data)
				}
				break
			case 'room.data':
				if (this.room && this.room.name === data.room) {
					this.do_merge(this.room.data, data.data)
				}
				break
		}

		return true
	}

	emit_event(e, data) {
		if (!e) return false

		if (!this.map_room(e, data)) return false

		if (typeof this.events['cmd'] === 'object') this.events['cmd'].forEach(cb => {
			cb({cmd: e, data: data})
		})

		if (typeof this.events[e] === 'object') this.events[e].forEach(cb => {
			cb(data)
		})

	}

	connect() {
		let server = arguments[0] || false

		if (server) this.server = server

		if (this.socket.close) this.socket.close(4666)

		if (this.connect_timeout) clearTimeout(this.connect_timeout)

		let last_on = Math.floor(Date.now() / 1000) - this.last_on_set

		if (last_on < 2) {
			this.connect_timeout = setTimeout(() => {
				this.connect()
			})

			return this
		}

		this.connect_socket()

		return this
	}

	disconnect() {
		if (this.connected) this.socket.close(4666)

		return this
	}

	on(cmd, call_back) {
		this.last_on_set = Math.floor(Date.now() / 1000)

		if (!cmd) return this

		if (typeof call_back !== 'function') return this

		if (!this.events[cmd]) {
			this.events[cmd] = []
		}

		this.events[cmd].push(call_back)

		return this
	}

	connect_socket() {
		this.ws = new WebSocket(this.server)

		this.ws.onopen = () => {
			this.connected = true
			this.emit_event('connect', { server: this.server })
		}

		this.ws.onclose = (close_event) => {
			this.connected = false

			if (close_event.code !== 4666) {
				if (this.connect_timeout) clearTimeout(this.connect_timeout)

				this.connect_timeout = setTimeout(() => {
					this.connect()
				}, 10000)
			}

			this.emit_event('disconnect', close_event)
		}

		this.ws.onmessage = (message) => {
			let data

			try {
				data = JSON.parse(message.data)
			} catch (error) {
				data = message.data
			}

			this.emit_event(data.cmd, data.data)
		}

		return this
	}

	send(data) {

		if (data.cmd === 'connect') return this.connect(data.data)

		if (data.cmd === 'disconnect') return this.disconnect()

		if (!this.connected) return this

		this.socket.send(JSON.stringify(data))

		return this
	}

	send_cmd(cmd, data) {
		return this.send({
			cmd: cmd,
			data: data
		})
	}
}