---
layout: default
title: WikiRace
permalink: /wikirace/
---

This a WikiRace solver connected to a FastAPI endpoint I built and deployed via AWS Lambda.
To use it, enter start and end wikipedia links, as they appear in the url.

EX: https://en.wikipedia.org/wiki/Death_from_laughter

Click the 'Find Shortest Path Length' button to show the minimum amount of clicks to get from link A to B. If you want to see an optimal path (as there may be many with the same length), a button will appear to reveal the solution! Otherwise, you can reset and try another set of links.

WARNING: Please be aware that this BFS scales very quickly. If your links are highly unrelated, AWS Lambda times out after 15 minutes, and this will not return a result. 

<script src="/assets/js/wikirace.js"></script>
<form id="wikirace-form" onsubmit="return false;">
  <fieldset>
    <legend>WikiRace Pathfinder 🪼⋆.ೃ࿔*:･ </legend>

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

<script>
  const WIKI_API_BASE_URL = "{{ site.wiki_api_base_url }}";
</script>

