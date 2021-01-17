export function checkElement(elementId) {
  if (document.getElementById(elementId)) {
    if (document.getElementById(elementId).classList.contains("d-none")) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

export function getCookie(cookieName) {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        cookieName.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function appendConsole(
  contentParent,
  contentArray,
  delayMin,
  delayMax,
  scrollTarget,
  asciiStatus,
  customClassArray
) {
  delayMin ? (delayMin = delayMin) : (delayMin = 10);
  delayMax ? (delayMax = delayMax) : (delayMax = 250);

  for (let i = 0; i <= contentArray.length - 1; i++) {
    let childTextElement = document.createElement("p");
    if (asciiStatus || asciiStatus === undefined) {
        childTextElement.classList.add(
          "my-none",
          "ascii-text"
        );
    } else {
        if (customClassArray) {
            customClassArray.forEach((classItem) => {
                childTextElement.classList.add(classItem);
            });
        }
    }
    childTextElement.innerHTML = contentArray[i];
    if (i > 0) {
      await sleep(getRandomIntInclusive(delayMin, delayMax));
    }
    contentParent.appendChild(childTextElement);
    scrollTarget.scrollIntoView();
  }
}
