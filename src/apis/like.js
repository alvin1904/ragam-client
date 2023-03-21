import { LikeSongApi, DislikeSongApi, searchApi } from ".";

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

export const SearchData = async (keyword) => {
  try {
    const response = await searchApi(keyword);
    return response;
  } catch (err) {
    return err;
  }
};
