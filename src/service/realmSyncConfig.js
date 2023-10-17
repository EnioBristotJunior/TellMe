const realmAccessBehavior = {
    type: Realm.OpenRealmBehaviorType.OpenImmediately
}

export const syncConfig = {
    flexible: true,
    newRealmFileBehavior: realmAccessBehavior,
    existingRealmFileBehavior: realmAccessBehavior,
    onError: console.log,

}

