import { after, instead } from "enmity/patcher";
import { getByName } from "enmity/modules";
import { Plugin } from "enmity/managers/plugins";

const PermissionStore = getByName("PermissionStore");
const ChannelUtils = getByName("ChannelUtils");
const MessageStore = getByName("MessageStore");
const API = getByName("APIManager");

const AllViewX = {
  name: "AllViewX",

  onStart() {
    this.p1 = after("can", PermissionStore, (_, args, res) => true);
    this.p2 = after("can", ChannelUtils, (_, args, res) => true);
    this.p3 = after("canViewChannel", ChannelUtils, (_, args, res) => true);

    this.p4 = instead("getMessages", MessageStore, (args, orig) => {
      const [channelId] = args;
      try {
        return orig(channelId).catch(() => {
          return [
            {
              id: "fake_" + Date.now(),
              content: "履歴を読み込めませんでした（AllViewX 偽装表示）",
              author: { username: "System" },
              channel_id: channelId
            }
          ];
        });
      } catch {
        return [
          {
            id: "fake_" + Date.now(),
            content: "履歴を取得できません（AllViewX）",
            author: { username: "System" },
            channel_id: channelId
          }
        ];
      }
    });

    this.p5 = after("get", API, (args, res) => {
      const url = args[0];
      if (url.includes("/messages")) {
        res.ok = true;
      }
      return res;
    });
  },

  onStop() {
    this.p1(); this.p2(); this.p3(); this.p4(); this.p5();
  }
};

Plugin.register(AllViewX);
