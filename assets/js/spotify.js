
async function fetchNowPlaying() {
    const res = await fetch(`${API_BASE_URL}now-playing`);
    const data = await res.json();

    const div = document.getElementById("now-playing");
    if (!data.is_playing) {
        div.innerHTML = '<h2>Now Playing</h2><img src="/assets/images/no-music.gif" width="200"><p>Not listening to anything right now 🎧</p>';
        return;
    }

    if (data.type == "episode") {
      art = data.image;
      song = data.name;
      artist = data.publisher;
      album = data.show_name;
    } else {
      art = data.album_art;
      song = data.song;
      artist = data.artist;
      album = data.album;
    }

    const progressPercent = (data.progress_ms / data.duration_ms) * 100;

    div.innerHTML = `
    <h2>Now Playing</h2>
    <img src="${art}" width="200">
    <div class="progress-container">
        <div class="progress-bar" style="width:${progressPercent}%;"></div>
    </div>
        <div class="time-container">
            <div class="progress-time">0:00</div>
            <div class="progress-time">${Math.floor(data.duration_ms / 60000)}:${String(Math.floor((data.duration_ms % 60000) / 1000)).padStart(2, '0')}</div>
        </div>
    <p><strong>${song}</strong> by ${artist}</p>
    <p><em>${album}</em></p>
  `;
}

async function fetchProfile() {
    const res = await fetch(`${API_BASE_URL}profile`);;
    const data = await res.json();

    const div = document.getElementById("spotify-profile");
    div.innerHTML = `
    <div class="profile-content">
      <p>
        <strong>
          <a href="https://open.spotify.com/user/alinagrb" target="_blank">${data.display_name}</a>
        </strong>
      </p>
      ${data.profile_image ? `<a href="https://open.spotify.com/user/alinagrb" target="_blank"><img src="${data.profile_image}" class="profile-img"></a>` : ""}
    </div>
  `;
}

async function fetchTopTracks(timeRange = "medium_term", limit = 10) {
    const res = await fetch(`${API_BASE_URL}top-tracks?time_range=${timeRange}&limit=${limit}`);
    const tracks = await res.json();

    const div = document.getElementById("top-tracks");
    div.innerHTML = tracks.map((track, index) => `
    <div class="track">
      <span class="track-number">${index + 1}.</span>
      ${track.album_art ? `<img src="${track.album_art}" alt="${track.name} album cover">` : ""}
      <div class="track-details">
        <p class="track-name">${track.name}</p>
        <p class="track-artist">${track.artist}</p>
      </div>
      <div class="track-album">
        <p>${track.album}</p>
      </div>
    </div>
  `).join("");
}

const timeSelect = document.getElementById("time-range-select");
const limitSelect = document.getElementById("track-limit");

function updateTracks() {
    const timeRange = timeSelect.value;
    const limit = limitSelect.value;
    fetchTopTracks(timeRange, limit);
}

timeSelect.addEventListener("change", updateTracks);
limitSelect.addEventListener("change", updateTracks);

updateTracks();

document.getElementById("time-range-select").addEventListener("change", e => {
    fetchTopTracks(e.target.value);
});

async function fetchTopRecent() {
    const res = await fetch(`${API_BASE_URL}recent-summary`); 
    const data = await res.json();

    const tracks = data.top_tracks; 
    const totalMinutes = data.minutes_played; 
    const uniqueArtists = data.unique_artists;
    const div = document.getElementById("recent-tracks");

    if (!tracks || tracks.length === 0) {
        div.innerHTML = '<p>No repeated tracks in the recent period 🎵</p>';
        return;
    }

    let currentIndex = 0;

    function showTrack(index) {
        const track = tracks[index];
        div.style.opacity = 0;

        setTimeout(() => {
            div.innerHTML = `
            <p style="color: hotpink; font-weight: 600; font-size: 1.1rem;">${track.listen_count} recent listens</p>
            ${track.album_art ? `<img src="${track.album_art}" alt="${track.track_name} album cover" width="200">` : ""}
            <p><strong>${track.track_name}</strong> by ${track.artist_name}</p>
            <p><em>${track.album_name}</em></p>
            `;
            div.style.opacity = 1;
        }, 200);
    }

    showTrack(currentIndex);

    if (tracks.length > 0) {
        document.getElementById("recent-tracks-buttons").style.display = "flex";
    }
    
    document.getElementById("prev").addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + tracks.length) % tracks.length;
        showTrack(currentIndex);
    });

    document.getElementById("next").addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % tracks.length;
        showTrack(currentIndex);
    });

    document.getElementById("summary").innerHTML = 
        `<h3 style="color: hotpink;"><strong>This week</strong></h3>
        <h3><strong>${totalMinutes}</strong> minutes played 🎶</h3>
        <h3><strong>${uniqueArtists}</strong> artists listened to ❀‿❀</h3>`;
}

async function fetchTopArtists(timeRange = "medium_term", limit = 10) {
    const res = await fetch(`${API_BASE_URL}top-artists?time_range=${timeRange}&limit=${limit}`);
    const artists = await res.json(); 

    const div = document.getElementById("top-artists");
    div.innerHTML = artists.map((artist, index) => `
    <div class="artist">
      <span class="artist-number">${index + 1}.</span>
      ${artist.image ? `<img src="${artist.image}" alt="${artist.name} image">` : ""}
      <div class="artist-details">
        <p class="artist-name">${artist.name}</p>
        <p class="artist-genres">${artist.genres.join(", ")}</p>
      </div>
    </div>
  `).join("");
}

const artistTimeSelect = document.getElementById("artist-time-range-select");
const artistLimitSelect = document.getElementById("artist-limit");

function updateArtists() {
    const timeRange = artistTimeSelect.value;
    const limit = artistLimitSelect.value;
    fetchTopArtists(timeRange, limit);
}

artistTimeSelect.addEventListener("change", updateArtists);
artistLimitSelect.addEventListener("change", updateArtists);

updateArtists();

async function fetchRecentListening(limit = 20) {
  const res = await fetch(`${API_BASE_URL}recent-listening?limit=${limit}`);
  const recents = await res.json(); 

  const div = document.getElementById("recent-listening");
  div.innerHTML = recents.map((recents) => `
    <div class="track">
        ${recents.album_art ? `<img src="${recents.album_art}" alt="${recents.track_name} album cover">` : ""}
        <div class="track-details">
          <p class="track-name">${recents.track_name}</p>
          <p class="track-artist">${recents.artist_name}</p>
        </div>
        <div class="track-album">
          <p>${recents.album}</p>
        </div>
      </div>
    `).join("");
}

const recentListeningSelect = document.getElementById("recent-listening-select");

function updateRecents() {
  const limit = recentListeningSelect.value;
  fetchRecentListening(limit);
}

recentListeningSelect.addEventListener("change", updateRecents);

updateRecents();


async function searchTracks(query, limit = 5) {
  const encodedQuery = encodeURIComponent(query);
  
  const url = `${API_BASE_URL}search?query=${encodedQuery}&limit=${limit}`;
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Search failed: ${response.status}`);
    }
    
    const data = await response.json();
    return data; 
  } catch (error) {
    console.error('Error searching tracks:', error);
    return { query, count: 0, tracks: [] };
  }
}

async function handleSearch() {
  const searchInput = document.getElementById('search-input');
  const query = searchInput.value.trim();
  
  if (!query) {
    alert('Please enter a search query');
    return;
  }
  
  const results = await searchTracks(query, 10); 
  
  displaySearchResults(results.tracks);
}

function displaySearchResults(tracks) {
  const resultsDiv = document.getElementById('search-results');
  
  if (tracks.length === 0) {
    resultsDiv.innerHTML = '<p>No tracks found</p>';
    return;
  }
  
  resultsDiv.innerHTML = ''; 
  resultsDiv.style.display = 'block';

  resultsDiv.innerHTML = tracks.map(track => `
    <div class="search-result-item">
      ${track.album_art ? `<img src="${track.album_art}" alt="${track.name}" width="50">` : ''}
      <div class="track-info">
        <strong>${track.name}</strong>
        <p>${track.artist} - ${track.album}</p>
      </div>
      <button onclick="addToPlaylist('${track.uri}')">+</button>
    </div>
  `).join('');
}

async function addToPlaylist(trackUri) {
  const url = `${API_BASE_URL}add-to-playlist`;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ track_uri: trackUri })
    });
    
    const result = await response.json();
    const resultsDiv = document.getElementById('search-results');
    
    if (result.success) {
      resultsDiv.innerHTML = '<p>Song added to playlist successfully!</p>';
    } else {
      resultsDiv.innerHTML = '<p>Song not added to playlist, an error occured :(</p>';
    }
  } catch (error) {
    console.error('Error adding to playlist:', error);
    alert('Failed to add track to playlist');
  }
}

function viewInstructions() {
  const modal = document.getElementById("instructions-modal");
  const modalContent = modal.querySelector(".modal-content"); 

  modalContent.innerHTML = `
    <span class="close-button" onclick="closeInstructions()">&times;</span>
    <h3>🎶 Add a Song to Our Playlist 🎧</h3>
    <p>1. Use the search below to find a song</p>
    <p>2. Select the song you want to add</p>
    <p>3. Click add to playlist!</p>
    <p>Have fun sharing your music! ✨</p>
    <div class="search-controls">
                <input type="text" id="search-input" class="search-input" placeholder="Search for a song...">
                <button id="search-button" onclick="handleSearch()">Search</button>
            </div>
    <div id="search-results">
  `;

  modal.style.display = "block";

const searchInput = document.getElementById('search-input');
  
  if (searchInput) {
      searchInput.addEventListener('keypress', function(event) {
          if (event.key === 'Enter') { 
              event.preventDefault(); 
              handleSearch();
          }
      });
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}

function closeInstructions() {
    const modal = document.getElementById("instructions-modal");
    modal.style.display = "none";
}

async function getMyPlaylist() {
    const res = await fetch(`${API_BASE_URL}get-playlist`);
    const playlist = await res.json(); 

    const div = document.getElementById("my-playlist");
    div.innerHTML = `
    <div class="playlist-item">
        ${playlist.image 
          ? `<a href="${playlist.url}" target="_blank">
              <img src="${playlist.image}" alt="${playlist.name}" width="100">
            </a>` 
          : ''}      <div class="playlist-info">
        <strong>${playlist.name}</strong>
        <i>${playlist.description} </i>
      </div>
    </div>
    `;
}


document.addEventListener("DOMContentLoaded", () => {
    fetchProfile();
    fetchNowPlaying();
    setInterval(fetchNowPlaying, 15000);
    fetchTopTracks();
    fetchTopRecent(3, 3);
    fetchTopArtists();
    fetchRecentListening();
    getMyPlaylist();
});