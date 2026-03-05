---
layout: default
title: WikiRace
permalink: /wikirace/
---

This a WikiRace solver connected to an API I built and deployed via AWS Lambda.

**How to use:**

1. Enter your start and end Wikipedia URLs as they appear in the URL bar
   - EX:   https://en.wikipedia.org/wiki/Death_from_laughter
   - ⓘ Only English Wikipedia pages are accepted

2. Click the **'Find Shortest Path Length'** button to calculate the minimum number of clicks needed to get from link A to B

3. Once calculated, click the **'Reveal Path'** button to see the path from A to B
   - This is guaranteed to return the minimum number of clicks, though multiple valid paths may exist

4. Click **'Reset'** to try another pair of links

**ⓘ Warning:** This BFS algorithm scales quickly due to network latency and Wikipedia's breadth. If your links are highly unrelated, AWS Lambda will timeout after 15 minutes and won't return a result. 

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

