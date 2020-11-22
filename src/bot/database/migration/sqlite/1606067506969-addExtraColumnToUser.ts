import {MigrationInterface, QueryRunner} from 'typeorm';

export class addExtraColumnToUser1606067506969 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_78a916df40e02a9deb1c4b75ed"`);
    await queryRunner.query(`CREATE TABLE "temporary_user" ("userId" integer PRIMARY KEY NOT NULL, "username" varchar NOT NULL, "displayname" varchar NOT NULL DEFAULT (''), "profileImageUrl" varchar NOT NULL DEFAULT (''), "isOnline" boolean NOT NULL DEFAULT (0), "isVIP" boolean NOT NULL DEFAULT (0), "isFollower" boolean NOT NULL DEFAULT (0), "isModerator" boolean NOT NULL DEFAULT (0), "isSubscriber" boolean NOT NULL DEFAULT (0), "haveSubscriberLock" boolean NOT NULL DEFAULT (0), "haveFollowerLock" boolean NOT NULL DEFAULT (0), "haveSubscribedAtLock" boolean NOT NULL DEFAULT (0), "haveFollowedAtLock" boolean NOT NULL DEFAULT (0), "rank" varchar NOT NULL DEFAULT (''), "haveCustomRank" boolean NOT NULL DEFAULT (0), "followedAt" bigint NOT NULL DEFAULT (0), "followCheckAt" bigint NOT NULL DEFAULT (0), "subscribedAt" bigint NOT NULL DEFAULT (0), "seenAt" bigint NOT NULL DEFAULT (0), "createdAt" bigint NOT NULL DEFAULT (0), "watchedTime" bigint NOT NULL DEFAULT (0), "chatTimeOnline" bigint NOT NULL DEFAULT (0), "chatTimeOffline" bigint NOT NULL DEFAULT (0), "points" bigint NOT NULL DEFAULT (0), "pointsOnlineGivenAt" bigint NOT NULL DEFAULT (0), "pointsOfflineGivenAt" bigint NOT NULL DEFAULT (0), "pointsByMessageGivenAt" bigint NOT NULL DEFAULT (0), "subscribeTier" varchar NOT NULL DEFAULT ('0'), "subscribeCumulativeMonths" integer NOT NULL DEFAULT (0), "subscribeStreak" integer NOT NULL DEFAULT (0), "giftedSubscribes" bigint NOT NULL DEFAULT (0), "messages" bigint NOT NULL DEFAULT (0), "extra" text)`);
    await queryRunner.query(`INSERT INTO "temporary_user"("userId", "username", "displayname", "profileImageUrl", "isOnline", "isVIP", "isFollower", "isModerator", "isSubscriber", "haveSubscriberLock", "haveFollowerLock", "haveSubscribedAtLock", "haveFollowedAtLock", "rank", "haveCustomRank", "followedAt", "followCheckAt", "subscribedAt", "seenAt", "createdAt", "watchedTime", "chatTimeOnline", "chatTimeOffline", "points", "pointsOnlineGivenAt", "pointsOfflineGivenAt", "pointsByMessageGivenAt", "subscribeTier", "subscribeCumulativeMonths", "subscribeStreak", "giftedSubscribes", "messages") SELECT "userId", "username", "displayname", "profileImageUrl", "isOnline", "isVIP", "isFollower", "isModerator", "isSubscriber", "haveSubscriberLock", "haveFollowerLock", "haveSubscribedAtLock", "haveFollowedAtLock", "rank", "haveCustomRank", "followedAt", "followCheckAt", "subscribedAt", "seenAt", "createdAt", "watchedTime", "chatTimeOnline", "chatTimeOffline", "points", "pointsOnlineGivenAt", "pointsOfflineGivenAt", "pointsByMessageGivenAt", "subscribeTier", "subscribeCumulativeMonths", "subscribeStreak", "giftedSubscribes", "messages" FROM "user"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
    await queryRunner.query(`CREATE INDEX "IDX_78a916df40e02a9deb1c4b75ed" ON "user" ("username") `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_78a916df40e02a9deb1c4b75ed"`);
    await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
    await queryRunner.query(`CREATE TABLE "user" ("userId" integer PRIMARY KEY NOT NULL, "username" varchar NOT NULL, "displayname" varchar NOT NULL DEFAULT (''), "profileImageUrl" varchar NOT NULL DEFAULT (''), "isOnline" boolean NOT NULL DEFAULT (0), "isVIP" boolean NOT NULL DEFAULT (0), "isFollower" boolean NOT NULL DEFAULT (0), "isModerator" boolean NOT NULL DEFAULT (0), "isSubscriber" boolean NOT NULL DEFAULT (0), "haveSubscriberLock" boolean NOT NULL DEFAULT (0), "haveFollowerLock" boolean NOT NULL DEFAULT (0), "haveSubscribedAtLock" boolean NOT NULL DEFAULT (0), "haveFollowedAtLock" boolean NOT NULL DEFAULT (0), "rank" varchar NOT NULL DEFAULT (''), "haveCustomRank" boolean NOT NULL DEFAULT (0), "followedAt" bigint NOT NULL DEFAULT (0), "followCheckAt" bigint NOT NULL DEFAULT (0), "subscribedAt" bigint NOT NULL DEFAULT (0), "seenAt" bigint NOT NULL DEFAULT (0), "createdAt" bigint NOT NULL DEFAULT (0), "watchedTime" bigint NOT NULL DEFAULT (0), "chatTimeOnline" bigint NOT NULL DEFAULT (0), "chatTimeOffline" bigint NOT NULL DEFAULT (0), "points" bigint NOT NULL DEFAULT (0), "pointsOnlineGivenAt" bigint NOT NULL DEFAULT (0), "pointsOfflineGivenAt" bigint NOT NULL DEFAULT (0), "pointsByMessageGivenAt" bigint NOT NULL DEFAULT (0), "subscribeTier" varchar NOT NULL DEFAULT ('0'), "subscribeCumulativeMonths" integer NOT NULL DEFAULT (0), "subscribeStreak" integer NOT NULL DEFAULT (0), "giftedSubscribes" bigint NOT NULL DEFAULT (0), "messages" bigint NOT NULL DEFAULT (0))`);
    await queryRunner.query(`INSERT INTO "user"("userId", "username", "displayname", "profileImageUrl", "isOnline", "isVIP", "isFollower", "isModerator", "isSubscriber", "haveSubscriberLock", "haveFollowerLock", "haveSubscribedAtLock", "haveFollowedAtLock", "rank", "haveCustomRank", "followedAt", "followCheckAt", "subscribedAt", "seenAt", "createdAt", "watchedTime", "chatTimeOnline", "chatTimeOffline", "points", "pointsOnlineGivenAt", "pointsOfflineGivenAt", "pointsByMessageGivenAt", "subscribeTier", "subscribeCumulativeMonths", "subscribeStreak", "giftedSubscribes", "messages") SELECT "userId", "username", "displayname", "profileImageUrl", "isOnline", "isVIP", "isFollower", "isModerator", "isSubscriber", "haveSubscriberLock", "haveFollowerLock", "haveSubscribedAtLock", "haveFollowedAtLock", "rank", "haveCustomRank", "followedAt", "followCheckAt", "subscribedAt", "seenAt", "createdAt", "watchedTime", "chatTimeOnline", "chatTimeOffline", "points", "pointsOnlineGivenAt", "pointsOfflineGivenAt", "pointsByMessageGivenAt", "subscribeTier", "subscribeCumulativeMonths", "subscribeStreak", "giftedSubscribes", "messages" FROM "temporary_user"`);
    await queryRunner.query(`DROP TABLE "temporary_user"`);
    await queryRunner.query(`CREATE INDEX "IDX_78a916df40e02a9deb1c4b75ed" ON "user" ("username") `);
  }

}
