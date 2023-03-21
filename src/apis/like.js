import { LikeSongApi, DislikeSongApi } from ".";

export const LikeSong = async (id) => {
  try {
    const response = await LikeSongApi(id);
    return response;
  } catch (err) {
    return err;
  }
};
export const DislikeSong = async (id) => {
  try {
    const response = await DislikeSongApi(id);
    return response;
  } catch (err) {
    return err;
  }
};
