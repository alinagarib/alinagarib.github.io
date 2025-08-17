async function fetchNowPlaying() {
  const res = await fetch("https://alinasworldwidewebapis-production.up.railway.app/spotify-stats/now-playing");
  const data = await res.json();

  const div = document.getElementById("now-playing");
  if (!data.is_playing) {
    div.innerHTML = "<p>Not playing anything right now 🎧</p>";
    return;
  }

  div.innerHTML = `
    <img src="${data.album_art}" width="200">
    <p><strong>${data.song}</strong> by ${data.artist}</p>
    <p><em>${data.album}</em></p>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  fetchNowPlaying();
  setInterval(fetchNowPlaying, 15000);
});
