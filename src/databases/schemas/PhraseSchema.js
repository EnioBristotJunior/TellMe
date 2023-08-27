import uuid from 'react-native-uuid';

export const PhraseSchema = {
    name: "Phrase",
    properties: {
        _id: {
            type: 'string',
            indexed: true,
            default: uuid.v4()
        },
        title: 'string',
        content: 'string',
        number: 'int',
        userId: 'string'
    },
    primaryKey: '_id',
};