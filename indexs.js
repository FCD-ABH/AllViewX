import { registerPlugin } from 'enmity/managers/plugins';
import { React } from 'enmity/metro/common';

const AllViewX = {
  name: "AllViewX",
  description: "全チャンネル閲覧テスト用プラグイン",
  version: "1.0.0",
  authors: ["Elder"],

  onStart() {
    console.log("[AllViewX] プラグイン起動しました！");
  },

  onStop() {
    console.log("[AllViewX] プラグイン停止しました！");
  }
};

registerPlugin(AllViewX);
