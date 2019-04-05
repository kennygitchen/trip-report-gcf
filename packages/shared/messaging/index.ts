import {PubSub} from '@google-cloud/pubsub';

async function sendMessage(topic: string, message: any, attributes?: any): Promise<string> {
    const pubsub = new PubSub();
    try {
        console.log(`Send Message, topic=${topic} - start`);
        const buffer = Buffer.from(JSON.stringify(message));
        const messageId: string = await pubsub
            .topic(topic)
            .publish(buffer, attributes);
        console.log(`Send Message, topic=${topic}, messageId=${messageId} - finish`);
        return messageId;
    } catch (error) {
        console.error(`Send Message, topic=${topic} - failed`);
        throw error;
    }
}

export {sendMessage}