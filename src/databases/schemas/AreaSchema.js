import uuid from 'react-native-uuid';

export const AreaSchema = {
    name: "Area",
    properties: {
        _id: {
            type: 'string',
            indexed: true,
            default: uuid.v4()
        },
        title: 'string',
        imageURl: 'string',
        userId: 'string'
    },
    primaryKey: '_id',
};