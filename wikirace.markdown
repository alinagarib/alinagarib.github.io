---
layout: default
title: WikiRace
permalink: /wikirace/
---

This a WikiRace solver connected to a FastAPI endpoint I built and deployed.
To use it, enter start and end wikipedia links, as they appear in the url.

EX: https://en.wikipedia.org/wiki/Death_from_laughter

It will first show the minimum amount of clicks to get from link A to B, as a length. If you want to see an optimal path (as there may be many with the same length), click the button to reveal!

<form id="wikirace-form" onsubmit="return false;">
  <fieldset>
    <legend>WikiRace Pathfinder</legend>

    <div>
        <label for="start-link">Start Wikipedia URL:</label>
        <input type="text" id="start-link" placeholder="Enter start link" autocomplete="off">
    </div>

    <div>
        <label for="end-link">End Wikipedia URL:</label>
        <input type="text" id="end-link" placeholder="Enter end link" autocomplete="off">
    </div>

    <div>
        <button type="button" id="length-button">Find Shortest Path Length</button>
        <button type="button" id="reset-button" class="hidden">Reset</button>
        <button type="button" id="path-button" class="hidden">Reveal Path</button>
    </div>
    <div id="result" style="color: hotpink;"></div>
  </fieldset>
</form>

<style>
.hidden {
  display: none;
}
</style>


You can find the source code for the API at GitHub:
[WikiRace-Revamp](https://github.com/alinagarib/WikiRace-Revamp)

