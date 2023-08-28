import uuid from "react-native-uuid";

export class AreaSchema extends Realm.Object {
  static schema = {
    name: "Area",
    primaryKey: "_id",
    properties: {
      _id: {
        type: "string",
        indexed: true,
        default: uuid.v4(),
      },
      title: "string",
      imageURl: { type: "string", default: "" },
      userId: "string",
    },
  };
}
