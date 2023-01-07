class SocketState {
    constructor() {
        this.users = []
        this.tasks = []
    }

    addUser(user) {
        this.removeUser(user.userId)
        this.users.push(user)
    }

    removeUser(userId) {
        this.users = this.users.filter(user => user.userId !== userId)
    }

    getUserList(roomId) {
        return this.users.filter(user => user.roomId === roomId)
    }

    setVote(userId, vote) {
        for (let item of this.users) {
            if (item.userId === userId) {
                item.vote = vote
            }
        }
    }

    addTask(roomId, task) {
        const tasks = this.getTasks(roomId)
        const active = !tasks.length || tasks.every(({vote}) => vote)
        this.tasks.unshift({ ...task, roomId, active })
    }

    getTasks(roomId) {
        return this.tasks.filter(task => task.roomId === roomId)
    }

    skipTask(roomId) {
        const votes = this.getUserList(roomId).map(({vote}) => vote)
        const vote = (votes.reduce((a, b) => (a + b)) / votes.length)

        const prevIndex = this.getTasks(roomId).findIndex(item => item.active) - 1

        for (let item of this.users) {
            if (item.roomId === roomId) {
                item.vote = undefined
            }
        }

        this.tasks = this.tasks.map((item, index) => {
            if (item.roomId !== roomId) {
                return item
            }

            if (item.active) {
                return { ...item, vote, active: false }
            }

            if (index === prevIndex) {
                return { ...item, active: true}
            }

            return item
        })
    }
}


module.exports = {
    SocketState: new SocketState()
}
