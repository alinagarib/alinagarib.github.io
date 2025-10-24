---
layout: default
title: My Spotify Stats
permalink: /spotify/
---

This page is connected to an API endpoint I built and deployed via AWS Lambda, which connects to my personal Spotify account. It keeps track of my current listening and statistics!

<div id="spotify-profile" class="spotify-profile">
  <p>Loading profile...</p>
</div>
<div class="spotify-container">

<div class="now-and-artists">
  <div class="left-column">
    <fieldset>
      <legend>Reccomend a Song</legend>
      <div class="search-container">
      <div id="my-playlist"><p>Loading playlist...</p></div>  
      <button class="add-to-playlist" onclick="viewInstructions()">Add To Playlist</button>
      <div id="instructions-modal" class="modal">
          <div class="modal-content">
              </div>
      </div>
      </div>
    </fieldset> 

    <fieldset>
      <legend>On Repeat</legend>
      <div id="recent-tracks-container" style="text-align:center;">
        <div id="recent-tracks"></div>
        <div id="recent-tracks-buttons" style="margin-top:10px; display:none;">
          <button id="prev" style="margin-right:5px;">&#8249; Prev</button>
          <button id="next">Next &#8250;</button>
        </div>
      </div>
      <div id="summary" style="margin-top:10px; font-size:1.1rem;">
        <p>Loading summary...</p>
      </div>
    </fieldset>
  </div>

  <div class="right-column">
    <div id="now-playing">
      <p>Loading...</p>
    </div>
    
    <fieldset>
      <legend>Recently Played</legend>
      <div class="select-container">
        <div>
          <label for="recent-listening-select">Number of tracks:</label>
          <select id="recent-listening-select">
            <option value="10">10</option>
            <option value="20" selected>20</option>
            <option value="50">50</option>
          </select>
        </div>
      </div>
      <div id="recent-listening">
        <p>Loading recently listened tracks...</p>
      </div>
    </fieldset>
  </div>
</div>
    
<div class="tracks-container">
  <fieldset>
    <legend>My Top Tracks</legend>
    <div class="select-container">
      <div>
        <label for="time-range-select">Time range:</label>
        <select id="time-range-select">
          <option value="short_term">Last 4 weeks</option>
          <option value="medium_term" selected>Last 6 months</option>
          <option value="long_term">All time</option>
        </select>
      </div>

      <div>
        <label for="track-limit">Number of tracks:</label>
        <select id="track-limit">
          <option value="5">5</option>
          <option value="10" selected>10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>
    </div>

    <div id="top-tracks">
      <p>Loading top tracks...</p>
    </div>
  </fieldset>

  <fieldset>
      <legend>My Top Artists</legend>
      <div class="select-container">
        <div>
          <label for="artist-time-range-select">Time range:</label>
          <select id="artist-time-range-select">
            <option value="short_term">Last 4 weeks</option>
            <option value="medium_term" selected>Last 6 months</option>
            <option value="long_term">All time</option>
          </select>
        </div>
        <div>
          <label for="artist-limit">Number of artists:</label>
          <select id="artist-limit">
            <option value="5">5</option>
            <option value="10" selected>10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>
      </div>
      <div id="top-artists">
        <p>Loading top artists...</p>
      </div>
    </fieldset>
</div>
</div>


<script>
  const API_BASE_URL = "{{ site.api_base_url }}";
  console.log("API_BASE_URL:", API_BASE_URL);
</script>
<script src="{{ '/assets/js/spotify.js' | relative_url }}"></script>