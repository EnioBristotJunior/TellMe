export class AreaSchema extends Realm.Object {
  static schema = {
    name: "Area",
    primaryKey: "_id",
    properties: {
      _id: {
        type: "string",
        indexed: true,
      },
      title: "string",
      imageURl: { type: "string", default: "" },
      userId: "string",
      created_at: { type: "date", default: new Date() },
      updated_at: { type: "date", default: new Date() },
    },
  };
}
