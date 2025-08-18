---
layout: default
title: My Spotify Stats
permalink: /spotify/
---

This page is connected to an API endpoint I built and deployed, which connects to my personal Spotify account. It keeps track of my current listening and statistics!

<div class="spotify-container">
    <fieldset>
    <legend>My Profile</legend>
        <div id="spotify-profile">
            <p>Loading profile...</p>
        </div>
    <div id="recent-tracks-container" style="text-align:center;">
      <div id="recent-tracks" style="display:inline-block; width:220px;"></div>
      <div id="recent-tracks-buttons" style="margin-top:10px;">
        <button id="prev" style="margin-right:5px;">&#8249; Prev</button>
        <button id="next">Next &#8250;</button>
      </div>
    </div>
    </fieldset>

  <div id="now-playing">
    <p>Loading...</p>
  </div>
    
<div class="tracks-container">
  <fieldset>
    <legend>My Top Tracks</legend>
    <div class="select-container">
      <div>
        <label for="time-range-select">Select time range:</label>
        <select id="time-range-select">
          <option value="short_term">Last 4 weeks</option>
          <option value="medium_term" selected>Last 6 months</option>
          <option value="long_term">All time</option>
        </select>
      </div>

      <div>
        <label for="track-limit">Select tracks:</label>
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
</div>

</div>

<script src="{{ '/assets/js/spotify.js' | relative_url }}"></script>

