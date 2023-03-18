import { createPlaylistsApi, getAllPlaylistsApi, deletePlaylistsApi } from ".";

export const createPlaylist = async (data) => {
  try {
    data.songsId=[]
    const response = await createPlaylistsApi(data);
    return response;
  } catch (err) {
    return err;
  }
};

export const deletePlaylist = async (id)=>{
  try {
    const response = await deletePlaylistsApi(id);
    return response;
  } catch (err) {
    return err;
  }
}

export const getAllPlaylists = async () => {
  try {
    const response = await getAllPlaylistsApi();
    return response;
  } catch (err) {
    return err;
  }
};
