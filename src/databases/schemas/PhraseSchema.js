export class PhraseSchema extends Realm.Object {
  static schema = {
    name: "Phrase",
    primaryKey: "_id",
    properties: {
      _id: {
        type: "string",
        indexed: true,
      },
      title: "string",
      content: "string",
      number: "int",
      areaId: "string",
      userId: "string",
      created_at: { type: "date", default: new Date() },
      updated_at: { type: "date", default: new Date() },
    },
  };
}
