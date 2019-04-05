class Logger {

    private topic: string | undefined;
    private start: number | undefined;

    begin(topic: string, ...args: any): Logger {
        this.topic = topic;
        if (!this.topic) {
            console.log(`Missing logging properties, [topic=${this.topic}]`, ...args);
            return this;
        }
        this.start = new Date().getTime();
        console.log(`${topic} - begin`);
        return this;
    }

    end(topic?: string, ...args: any): Logger {
        this.topic = topic || this.topic;
        if (!this.start || (!this.topic)) {
            console.log(`Missing logging properties, [start=${this.start}, topic=${this.topic}]`);
            return this;
        }
        const performance = new Date().getTime() - this.start;
        console.log(`${this.topic} - end, taken=${performance}ms`, ...args);
        this.topic = undefined;
        return this;
    }

    log(message: string, ...args: any): Logger {
        console.log(message, ...args);
        return this;
    }

    error(message: string, ...args: any): Logger {
        console.error(message, ...args);
        return this;
    }

    debug(message: string, ...args: any): Logger {
        console.debug(message, ...args);
        return this;
    }
}

export {Logger};