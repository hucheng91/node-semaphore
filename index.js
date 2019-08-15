/*
 * @Author: hucheng
 * @Date: 2019-08-15 11:33:54
 * @Description: here is des
 */


class Semaphore {

    constructor(available) {
        this.available = available;
        /** @type {(function(): void)[]} */
        this.waiters = [];
        /** @private */
        this._continue = this._continue.bind(this);
    }

	/**
	 * @param {function(): void} callback function block to capture and run
	 * @returns {void}
	 */
    acquire(callback) {
        if (this.available > 0) {
            this.available--;
            callback();
        } else {
            this.waiters.push(callback);
        }
    }

    release() {
        this.available++;
        if (this.waiters.length > 0) {
            process.nextTick(this._continue);
        }
    }

    _continue() {
        if (this.available > 0) {
            if (this.waiters.length > 0) {
                this.available--;
                const callback = this.waiters.pop();
                callback();
            }
        }
    }
}

module.exports = Semaphore;
