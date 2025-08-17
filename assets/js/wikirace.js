function extractTitle(url) {
  const title = url.split("/").pop();
  return decodeURIComponent(title).replace(/_/g, " ");
}

document.addEventListener("DOMContentLoaded", () => {
  const lengthButton = document.getElementById("length-button");
  const resetButton = document.getElementById("reset-button");
  const pathButton = document.getElementById("path-button");
  const resultDiv = document.getElementById("result");
  const apiBaseUrl = "https://wikirace-revamp-production.up.railway.app";
  let savedPath = [];

  lengthButton.addEventListener("click", async () => {
    const startLink = document.getElementById("start-link").value.trim();
    const endLink = document.getElementById("end-link").value.trim();
    console.log(`Start Link: ${startLink}, End Link: ${endLink}`);

    if (!startLink || !endLink) {
      resultDiv.textContent = "Please enter both start and end links.";
      return;
    }

    if (startLink === endLink) {
      resultDiv.textContent = "Start and end links cannot be the same.";
      return;
    }

    resultDiv.textContent = "Finding path... Please be patient... (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧";

    try {
      const response = await fetch(`${apiBaseUrl}/find-path`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ start: startLink, end: endLink }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.detail || "API Error");
      }

      const data = await response.json();
      const startTitle = extractTitle(startLink);
      const endTitle = extractTitle(endLink);
      resultDiv.textContent = `You can go from ${startTitle} to ${endTitle} in ${data.length} clicks.`;
      savedPath = data.path;

      lengthButton.classList.add("hidden");
      resetButton.classList.remove("hidden");
      pathButton.classList.remove("hidden");
    } catch (error) {
      resultDiv.textContent = `Error: ${error.message}`;
    }
  });

  pathButton.addEventListener("click", () => {
    if (savedPath.length > 0) {
        resultDiv.textContent = `Optimal path: ${savedPath.map(extractTitle).join(" → ")}`;
    } else {
        resultDiv.textContent = "No path found. Please try again.";
    }
   });

    resetButton.addEventListener("click", () => {
        document.getElementById("start-link").value = "";
        document.getElementById("end-link").value = "";
        resultDiv.textContent = "";
        savedPath = [];

        pathButton.classList.add("hidden");
        resetButton.classList.add("hidden");
        lengthButton.classList.remove("hidden");
  });

});
