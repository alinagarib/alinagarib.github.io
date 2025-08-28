async function fetchNowPlaying() {
    const res = await fetch("https://alinasworldwidewebapis-production.up.railway.app/spotify-stats/now-playing");
    const data = await res.json();

    const div = document.getElementById("now-playing");
    if (!data.is_playing) {
        div.innerHTML = '<h2>Now Playing</h2><img src="/assets/images/no-music.gif" width="200"><p>Not listening to anything right now 🎧</p>';
        return;
    }

    const progressPercent = (data.progress_ms / data.duration_ms) * 100;

    div.innerHTML = `
    <h2>Now Playing</h2>
    <img src="${data.album_art}" width="200">
    <div class="progress-container">
        <div class="progress-bar" style="width:${progressPercent}%;"></div>
    </div>
        <div class="time-container">
            <div class="progress-time">0:00</div>
            <div class="progress-time">${Math.floor(data.duration_ms / 60000)}:${String(Math.floor((data.duration_ms % 60000) / 1000)).padStart(2, '0')}</div>
        </div>
    <p><strong>${data.song}</strong> by ${data.artist}</p>
    <p><em>${data.album}</em></p>
  `;
}

async function fetchProfile() {
    const res = await fetch("https://alinasworldwidewebapis-production.up.railway.app/spotify-stats/profile");
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
    const res = await fetch(`https://alinasworldwidewebapis-production.up.railway.app/spotify-stats/top-tracks?time_range=${timeRange}&limit=${limit}`);
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

async function fetchTopRecent(limit = 3, days = 3) {
    const res = await fetch(`https://alinasworldwidewebapis-production.up.railway.app/spotify-stats/recent-summary?limit=${limit}&days=${days}`);
    const data = await res.json();

    const tracks = data.top_tracks; 
    const totalMinutes = data.minutes_played; 
    const div = document.getElementById("recent-tracks");

    if (tracks.length === 0) {
        div.innerHTML = '<p>No repeated tracks in the recent period 🎵</p>';
        return;
    }

    let currentIndex = 0;

    function showTrack(index) {
        const track = tracks[index];
        div.style.opacity = 0;

        setTimeout(() => {
            div.innerHTML = `
            <p style="color: hotpink; font-weight: 600; font-size: 1.1rem;">${track.plays} recent listens</p>
            ${track.album_art ? `<img src="${track.album_art}" alt="${track.name} album cover" width="200">` : ""}
            <p><strong>${track.name}</strong> by ${track.artist}</p>
            `;
            div.style.opacity = 1;
        }, 200);
    }

    showTrack(currentIndex);

    if (tracks.length > 0) {
      document.getElementById("recent-tracks-buttons").style.display = "block";
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
   `<h3><strong>${totalMinutes}</strong> minutes played in the last ${data.days} days 🎶</h3>`;

}

async function fetchTopArtists(timeRange = "medium_term", limit = 10) {
    const res = await fetch(`https://alinasworldwidewebapis-production.up.railway.app/spotify-stats/top-artists?time_range=${timeRange}&limit=${limit}`);
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

document.addEventListener("DOMContentLoaded", () => {
    fetchProfile();
    fetchNowPlaying();
    setInterval(fetchNowPlaying, 15000);
    fetchTopTracks();
    fetchTopRecent(3, 3);
    fetchTopArtists();
});