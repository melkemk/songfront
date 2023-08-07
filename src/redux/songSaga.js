import { takeEvery, put, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {  setSong } from './songSlice';

const url="https://songback.onrender.com/"

function* fetchSongs(action) {
  try {
    const response = yield call(axios.get,url);
    yield put(setSong(response.data));
  } catch (error) {
    console.error('Error fetching songs data:', error);
  }
}

function* updateSong(action) {
  try {
    yield call(axios.put, url, {   id: action.payload.id, name: action.payload.name });
  } catch (error) {
    console.error('Error updating song:', error);
  }
}

function* deleteSong(action) {
  try {
    const { id } = action.payload; // Access the 'id' from the action payload
    console.log(id)
    yield call(axios.delete,url, { data: { id:id } });

    
    // If needed, you can dispatch an action here to update the Redux store after a successful delete
  } catch (error) {
    console.error('Error deleting song:', error);
  }
}


function* sendSong(action) {
  try {
    const name  = action.payload.name; 
    const res = yield call(axios.post,url, { name: name });
    console.log(res)
  } catch (error) {
    console.error('Error sending song:', error);
  }
}

function* songSaga() {
  
  yield takeLatest('FETCH_SONGS', fetchSongs);
  yield takeEvery('UPDATE_SONG', updateSong);
  yield takeEvery('DELETE_SONG', deleteSong);
  yield takeLatest('SEND_SONG', sendSong);
}

export default songSaga;
