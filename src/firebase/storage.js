import { storage } from "./db";

export async function getMediaUrl(path) {
  try {
    const url = await storage.child(path);
    return url;
  } catch (err) {
    console.error(err);
  }
}

export async function getMainBannerUrl() {
  try {
    const url = await storage.child("banners/main.gif");
    return url;
  } catch (err) {
    console.error(err);
  }
}

export async function getSeasonBannerUrl(seasonId) {
  try {
    const url = await storage.child(`banners/seasons/${seasonId}.jpg`);
    return url;
  } catch (err) {
    console.error(err);
  }
}
