import React, { useEffect, useState } from 'react';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { setSong } from './redux/songSlice';



export default function App() {


  const [text, setText] = useState('')
  const dispatch = useDispatch();
  const musics = useSelector((state) => state.song);
  useEffect(() => {
    dispatch({ type: 'FETCH_SONGS' });
  }, [dispatch]);

  const addNew = () => {
    const payload = { name: text };
    if (text === "") {
      return;
    }

    dispatch({ type: "SEND_SONG", payload: payload });

    setTimeout(() => {
      dispatch({ type: "FETCH_SONGS" });
    }, 3000);

    dispatch(setSong([...musics, { name: text, change: false }]));
    setText("");
  };

  const updateMusic = (event, id) => {

    const value = event.target.value;
    const updatedMusics = musics.map((music) => {
      if (music.id === id) {
        return { ...music, name: value, change: true };
      }
      return music;
    }
    );
    dispatch(setSong(updatedMusics));


  };

  const sentUpdateRequest = (id, name) => {
    const payload = { id: id, name: name }
    dispatch({ type: 'UPDATE_SONG', payload: payload });

    const updatedMusics = musics.map((music) => {
      if (music.id === id) {
        return { ...music, change: false };
      }
      return music;
    }
    );
    dispatch(setSong(updatedMusics));
  }

  const deleteMusic = (id) => {
    const deleteMusics = musics.filter((music) => music.id !== id);
    dispatch(setSong(deleteMusics))
    id = { id: id }
    dispatch({ type: 'DELETE_SONG', payload: id });

  };

  if (!musics) {
    return (<>
      loading....
    </>)
  }
  if (musics.length === 0) {
    return (<>
      <div className="header">

        nothing in database please add some songs </div>
      <Add setText={setText} text={text} addNew={addNew} />
    </>)
  }
  return (
    <>
      <div className="header">music app</div>
      <div id="container">
        {musics.map((music) => (
          <Main key={music.id} music={music} updateMusic={updateMusic} deleteMusic={deleteMusic} sentUpdateRequest={sentUpdateRequest} />
        ))}
        <Add setText={setText} text={text} addNew={addNew} />
      </div>
    </>
  );




}


function Main(props) {
  const { music, updateMusic, deleteMusic, sentUpdateRequest } = props;

  return (
    <div className="each">
      <span>
        <input
          type="text"
          className="text"
          value={music.name}
          onChange={(event) => {
            updateMusic(event, music.id);
          }}
        />
      </span>
      <button
        type="button"
        className={`btn ${music.change ? "btn-warning" : "btn-danger"}`}
        onClick={() => {
          music.change ? sentUpdateRequest(music.id, music.name) : deleteMusic(music.id)
        }}
      >
        {music.change ? "update" : "delete"}
      </button>
    </div>
  );


}


function Add(props) {
  const { text, setText, addNew } = props;


  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        addNew();
      }
    };

    document.getElementById('text').addEventListener('keypress', handleKeyPress);

    return () => {
      document.getElementById('text').removeEventListener('keypress', handleKeyPress);
    };
  }, [addNew]);


  return (
    <div>

      <div className="each">
        <span>
          <input type='text' value={text} className='text input' id="text" onChange={(event) => { setText(event.target.value) }}
          />
        </span>
        <button
          type="button"

          className=" btn btn-secondary"
          onClick={() => addNew()}
        >
          add      </button>
      </div>


    </div>)
}
