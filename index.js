const currentTf = document.querySelectorAll(".current-tf");
const previousTf = document.querySelector(".previous-tf");
const tfNav = document.querySelector("ul");

async function handleNav(e) {
  const target = e.target.closest(".timeframe");

  document.querySelectorAll(".timeframe").forEach((el) => {
    el.classList.remove("active-tf");
  });
  if (!target) return;
  target.classList.add("active-tf");
  const tf = target.dataset.timeframe;
  const data = await getData(tf);
  updateUI(tf, data);
}

async function getData(tf) {
  const validTF = ["daily", "weekly", "monthly"];
  if (!validTF.includes(tf)) throw new Error("Invalid timeframe");
  const response = await fetch("../data.json");
  if (!response.ok) throw new Error("Failed to fetch data");

  return await response.json();
}

function updateUI(timeframe, data) {
  const tf = timeframe.toLowerCase();
  currentTf.forEach((type) => {
    const activity = data.find(
      (item) => item.title.toLowerCase() === type.dataset.type
    );
    const prevTf = type.closest(".card")?.querySelector(".previous-tf");
    console.log(activity.timeframes[tf]);

    type.innerHTML = `${activity.timeframes[tf]["current"]}hrs`;
    prevTf.innerHTML = `Last Week - ${activity.timeframes[tf]["previous"]}hrs`;
  });
}

async function init() {
  const defaultTF = await getData("daily");
  updateUI("daily", defaultTF);
}
init();

tfNav.addEventListener("click", handleNav);
