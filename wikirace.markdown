---
layout: default
title: WikiRace
permalink: /wikirace/
---

<style>
  .wikirace-container {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    align-items: stretch;
    margin-top: 10px;
  }

  @media (max-width: 767px) {
    .wikirace-container {
      flex-direction: column;
    }
  }

  .wikirace-container fieldset {
    flex: 1;
    min-width: 300px;
  }

  .wikirace-container legend {
    font-weight: bold;
    padding: 0 10px;
    font-size: 1.1em;
  }

  .instructions-list {
    margin: 0;
    padding-left: 20px;
    padding-right: 20px;
  }
  .instructions-list li {
    margin-bottom: 12px;
  }
  .info-box {
    background:  #F4C2C2;
    padding: 10px;
    border-radius: 5px;
    font-size: 0.9em;
    margin-top: 10px;
  }

  .form-group {
    margin-bottom: 15px;
  }
  .form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  .form-group input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .button-container {
    display: flex;
    gap: 10px;
    margin-top: 20px;
  }

  .hidden {
    display: none;
  }
</style>

<div class="wikirace-container">
  
  <fieldset>
    <legend>How to Play</legend>
    <ol class="instructions-list">
      <p>WikiRace is a game where you try to navigate from one wikipedia page to another, using only the links on the page. This is a WikiRace solver I built and deployed via AWS Lambda.</p>
      <li><strong>Enter URLs:</strong> Paste start and end as full Wikipedia links (e.g., <i>https://en.wikipedia.org/wiki/Death_from_laughter</i>).</li>
      <li><strong>Calculate:</strong> Click <b>'Find Shortest Path Length'</b> to get the least amount of steps to get from the start to end link.</li>
      <li><strong>Reveal:</strong> Click <b>'Reveal Path'</b> to see the exact steps taken.</li>
      <li><strong>Reset:</strong> Use the <b>'Reset'</b> button to clear and start over.</li>
    </ol>
    <div class="info-box">
      <strong>ⓘ Note:</strong> Only English Wikipedia is supported. If pages are too unrelated, the AWS Lambda may timeout after 15 minutes.
    </div>
  </fieldset>

  <form id="wikirace-form" onsubmit="return false;" style="flex: 1; display: flex;">
    <fieldset>
      <legend>WikiRace Pathfinder 🪼⋆.ೃ࿔*:･</legend>
      
      <div class="form-group">
        <label for="start-link">Start Wikipedia URL:</label>
        <input type="text" id="start-link" placeholder="Enter start link" autocomplete="off">
      </div>

      <div class="form-group">
        <label for="end-link">End Wikipedia URL:</label>
        <input type="text" id="end-link" placeholder="Enter end link" autocomplete="off">
      </div>

      <div class="button-container">
        <button type="button" id="length-button">Find Shortest Path Length</button>
        <button type="button" id="reset-button" class="hidden">Reset</button>
        <button type="button" id="path-button" class="hidden">Reveal Path</button>
      </div>

      <div id="result" style="color: hotpink; margin-top: 15px; font-weight: bold;"></div>
    </fieldset>
  </form>
</div>

<script src="/assets/js/wikirace.js"></script>
<script>
  const WIKI_API_BASE_URL = "{{ site.wiki_api_base_url }}";
</script>